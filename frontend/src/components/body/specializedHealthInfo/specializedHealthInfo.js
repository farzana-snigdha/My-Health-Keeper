import React, { useState, useEffect, useRef } from "react";
import "../../../static/Styling/spHealthInfo.css";
import { useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  Typography,
  Button,
  Grid,
  IconButton,
  Link,
  TextField,
} from "@material-ui/core";
import FolderSpecialIcon from "@material-ui/icons/FolderSpecial";
import { useHistory } from "react-router-dom";

import axios from "axios";

import AddNotes from "./AddNotes";

const initialState = {
  folder: "",
  noteDate: "",
  description: "",
};

export default function SpecializedHealthInfo() {
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  const [spHealthNotes, setSpHealthNotes] = useState([]);

  const showSPHealthNotes = async () => {
    console.log("id  ", user._id);
    const id = user._id;
    console.log("c ", id);

    await axios
      .get("http://localhost:5000/api/get-specializedHealthInfo", {
        headers: { Authorization: token, userid: id },
      })
      .then((res) => setSpHealthNotes(res.data));
  };
  useEffect(async () => {
   localStorage.getItem("setSpHealthNotes")
   showSPHealthNotes()
  }, []);

  return (
    <div>
      {AddNotes()}
      <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Health Diary</h4>
      <hr></hr>
      <div>
        {spHealthNotes.map((note) => (
          <div variant="outlined" className="reminder_card">
            <h2>
              {" "}
              <FolderSpecialIcon />
              &nbsp;{note.folder}
            </h2>
            <hr></hr>
            <p>Note Date: {note.noteDate.substring(0, 10)}</p>
            <p>Description: {note.description}</p>
            <IconButton
              className="btn"
              data-toggle="tooltip"
              title="View Your Saved Files"
              onClick={() => {}}
            >
              <VisibilityIcon />
            </IconButton>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <IconButton
              className="btn"
              data-toggle="tooltip"
              title="Delete the Medicine"
              // onClick={() => deleteReminder(note._id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
}
