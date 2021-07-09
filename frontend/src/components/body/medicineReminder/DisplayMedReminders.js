import React from "react";
import "../../../static/Styling/medicineReminder.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, IconButton, Link } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
//import MedModal from "./MedModal"
import Modal from 'react-modal';

function DisplayMedReminders() {
  const token = useSelector((state) => state.token);
  const [reminderList, setReminderList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [missedList, setMissedList] = useState([]);

  useEffect(async () => {
    await axios
      .get("http://localhost:5000/medReminder", {
        headers: { Authorization: token },
      })
      .then((res) => setReminderList(res.data));
  }, []);

  const deleteReminder = async (id) => {
    await axios
      .delete("http://localhost:5000/medReminder/delete/" + id, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log(response.data);
      });

      const removedMed = [...reminderList].filter((el) => el._id !== id);
      setReminderList(removedMed);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const getmissedMed = async (id) => {
    await axios
      .get("http://localhost:5000/medDoseMissed/"+id, {
        headers: { Authorization: token },
      })
      .then((res) => {
          setMissedList(res.data);
          console.log(id);
      });
  }



  return (
    <div className="reminder">
      <h1>Reminder List 🧭</h1>
      <div className="reminder_header">
        <Link href="/medicine-reminder" className="button">
          {" "}
          Add to List
        </Link>
        <Link href="/medicine-doses" className="button">
          {" "}
          Medicines Today
        </Link>
      </div>


      <div className="reminder_body">
        {reminderList.map((medicines) => (
          <div className="reminder_card">
            <h2>{medicines.medname}</h2>
            <p>Description: {medicines.descriptionmed}</p>
            <p>Starting Date: {medicines.startdate.substring(0, 10)}</p>
            <p>Ending Date: {medicines.enddate.substring(0, 10)}</p>
            <IconButton
              className="btn"
              onClick={() => deleteReminder(medicines._id)}
            >
              <DeleteIcon />
            </IconButton>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayMedReminders;
