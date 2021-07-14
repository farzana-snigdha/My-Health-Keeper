import React from "react";
import "../../../static/Styling/medicineReminder.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, IconButton, Link } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

function MedDoses() {
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const [doseList, setDoseList] = useState([]);

  const getMedDose = async () => {
    await axios
      .get("http://localhost:5000/medDose", {
        headers: { Authorization: token },
      })
      .then((res) => setDoseList(res.data));
  };
  useEffect(async () => {
    getMedDose();
  }, []);

  const confirmReminder = async (id) => {
    await axios
      .post("http://localhost:5000/medDose/" + id, {
        headers: { Authorization: token, userId: user._id },
      })
      .then((response) => {
        console.log(response.data);
        
      })
      .catch((error) => {
        console.log(error);
      });

      const removedConfirmed = [...doseList].filter((el) => el._id !== id);
      setDoseList(removedConfirmed);
  };

  return (
    <div>
      <div>
        <Link href="/display-medicine-reminderList">
          <Button type="button" color="primary" size="large">
            <i class="fas fa-angle-double-left" >
              {" "}
              &nbsp; Return
            </i>
          </Button>
        </Link>
      </div>
      <div>
        <p></p>
      </div>
      <div>
        {" "}
        <p></p>
      </div>
      <div>
        {doseList.map((doses) => (
          <div className="reminder_card">
            <h2>{doses.medname}</h2>
            <hr></hr>
            <p><b>Time: </b>{doses.medtime}</p>
            <p><b>Taken:</b> Not Yet</p>
            
            <Button className="btn"  onClick={() => confirmReminder(doses._id)}>
              Confirm
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MedDoses;
