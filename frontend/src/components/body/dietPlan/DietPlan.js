import React, {useState,useEffect} from 'react'
import { Button,Link } from "@material-ui/core";
import '../../../static/Styling/dietPlan.css'

export default function DietPlan() {
    return (
        <div>
            <Link href="/set-diet-goal" className="diet_buttons">
          {""} Set Your Goal
        </Link> 
        </div>
    )
}
