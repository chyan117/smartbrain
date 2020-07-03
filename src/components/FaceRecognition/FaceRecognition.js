import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({ imageURL, box})=>{
    return(
        // Need to fix the size on the window
        <div className='center'>
            <div className='absolute mt2 '>
                <img id='input_image' alt='' src={imageURL} width='500px' height='auto'/>
                <div className='bounding-box' style={{ top: box.topRow, left: box.leftCol, right: box.rightCol, bottom: box.bottomRow}}></div>
            </div>
        </div>
    );
}
export default FaceRecognition;