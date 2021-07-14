import React, { useState, useEffect, useRef } from "react";
import "../../../static/Styling/spHealthInfo.css";
import { useSelector } from "react-redux";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
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

  let history = useHistory();
  const [spHealthNotes, setSpHealthNotes] = useState([]);

  const showSPHealthNotes = async () => {
    const id = user._id;

    await axios
      .get("http://localhost:5000/api/get-specializedHealthInfo", {
        headers: { Authorization: token, userid: id },
      })
      .then((res) => setSpHealthNotes(res.data));
  };

  useEffect(async () => {
    localStorage.getItem("setSpHealthNotes");
    showSPHealthNotes();
  }, []);

  const viewFolder = async (folderId) => {
    await axios
      .get("http://localhost:5000/api/getallMediaFiles", {
        headers: { Authorization: token, folderid: folderId },
      })
      .then((res) => {
        // history.push({pathname:`/view-files?id=${folderId}`,
        //  state:folderId });
        //  return folderId
      });
  };
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
              component={Link}
              to={{state: note._id, pathname: `/view-files?id=${note._id}` }}
              className="viewBtn"
              data-toggle="tooltip"
              title="View Your Saved Files"
              onClick={() => viewFolder(note._id)}
            >
              <VisibilityIcon />
            </IconButton>
            {/* </Link> */}
          </div>
        ))}
      </div>
    </div>
  );
}
