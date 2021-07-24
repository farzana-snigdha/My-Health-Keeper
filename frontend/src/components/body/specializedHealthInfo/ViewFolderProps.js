import React, { useState, useEffect, useContext, useRef } from "react";
import FolderSpecialIcon from "@material-ui/icons/FolderSpecial";
import {
  IconButton,
  CardContent,
  Button,
  CardActions,
  CardHeader,
} from "@material-ui/core";
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSelector } from "react-redux";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link } from "react-router-dom";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import "../../../static/Styling/spHealthInfo.css";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

export default function ViewFolderProps(props) {
  const token = useSelector((state) => state.token);

  const [editing, setEditing] = useState(false);
  const [description, setDesc] = useState("");
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const classes = useStyles();

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
        props.showSPHealthNotes();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div variant="outlined" className="sp_reminder_card">
      <h2 className='folderName'>
        <FolderSpecialIcon />
        &nbsp;{props.note.folder}
      </h2>
      <hr></hr>

      <p>Note Date: {props.note.noteDate.substring(0, 10)}</p>
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
        <CardContent>{props.note.description}</CardContent>
      </Collapse>

      {editing ? (
        <CardContent className='content'>
          {" "}
          <textarea className='editingBox'
            value={description}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </CardContent>
      ) : (
        ""
      )}

      <CardActions className="clrCardAction">
        {editing ? (
          <IconButton
            className="viewBtn"
            data-toggle="tooltip"
            title="Update Description"
            onClick={(e) => updateDesc(e, props.note._id)}
          >
            <CheckBoxIcon />
          </IconButton>
        ) : (
          <IconButton
            className="viewBtn"
            data-toggle="tooltip"
            title="Edit Folder"
            key={props.note.folder}
            value={props.note.description}
            onClick={() => setEditing(true)}
          >
            <EditIcon />
          </IconButton>
        )}

        <IconButton
          component={Link}
          to={{
            state: props.note,
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
          onClick={() => props.deleteFolder()}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </div>
  );
}
