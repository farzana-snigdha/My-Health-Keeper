import React from "react";
import "../../../static/Styling/medicineReminder.css"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { IconButton, Link } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

function DisplayMedReminders () {
    const token = useSelector((state) => state.token);
    const [ reminderList, setReminderList ] = useState([]);

    useEffect(async () => {
       await axios.get("/medReminder", {
            headers: { Authorization: token },
          }).then( res => setReminderList(res.data))
    }, [])

    const deleteReminder = async (id) => {
      await axios.delete('/medReminder/delete/'+id,
      {
        headers: { Authorization: token },
      })
        .then(response => { console.log(response.data)});

      reminderList.filter(el => el._id !== id);
    }
    return(
        <div className="reminder">
      <div className="reminder_header">
        <h1>Reminder List 🧭</h1>
        <Link href="/medicine-reminder" className="button">
          {" "}
          Add to List
        </Link>
      </div>

        <div className="reminder_body">
          {
            reminderList.map(medicines=>(
              <div className="reminder_card" >
              
                <h2>{medicines.medname}</h2>
                <p>Description: {medicines.descriptionmed}</p>
                <p>Starting Date: {medicines.startdate.substring(0, 10)}</p>
                <p>Ending Date: {medicines.enddate.substring(0, 10)}</p>
                <IconButton className="btn" onClick={() => deleteReminder(medicines._id)} >
                <DeleteIcon  />
               </IconButton>
              </div>
            ))
          }
        </div>
        </div>
    )
}

export default DisplayMedReminders;