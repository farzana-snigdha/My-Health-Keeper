import React, { useState, useEffect, useRef } from "react";
import "../../../static/Styling/spHealthInfo.css";
import { useSelector } from "react-redux";
import {
  Typography,
  Button,
  Grid,
  IconButton,
  Link,
  TextField,
} from "@material-ui/core";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

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

  return (
    <div>
      {AddNotes()}
      <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Health Diary</h4>
      <hr></hr>
    
     
    </div>
  );
}
