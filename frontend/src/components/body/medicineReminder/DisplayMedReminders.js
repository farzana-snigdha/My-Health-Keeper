import React from "react";
import "./medicineReminder.css";
import { Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { IconButton, Link } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import red from "@material-ui/core/colors/red";

const Medicine = (props) => (
  <div>
    <h2>{props.medicine.medname}</h2>
    <p>{props.medicine.descriptionmed}</p>
    <p>Start Date : {props.medicine.startdate.substring(0, 10)}</p>
    <p>End Date : {props.medicine.enddate.substring(0, 10)}</p>
    <IconButton className="btn">
      <DeleteIcon style={{ color: "red" }} />
    </IconButton>
  </div>
);

function DisplayMedicineReminders() {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  const [reminderList, setReminderList] = useState([]);

  useEffect(async () => {
    await axios
      .get("/medReminder", {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res.data);
        setReminderList(res.data);
      })
      .catch((error) => {
        console.log("Test :" + error);
      });
  }, []);

  // const medList = (currentmedicine) => {
  //   <Medicine medicine={currentmedicine} key={currentmedicine._id} />
  // }

  return (
    <div className="reminder">
      <div className="reminder_header">
        <h1>Reminder List 🧭</h1>
        <Link href="/medicine-reminder" className="button">
          {" "}
          Add to List
        </Link>
      </div>

      <div className="reminder_body"></div>
      {reminderList.map((currentmedicine, i) => {
        <div className="reminder_card" key={i}>
          <Medicine medicine={currentmedicine} key={currentmedicine._id} />
        </div>;
      })}
    </div>
  );
}

export default DisplayMedicineReminders;
