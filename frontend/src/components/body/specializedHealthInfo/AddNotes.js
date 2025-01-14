import React, { useState, useEffect, useRef } from "react";
import "../../../static/Styling/spHealthInfo.css";
import { useSelector } from "react-redux";
import { Button, Grid, TextField } from "@material-ui/core";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useHistory } from "react-router-dom";

import axios from "axios";
const initialState = {
  folder: "",
  noteDate: "",
  description: "",
  success: "",
  err: "",
};
export default function AddNotes() {
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  let history = useHistory();

  const [notes, setNotes] = useState(initialState);
  const [multipleFiles, setMultipleFiles] = useState("");
  const [multipleProgress, setMultipleProgress] = useState(0);

  const { folder, noteDate, description, success, err } = notes;
  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
    setMultipleProgress(0);
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setNotes({ ...notes, [name]: value, err: "", success: "" });
  };

  const mulitpleFileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setMultipleProgress(percentage);
    },
  };

  const UploadMultipleFiles = async () => {
    const formData = new FormData();
    formData.append("folder", folder);
    formData.append("noteDate", noteDate);
    formData.append("description", description);
    console.log(formData);
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append("files", multipleFiles[i]);
    }

    const id = user._id;

    const res = await axios
      .post(
        "http://localhost:5100/api/save-specialized-health-info",
        formData,
        mulitpleFileOptions,
        {
          headers: { Authorization: token, userid: id },
        }
      )
      .then((ans) => {
        if (ans.data.msg == "This folder already exists") {
          setNotes({
            ...notes,
            err: ans.data.msg,
            success: "",
          });
        } else {
          setNotes({
            ...notes,
            err: "",
            success: ans.data.msg,
          });

          history.push("/specialized-health-information");
          setTimeout(function () {
            setNotes(initialState);
          }, 4000);
        }
      })
      .catch((err) => {
        err.data && setNotes({ ...notes, err: err.data, success: "" });
      });
  };

  return (
    <div>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <div className="form-group">
        <Grid className="info-save" container spacing={2} alignItems="center">
          <Grid item xs={12}></Grid>
          <Grid item xs={5}>
            <h5>Folder Name</h5>
            <TextField
              fullWidth
              type="text"
              id="folder"
              name="folder"
              placeholder="Folder Name"
              onChange={handleChangeInput}
              value={folder}
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            <h5>Note Date</h5>
            <TextField
              fullWidth
              type="date"
              id="noteDate"
              name="noteDate"
              InputLabelProps={{
                shrink: false,
              }}
              onChange={handleChangeInput}
              value={noteDate}
            />
          </Grid>

          <Grid item xs={11}>
            <h5>Description</h5>
            <TextField
              className="description"
              variant="outlined"
              fullWidth
              type="text"
              id="description"
              name="description"
              placeholder="Description"
              onChange={handleChangeInput}
              value={description}
            />
          </Grid>

          <Grid item xs={6}>
            <div className="form-group">
              <label>Select Files</label>
              <input
                type="file"
                onChange={(e) => MultipleFileChange(e)}
                className="form-control"
                multiple
              />
            </div>
          </Grid>
          <Grid item xs={1}>
            &nbsp;{" "}
            <div style={{ width: 50, height: 50 }}>
              <CircularProgressbar
                value={multipleProgress}
                text={`${multipleProgress}%`}
                styles={buildStyles({
                  rotation: 0.25,
                  strokeLinecap: "butt",
                  textSize: "16px",
                  pathTransitionDuration: 0.5,
                  pathColor: `rgba(255, 136, 136, ${multipleProgress / 100})`,
                  textColor: "#f88",
                  trailColor: "#d6d6d6",
                  backgroundColor: "#3e98c7",
                })}
              />
            </div>
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={2}>
            {/* update   */}
            &nbsp;
            <Button
              type="button"
              variant="contained"
              onClick={UploadMultipleFiles}
              color="primary"
            >
              save
            </Button>
          </Grid>
          {/* <Grid item xs={1.5}>
          update  
          <Button type="button" variant="contained" onClick={ UploadMultipleFiles} color="primary">
            update
          </Button>
        </Grid> */}
          <Grid item xs={12}></Grid>
        </Grid>
      </div>
    </div>
  );
}
