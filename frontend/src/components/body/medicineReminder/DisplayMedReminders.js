import React from 'react'
import './medicineReminder.css';
import {Switch, Route} from 'react-router-dom'
import { IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import red from "@material-ui/core/colors/red";
import InputMed from './InputMedReminder';

function displayMedicineReminders() {
    const addReminder = () => {
        
    }
    return (
           
          <div className="reminder">
              <div className="reminder_header">
              <h1>Reminder List 🧭</h1>
              <div className="button" onClick={addReminder}>Add To List</div>
              </div>
        <div className="reminder_body">
          {
            
              <div className="reminder_card" >
                <h2>MEDICINE NAME</h2>
                <p>Description</p>
                <p>Time:  </p>
                <IconButton className="btn" >
                <DeleteIcon style={{ color: "red" }} />
               </IconButton>
              </div>
              
            
          }
          {
            
            <div className="reminder_card" >
                <h2>MEDICINE NAME</h2>
                <p>Description</p>
                <p>Time:  </p>
                <IconButton className="btn" >
                <DeleteIcon style={{ color: "red" }} />
               </IconButton>
              </div>
            
          
        }
        {
            
            <div className="reminder_card" >
            <h2>MEDICINE NAME</h2>
            <p>Description</p>
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