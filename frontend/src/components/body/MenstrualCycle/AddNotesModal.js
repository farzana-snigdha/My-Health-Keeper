import React,{useState} from 'react'


import "../../../static/Styling/addNotesModal.css";

 const AddNotesModal = props => {

    if(!props.show){
        return null
    }

    
    return(
       <div className="modal" onClick={props.onClose}>
           <div className="modal-content" onClick={e => e.stopPropagation()} >
               <div className="modal-header" >
                   <h4 className="modal-title" > Modal Title </h4>
               </div>
               <div className="modal-body">
               
               <form  className= "center">
      <div>
        <label for="date">Date : </label>
        <input type="date" name="date" />
      </div>
     
      <div>
        <label for="notes">Notes : </label>
        <input type="notes" name="notes" />
      </div>
      
      <div>
        <button type="submit">Save</button>
      </div>
    </form>

               </div>
               <div className="modal-footer">
                   <button className="button" onClick={props.onClose}>Close</button>
               </div>
           </div>
       </div>
        
        )
    
    
    
}
export default AddNotesModal