import React, { useState, useEffect, useRef } from "react";
import { Button, Grid, Link } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import "../../../static/Styling/dietPlanGoal.css";

export default function DietGoalSetter() {
  return (
    <div>
      <div className="set_diet_goal_button">
        <Link
          data-toggle="tooltip"
          title="Return to Diet Plan"
          className="set_diet_goal_button_sub"
          component={NavLink}
          to="/diet-plans"
        >
          <ArrowBackIcon /> Return
        </Link>
      </div>
    </div>
  );
}
