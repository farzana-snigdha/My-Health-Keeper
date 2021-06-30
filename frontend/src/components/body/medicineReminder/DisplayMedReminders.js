import React from 'react'
import './medicineReminder.css';
import {Switch, Route} from 'react-router-dom'
import { useState, useEffect } from "react"
import axios from "axios"
import { IconButton,Link } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import red from "@material-ui/core/colors/red";

const med = props => (
  <tr>
    <td>{props.med.name}</td>
    <td>{props.med.description}</td>
    <td>{props.med.duration}</td>
    <td>{props.med.date}</td>
    <td>
      <Link to={"/edit/"+props.med._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)



function DisplayMedicineReminders() {
  const [ medname, setMedName ] = useState("")
  const [ descriptionmed, setDescriptionMed] =  useState("")
  const [ time, setRemindAt ] = useState([])
  const [ reminderList, setReminderList ] = useState([]);


  useEffect(() => {
      axios.get("http://localhost:5000/medReminder").then( res => setReminderList([...reminderList, res.data]))
  });

    return (
           
          <div className="reminder">
              <div className="reminder_header">
              <h1>Reminder List 🧭</h1>
              <Link href= "/medicine-reminder"  className="button" > Add to List</Link>
              </div>
        <div className="reminder_body">
          {
            reminderList.map(medicines=>(
              <div className="reminder_card" >
                <h2>{medicines.medName}</h2>
                <p>{medicines.descriptionmed}</p>
                <p>Time:  </p>
                <IconButton className="btn" >
                <DeleteIcon style={{ color: "red" }} />
               </IconButton>
              </div>
            ))
            
          }
        
          

          
        </div>

      </div>
    
    );
}

export default DisplayMedicineReminders;