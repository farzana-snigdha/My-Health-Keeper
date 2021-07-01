import React from "react";
import "../../../static/Styling/menstrualCycle.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { formatDate } from "@fullcalendar/react";

export default function MenstrualCycle() {
  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

  let str = formatDate(new Date(), {
    month: "long",
    year: "numeric",
    day: "numeric",
  });

  console.log(str);

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
                    <TextField
                      fullWidth
                      label="Duration"
                      placeholder="Duration"
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
                  ⏳ Gap between each period cycle
                </Typography>
                <div className="margin">
                  <Grid container spacing={1} alignItems="center">
                    <TextField
                      fullWidth
                      label="Approximate number of days for next period to come"
                      placeholder="Gap between each period cycle to come"
                    />
                  </Grid>
                </div>
              </CardContent>
            </div>
          </Card>
        }
      </div>
      <div className="calendar_body">
        <div className="H2">
          <h2>
            {" "}
            <i> Tracking Period At a glance with Notes 📝 </i>{" "}
          </h2>
        </div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          editable={true}
          dateClick={handleDateClick}

          //eventClick={this.handleEventClick}
        />
      </div>
    </div>
  );
}
