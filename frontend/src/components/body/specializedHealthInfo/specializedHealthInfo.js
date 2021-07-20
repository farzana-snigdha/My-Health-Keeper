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
  Grid,
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
import LazyLoad from "react-lazyload";
import Modal from "react-bootstrap/Modal";
import EditNotesModal from "./EditNotesModal";

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
  const userID = useContext(UserIDContext);
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const classes = useStyles();
  const handleExpandClick = (index) => {
    console.log("wdwd", index);
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

  const [showEditModal, setShowEditModal] = useState(false);
  const openSpEditModal = () => setShowEditModal(true);

  useEffect(() => {
    showSPHealthNotes();
  }, []);

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
          <Grid container spacing={1} direction="row">
            {spHealthNotes.map((note, index) => (
              <Grid item>
                <div className="media_card">
                  <LazyLoad key={note.folder}>
                    {/* { console.log('edit',getDesc(note))} */}
                    <EditNotesModal
                    key={note.folder}
                      showEditModal={showEditModal}
                      setShowEditModal={setShowEditModal}
                      getNote={note.description}
                      getID={note._id}
                    />

                    <h2>
                      <FolderSpecialIcon />
                      &nbsp;{note.folder}
                    </h2>
                    <hr></hr>
                    <h6>Note Date: {note.noteDate.substring(0, 10)}</h6>

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
                    <div className="clrCardAction">
                      <IconButton
                        className="viewBtn"
                        data-toggle="tooltip"
                        title="Edit Folder"
                        onClick={openSpEditModal}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        component={Link}
                        to={{
                          state: note,
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
                    </div>
                  </LazyLoad>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <h2>No folder is created</h2>
      )}
    </div>
  );
}
