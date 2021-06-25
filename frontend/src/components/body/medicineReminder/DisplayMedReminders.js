import React from 'react'
import './medicineReminder.css';
import { IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import red from "@material-ui/core/colors/red";

function displayMedicineReminders() {
    return (
           
          <div className="reminder">
              <h1>Reminder List 🧭</h1>
        <div className="reminder_body">
          {
            
              <div className="reminder_card" >
                <h2>MEDICINE NAME</h2>
                <h3>Description</h3>
                <p>Time:  </p>
                <IconButton className="btn" >
                <DeleteIcon style={{ color: "red" }} />
               </IconButton>
              </div>
              
            
          }
          {
            
            <div className="reminder_card" >
            <h2>MEDICINE NAME</h2>
            <h3>Description</h3>
            <p>Time:  </p>
            <IconButton className="btn" >
            <DeleteIcon style={{ color: "red" }} />
           </IconButton>
          </div>
            
          
        }
        {
            
            <div className="reminder_card" >
                <h2>MEDICINE NAME</h2>
                <h3>Description</h3>
                <p>Time:  </p>
                <IconButton className="btn" >
                <DeleteIcon style={{ color: "red" }} />
               </IconButton>
              </div>
            
          
        }
          

          
        </div>

      </div>
    
    );
}

export default displayMedicineReminders;