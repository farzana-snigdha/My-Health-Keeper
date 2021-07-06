import React from "react";
import "../../../static/Styling/medicineReminder.css"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { IconButton, Link } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

function MedDoses() {
    const token = useSelector((state) => state.token);
}

export default MedDoses;