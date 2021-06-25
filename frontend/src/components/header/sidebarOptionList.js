import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import FastfoodIcon from '@material-ui/icons/Fastfood';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import HealingIcon from '@material-ui/icons/Healing';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';


export const mainListItems = (
  
  <div>
    <ListItem button>
      <ListItemIcon><font color="white">
        <FitnessCenterIcon />
        </font>
      </ListItemIcon>
      <ListItemText primary="General Health Information" />
    </ListItem>
    <ListItem button>
    <ListItemIcon><font color="white">
      <FastfoodIcon />
      </font>
       
      </ListItemIcon>
      <ListItemText 
            
          primary="Diet Plan" />
    
      
    </ListItem>
    <ListItem button>
      <ListItemIcon><font color="white">
        <LocalHospitalIcon />
        </font>
      </ListItemIcon>
      <ListItemText primary="Specialized Health Information" />
    </ListItem>
    <ListItem button>
      <ListItemIcon><font color="white">
        <AssessmentIcon />
        </font>
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon><font color="white">
        <HealingIcon />
        </font>
      </ListItemIcon>
      <ListItemText primary="Disease Prediction" />
    </ListItem>
    <ListItem button>
      <ListItemIcon><font color="white">
        <AddAlertIcon />
        </font>
      </ListItemIcon>
      <ListItemText primary="Medicine Reminder" />
    </ListItem>
    <ListItem button>
      <ListItemIcon><font color="white">
        <BubbleChartIcon />
        </font>
      </ListItemIcon>
      <ListItemText primary="Menstrual Cycle" />
    </ListItem>
  </div>
);

