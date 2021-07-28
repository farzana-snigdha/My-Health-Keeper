import React, {useState,useEffect} from 'react'
import { Button,Link } from "@material-ui/core";
import '../../../static/Styling/dietPlan.css'
import { NavLink } from 'react-router-dom';

export default function DietPlan() {
    return (
        <div>
            <div className="diet_buttons">
            <Link component={NavLink} to="/set-diet-goal" className="diet_buttons_sub">
          {""} Set Your Goal
        </Link>
            </div>
            
        </div>
    )
}
