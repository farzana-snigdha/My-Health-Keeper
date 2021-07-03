import React,{useState} from 'react'
import Modal from 'react-modal'
import Datetime from 'react-datetime'
import Button from 'react'
import { render } from '@fullcalendar/common/vdom';

import "../../../static/Styling/addNotesModal.css";

 const AddNotesModal = props => {

    if(!props.show){
        return null
    }

    
    return(
       <div className="modal" onClick={props.onClose}>
           <div className="modal-content" onClick={e => e.stopPropagation()}>
               <div className="modal-header">
                   <h4 className="modal-title"> Modal Title </h4>
               </div>
               <div className="modal-body">
                   This is modal body
               </div>
               <div className="modal-footer">
                   <button className="button" onClick={props.onClose}>Close</button>
               </div>
           </div>
       </div>
        
        )
    
    
    
}
export default AddNotesModal