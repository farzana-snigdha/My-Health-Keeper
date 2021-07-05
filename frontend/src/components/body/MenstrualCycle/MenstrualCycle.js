import React, { useState, useEffect, useRef } from "react";
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
import { useSelector } from "react-redux";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import AddNotesModal from "./AddNotesModal";
import { Modal } from "@material-ui/core";


const initialState = {
  startdate: "",
  enddate: "",
  duration: "",
  cycleLength: "",
  err: "",
  success: "",
};

export default function MenstrualCycle() {
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  const [initialData, setInitialData] = useState(initialState);
  const [visible, setVisible] = useState(true);
  const { startDate, endDate, duration, cycleLength, err, success } =
    initialData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("InputFields", inputFields);

    //username = user.name;
    //doses = inputFields;
    console.log(user._id);
    const id = user._id;
    try {
      const res = await axios.post(
        "http://localhost:5000/user/setup-initial-data",
        {
          startDate,
          endDate,
          duration,
          cycleLength,
        },
        {
          headers: { Authorization: token, userid: id },
        }
      );

      setInitialData({ ...initialData, err: "", success: res.data.msg });
      console.log("nn ", res.data.msg);
    } catch (err) {
      err.response.data.msg &&
        setInitialData({
          ...initialData,
          err: err.response.data.msg,
          success: "",
        });
      // console.log("nn ",err.response.data.msg)
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInitialData({ ...initialData, [name]: value, err: "", success: "" });
  };

  const getInitialData = async () => {
    console.log(user._id);
    const id = user._id;
    axios
      .get(`http://localhost:5000/user/is-initial-data-available`, {
        headers: { Authorization: token, userid: id },
      })
      .then((response) => {
        const data1 = response.data;
        // console.log(data1);
        setVisible(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showDurationAndCycleLength = async () => {};

  const showUpdateInitialButton = async () => {};
  useEffect(() => {
    getInitialData();
  }, []);

  const calendarVisibility=()=>{
    if(!visible){
   return ( <>
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
    // events={[{ title: getEvent(), date: setDate() }]}
    eventContent={renderEventContent}
  />
  </>)
    }
  }
  const visibility = () => {
    if (visible) {
      //  showDurationAndCycleLength()
      return (
        <>
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
                        id="duration"
                        name="duration"
                        placeholder="Duration"
                        onChange={handleChangeInput}
                        value={duration}
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
                        id="cycleLength"
                        name="cycleLength"
                        label="Approximate number of days for next period to come"
                        placeholder="Gap between each period cycle to come"
                        onChange={handleChangeInput}
                        value={cycleLength}
                      />
                    </Grid>
                  </div>
                </CardContent>
              </div>
            </Card>
          }

          <div></div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {
              <button
                className="save_button"
                onClick={handleSubmit}
                type={onsubmit}
              >
                Save Initial Information
              </button>
            }
          </div>
        </>
      );
    } else {
      //  showUpdateInitialButton()
      return (
        <>
          <div></div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {
              <button
                className="save_button"
                onClick={handleSubmit}
                type={onsubmit}
              >
                update Initial Information
              </button>
            }
          </div>
        </>
      );
    }
  };
  const [show, setShow] = useState(false);
  const handleDateClick = (arg) => {
    // alert("Event added");

    setShow(true);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </div>
    );
  };

  let str = formatDate(new Date(), {
    month: "long",
    year: "numeric",
    day: "numeric",
  });

  return (
    <div className="main">
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <div className="card_body ">
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
                      required
                      type="date"
                      id="startDate"
                      name="startDate"
                      onChange={handleChangeInput}
                      value={startDate}
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
                      required
                      id="endDate"
                      name="endDate"
                      onChange={handleChangeInput}
                      value={endDate}
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
        {visibility()}
      </div>
      <div className="calendar_body">
    { calendarVisibility()}
      </div>
      <AddNotesModal show={show} onClose={() => setShow(false)} />
    </div>
  );
}
