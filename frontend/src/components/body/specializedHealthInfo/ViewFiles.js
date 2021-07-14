import React, { useState, useEffect, useRef } from "react";
import "../../../static/Styling/spHealthInfo.css";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

export default function AddFiles() {
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  let history = useHistory();
  //   console.log("viewFiles ", folderid);
 
  const [mediaFiles, setMediaFiles] = useState([]);
  const { state } = useLocation();
  console.log("state1: ", state);
  const showMediaFiles = async () => {
    // console.log("id  ", user._id);

    console.log("state: ", state);
    const userid = user._id;

    await axios
      .get("http://localhost:5000/api/getFolderItems", {
        headers: { Authorization: token, folderid: state },
      })
      .then((res) => setMediaFiles(res.data));
  };

  useEffect(async () => {
    //   localStorage.getItem("setSpHealthNotes");
    showMediaFiles();
  }, []);
  return <div>hi</div>;
}
