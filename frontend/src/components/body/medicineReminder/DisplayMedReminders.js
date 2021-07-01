import React from "react";
import "../../../static/Styling/medicineReminder.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { IconButton, Link } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import MedProps from "./MedProps";

const initialState = {
  meds : [],
}

// const Medicine = (props) => (
//   <div>
//     <h2>{props.medicine.medname}</h2>
//     <p>{props.medicine.descriptionmed}</p>
//     <p>Start Date : {props.medicine.startdate.substring(0, 10)}</p>
//     <p>End Date : {props.medicine.enddate.substring(0, 10)}</p>
//     <IconButton className="btn">
//       <DeleteIcon style={{ color: "red" }} />
//     </IconButton>
//   </div>
//   // <tr>
//   //   <td>{props.medicine.medname}</td>
//   //   <td>{props.medicine.descriptionmed}</td>
//   //   <td>{props.medicine.startdate.substring(0, 10)}</td>
//   //   <td>{props.medicine.enddate.substring(0, 10)}</td>
//   // </tr>
// );

function DisplayMedicineReminders() {
  //const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  const [reminderList, setReminderList] = useState([]);

  const {meds} = reminderList;

  useEffect(async () => {
    await axios
      .get("/medReminder", {
        headers: { Authorization: token },
      })
      .then((res) => {
        //console.log(res.data);
        setReminderList(res.data);
      })
      .catch((error) => {
        console.log("Test :" + error);
      });
  }, []);

  //console.log(reminderList);

  const medList = () => {
    return reminderList.map((currentmedicine) => {
      //console.log(currentmedicine);
       return  <MedProps medicine={currentmedicine} />;
    })
  }

  return (
    <div className="reminder">
      <div className="reminder_header">
        <h1>Reminder List 🧭</h1>
        <Link href="/medicine-reminder" className="button">
          {" "}
          Add to List
        </Link>
      </div>

      <IconButton onClick={medList}>
                  <AddIcon />
                </IconButton>

      <div >
      </div>
      

      {/* <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{reminderList.map((currentmedicine) => {
          <Medicine medicine={currentmedicine} key={currentmedicine._id} />
      })}</tbody>
      </table> */}
    </div>
  );
}

export default DisplayMedicineReminders;