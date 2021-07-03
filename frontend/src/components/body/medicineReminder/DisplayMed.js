import React from "react";
import "./medicineReminder.css"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function DisplayMed () {
    const token = useSelector((state) => state.token);
    const [ reminderList, setReminderList ] = useState([]);

    useEffect(() => {
        axios.get("/medReminder", {
            headers: { Authorization: token },
          }).then( res => setReminderList(res.data))
    }, [])

    return(
        <div className="reminder_body">
          {
            reminderList.map(medicines=>(
              <div className="reminder_card" >
                <h2>{medicines.medname}</h2>
                <p>{medicines.descriptionmed}</p>
                <p>Time:  </p>
              </div>
            ))
          }
        </div>
    )
}

export default DisplayMed;