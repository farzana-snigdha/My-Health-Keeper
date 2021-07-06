import React from "react";
import "../../../static/Styling/medicineReminder.css"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, IconButton, Link } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

function MedDoses() {
    const token = useSelector((state) => state.token);
    const [ doseList, setDoseList ] = useState([]);

    useEffect(async () => {
        await axios.get("/medDose", {
             headers: { Authorization: token },
           }).then( res => setDoseList(res.data))
     }, []);

    

    return(
        <div>
            {
            doseList.map(doses=>(
              <div className="reminder_card" >
              
                <h2>{doses.medname}</h2>
                <p>Time: {doses.medtime}</p>
                <p>Taken: {doses.isTaken}</p>
                <Button>Confirm</Button>
              </div>
            ))
          }
        </div>
    )
}

export default MedDoses;