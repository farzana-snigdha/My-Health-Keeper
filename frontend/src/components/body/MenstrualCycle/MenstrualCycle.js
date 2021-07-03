import React from 'react'
import './menstrualCycle.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction' 
import { formatDate } from '@fullcalendar/react';
import { useState } from 'react';
import { Modal, Button } from '@material-ui/core';




export default function MenstrualCycle() {

 const handleDateClick = (arg) => {
  //alert('Event added');
  //setDate(arg.dateStr);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
 }

 const getEvent=()=>{
   var x = 'Event 1'
   return x;
 }

 const setDate=(date)=>{
  return date='2021-07-07';
}
const renderEventContent=(eventInfo)=>{
  return (
<div>
  <b>{eventInfo.timeText}</b>
  <i>{eventInfo.event.title}</i>
</div>
  )
}


  let str = formatDate(new Date(), {
    month: 'long',
    year: 'numeric',
    day: 'numeric'
  });
  
  
  
    return (
      <div className="main">
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
        <div className="calendar_body" >
             <div className="H2">
               <h2> <i> Tracking Period At a glance with Notes 📝 </i> </h2>
               </div>
               <FullCalendar
                
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        editable={true}
        dateClick={handleDateClick} 
        events={[
          { title: getEvent(), date: setDate() }
        ]}
        eventContent={renderEventContent}
      />
      
        </div>
        
      
   
        
        </div>
    )
    
  }

