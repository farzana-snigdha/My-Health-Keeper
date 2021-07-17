import React, { useState, useEffect, useRef } from "react";
import "../../../static/Styling/spHealthInfo.css";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Document } from 'react-pdf'

const useStyles = makeStyles({
  root: {
    maxWidth: "100mvh",
  },
  media: {
    resizeMode:'contain',
    height: 240,
    width: 240,
       
  },
});

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
      .then((res) => {
        console.log("    hghytcfh    ", res.data);
        setMediaFiles(res.data);
      });
  };

  useEffect(async () => {
    showMediaFiles();
  }, []);

  const classes = useStyles();

  return (
    <div>
      {mediaFiles.map((element) => (
      
        <div className='media_card'>
            {console.log(mediaFiles)}
          <img
            className={classes.media}
            component="img"
            src={`http://localhost:5000/${element.filePath}`}
            title="Contemplative Reptile"
            alt="lpl"
          />
          <CardContent>
            <h6>
              <b>Name:</b> {element.fileName}
            </h6>
          </CardContent>
        </div>
      ))}
    </div>
  );
}
