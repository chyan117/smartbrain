import React from 'react';
import './ImageLinkeForm.css'


//870f1255c44c4247b84caa340e399245

const ImageLinkeForm = ({ onInputChange, Onsubmit}) =>{
    return(
        // size 3
        <div>
            <p className='f3'>
                This magic is able to detect your faces. Give it a try! 
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange} />
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={Onsubmit}>Detect</button>
                </div>
            </div>

        </div>
    );


}
export default ImageLinkeForm;