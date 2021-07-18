import React, { useState, useEffect, useContext, useRef } from "react";
import "../../../static/Styling/spHealthInfo.css";
import { useSelector } from "react-redux";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link } from "react-router-dom";
import {
  IconButton,
  CardContent,
  Button,
  CardActions,
} from "@material-ui/core";
import FolderSpecialIcon from "@material-ui/icons/FolderSpecial";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import AddNotes from "./AddNotes";
import { UserIDContext } from "../../../App";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

export default function SpecializedHealthInfo() {
  const [editing, setEditing] = useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [spHealthNotes, setSpHealthNotes] = useState([]);
  const [description, setDesc] = useState("");
  const userID = useContext(UserIDContext);
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const classes = useStyles();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log("context userID ", userID);
  let history = useHistory();
  const showSPHealthNotes = async () => {
    let spID = localStorage.getItem("spUser");
    if (spID) {
      console.log("sp id     ", spID);
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
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setDesc(value);
  };
  const updateDesc = async (e, folderId) => {
    e.preventDefault();
    console.log("folderId ", folderId);
    await axios
      .patch(
        "http://localhost:5000/api/updateSpecializedHealthInfo/" + folderId,
        { description },
        {
          headers: { Authorization: token },
        }
      )
      .then((response) => {
        console.log("editfolder", response.data);
        setEditing(false);
        showSPHealthNotes();
      })
      .catch((error) => {
        console.log(error);
      });
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
      {spHealthNotes.length != 0 ? (
        <div>
          {spHealthNotes.map((note, index) => (
            <div key={index} variant="outlined" className="reminder_card">
              <h2>
                <FolderSpecialIcon />
                &nbsp;{note.folder}
              </h2>
              <hr></hr>
              <p>Note Date: {note.noteDate.substring(0, 10)}</p>

              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
              >
                <h5 className="clrDiv">
                  <b>Description</b>
                </h5>
              </IconButton>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>{note.description}</CardContent>
              </Collapse>

              {editing ? (
                <CardContent>
                  <textarea
                    onChange={handleChangeInput}
                    value={description}
                  ></textarea>
                  <Button onClick={(e) => updateDesc(e, note._id)}>👍🏼</Button>
                </CardContent>
              ) : (
                ""
              )}

              <div className="clrDiv">
                {" "}
                <CardActions className="clrCardAction">
                  <IconButton
                    className="viewBtn"
                    data-toggle="tooltip"
                    title="Edit Folder"
                    onClick={() => setEditing(true)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    component={Link}
                    to={{
                      state1: note,
                      pathname: "/view-files",
                    }}
                    className="viewBtn"
                    data-toggle="tooltip"
                    title="View Your Saved Files"
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    className="viewBtn"
                    data-toggle="tooltip"
                    title="Delete this Folder"
                    onClick={() => deleteFolder(note._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2>No folder is created</h2>
      )}
    </div>
  );
}
