import React, { useState, useEffect, useContext, useRef } from "react";
import "../../../static/Styling/spHealthInfo.css";
import { useSelector } from "react-redux";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import FolderSpecialIcon from "@material-ui/icons/FolderSpecial";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import AddNotes from "./AddNotes";
import { UserIDContext } from "../../../App";
import DeleteIcon from "@material-ui/icons/Delete";
import SpHealthModal from './SpHealthModal'
const initialState = {
  folder: "",
  noteDate: "",
  description: "",
};

export default function SpecializedHealthInfo() {
  const userID = useContext(UserIDContext);
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  console.log("cdcwdcwc ", userID);
  let history = useHistory();
  const [spHealthNotes, setSpHealthNotes] = useState([]);
  const [spHealthNotesForModal, setSpHealthNotesForModal] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const showSPHealthNotes = async () => {
    let oo = localStorage.getItem("spUser");
    if (oo) {
      console.log("sp id     ", oo);
      await axios
        .get("http://localhost:5000/api/get-specializedHealthInfo", {
          headers: { Authorization: token, userid: userID },
        })
        .then((res) => {
          // console.log(res.data);
          history.push("/specialized-health-information");
          setSpHealthNotes(res.data);
        });
    }
  };

  useEffect(() => {
    showSPHealthNotes();
  }, []);

  const viewFolder = async (folderId) => {
    await axios
      .get("http://localhost:5000/api/getallMediaFiles", {
        headers: { Authorization: token, folderid: folderId },
      })
      .then((res) => {
        // history.push({ pathname: `/view-files`, state: folderId });
        return folderId;
      });
  };

  const openModal = () => {
    console.log('edcwedewqd')
    setShowModal((prev) => !prev);
  };

 

  const deleteFolder = async (folderId) => {
    await axios
      .delete("http://localhost:5000/api/deleteFolder/" + folderId, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log(response.data);
      });

    const removedMed = [...spHealthNotes].filter((el) => el._id !== folderId);
    setSpHealthNotes(removedMed);
  };

  return (
    <div>
      <AddNotes getNote={() => showSPHealthNotes()} />
      <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Health Diary</h4>
      <hr></hr>

      {/* {console.log("spHealthNotes.length", spHealthNotes)} */}

      {spHealthNotes.length != 0 ? (
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
                to={{
                  state: note,
                  pathname: '/view-files',
                }}
                className="viewBtn"
                data-toggle="tooltip"
                title="View Your Saved Files"
                onClick={() => viewFolder(note._id)}
              >
                <VisibilityIcon />
              </IconButton>
              <IconButton
                className="viewBtn"
                data-toggle="tooltip"
                title="Edit Folder"
                onClick={() => {
                  openModal();
                  // getFolderContentForModal(note._id);
                  
                }}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                className="viewBtn"
                data-toggle="tooltip"
                title="Delete this Folder"
                onClick={() => deleteFolder(note._id)}
              >
                <DeleteIcon />
              </IconButton>
             
              <SpHealthModal
              showModal={showModal}
              setShowModal={setShowModal}
              value={note._id}
            />
              {/* </Link> */}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2>No folder is created</h2>
        </div>
      )}
    </div>
  );
}
