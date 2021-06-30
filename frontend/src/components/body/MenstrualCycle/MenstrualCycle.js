import React from 'react'
import './menstrualCycle.css'
import DateTimePicker from "react-datetime-picker"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LocalHospitalRoundedIcon from '@material-ui/icons/LocalHospitalRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import HeightIcon from '@material-ui/icons/Height';



export default function MenstrualCycle() {
    return (
        <div className=" card_body ">
        {
 <Card className="root">
 <div className="details">
   <CardContent className="content">
     <Typography component="h5" variant="h5">
      📅 Last Start Date
     </Typography>
     <div className="margin">
 <Grid container spacing={1} alignItems="center">
      <TextField
        
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: false,
            }}
            />
 </Grid>
</div>
   </CardContent>
 </div>
</Card>
}
{
 <Card className="root">
 <div className="details">
   <CardContent className="content">
     <Typography component="h5" variant="h5">
      📅 Last End Date
     </Typography>
     <div className="margin">
 <Grid container spacing={1} alignItems="center">
      <TextField
        
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: false,
            }}
            />
 </Grid>
</div>
   </CardContent>
 </div>
</Card>
}
{
 <Card className="root">
 <div className="details">
   <CardContent className="content">
     <Typography component="h5" variant="h5">
      ⌚ Duration of each Period cycle
     </Typography>
     <div className="margin">
 <Grid container spacing={1} alignItems="center">
 <TextField fullWidth label="Duration" placeholder="Duration" />
 </Grid>
</div>
   </CardContent>
 </div>
</Card>
}
{
 <Card className="root">
 <div className="details">
   <CardContent className="content">
     <Typography component="h5" variant="h5">
      ⏳ Gap between each period cycle
     </Typography>
     <div className="margin">
 <Grid container spacing={1} alignItems="center">
 <TextField fullWidth label="Approximate number of days for next period to come" placeholder="Gap between each period cycle to come" />
 </Grid>
</div>
   </CardContent>
 </div>
</Card>
}

        </div>
    )
}
