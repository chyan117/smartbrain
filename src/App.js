import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkeForm from './components/ImageLinkeForm/ImageLinkeForm.js'
import Rank from './components/Rank/Rank.js'
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import SignIn from './components/SignIn/SignIn.js'
import Register from './components/Register/Register.js'


const particleOption ={
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}


const initial_state = {
  input: '',
  box:{},
  imageURL:'',
  route: 'signin',
  isSignin: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: '',
    join: ''
  }
};


class App extends Component {
  constructor(){
    super();
    this.state=initial_state;
  }
// ********************************
// use to connect to the server
  // componentDidMount(){
  //   fetch('http://localhost:3000/')
  //   .then(response=>response.json())
  //   .then(console.log)
  // }
// ********************************


  calculateFaceLocation = (data)=>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(clarifaiFace);
    const img = document.getElementById('input_image');
    // It is string originally, so we need to transfrom it into integer
    const width = Number(img.width);
    const height= Number(img.height);
    console.log(width, height);
    return{
      leftCol : clarifaiFace.left_col*width,
      topRow : clarifaiFace.top_row*height,
      // right is form right side 
      rightCol : width - clarifaiFace.right_col*width,
      // bottom is form bottom side 
      bottomRow : height - clarifaiFace.bottom_row*height
    }
  }

  loadUser = (data)=>{
    this.setState(
        {user:{
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            join: data.join
          }
        }
    )
  }
  displayFaceBox = (box)=>{
    this.setState({box: box});
  }

  onInputChange = (event)=>{
    this.setState({input: event.target.value});
  }
  // the connection between front-end and back-end by fetch can create real fucntionality
  onSubmit = ()=>{
    this.setState({imageURL: this.state.input});
    fetch('https://agile-depths-63645.herokuapp.com/imageurl', {
      // put request only need id
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
        }
      )
    }
      // .json means we want the read what server is talking about
    ).then(response=>response.json())
    .then(response =>{
        // Use Class here
        if(response){
          // put request
          fetch('https://agile-depths-63645.herokuapp.com/image', {
              // put request only need id
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(
                {
                  id: this.state.user.id
                }
              )
            }
            // .json means we want the read what server is talking about
            //this is a fetch so it is response.json()
          ).then(response=>response.json()).then(count=>{
            // {user:{entries: count}} is not good because it will change the entire object
            // the below assigned way only change the one(properties) that we want to change
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
        this.displayFaceBox(this.calculateFaceLocation(response)) 
      }
    }
    )
    .catch(err=> console.log("fail"));
  }
  onRouteChange = (args)=>{
    if(args==='signout'){
      this.setState(initial_state);
    }else if(args==='home'){
      this.setState({ isSignin: true });
    }
    this.setState({ route: args});
  }

  render() {
    return (
      <div className="App">
        <Particles className ='particle'
          params={
            particleOption
          }
        />
        <Navigation isSignin={this.state.isSignin} onRouteChange={this.onRouteChange}/>
        
        {this.state.route=='home'
        // wrap then we can use javascript syntax
          ? 
          <div>
            <Logo />
            <Rank name ={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkeForm 
              onInputChange={this.onInputChange}
              Onsubmit={this.onSubmit} />
            <FaceRecognition box={this.state.box} imageURL={this.state.imageURL} />
          </div>
          : (this.state.route == 'signin'
          ? <SignIn loadUser = {this.loadUser} onRouteChange={this.onRouteChange} />
          : <Register loadUser = {this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }

      </div>
    );
  }
}
export default App;

