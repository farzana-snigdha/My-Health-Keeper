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

import { useHistory } from "react-router-dom";

import Modal from 'react-bootstrap/Modal'
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@material-ui/core";


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
  let history = useHistory();

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

  const handleUpdate=async (e)=>{
    e.preventDefault()

    const id = user._id;
    let userEmail = user.email;

    try {
      const res = await axios.patch(
        "http://localhost:5000/user/update-menstrual-data",
        {
          startDate,
          endDate,
         
        },
        {
          headers: { Authorization: token, userid: id },
        }
      );

      setInitialData({ ...initialData, err: "", success: res.data.msg });
      console.log("nn ", res.data.msg);
      history.push("/menstrual-cycle");
    } catch (err) {
      err.response.data.msg &&
        setInitialData({
          ...initialData,
          err: err.response.data.msg,
          success: "",
        });
      // console.log("nn ",err.response.data.msg)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = user._id;
    let userEmail = user.email;

    try {
      const res = await axios.post(
        "http://localhost:5000/user/setup-initial-data",
        {
          startDate,
          endDate,
          duration,
          cycleLength,
          userEmail,
        },
        {
          headers: { Authorization: token, userid: id },
        }
      );

      setInitialData({ ...initialData, err: "", success: res.data.msg });
      console.log("nn ", res.data.msg);
      history.push("/menstrual-cycle");
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

  const calendarVisibility = () => {
    if (!visible) {
      return (
        <>
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
        </>
      );
    }
  };
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
                        type="number"
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
                        type="number"
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
                onClick={handleUpdate}
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDateClick = (arg) => {
    // alert("Event added");

    handleShow(true);
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
      <div className="calendar_body">{calendarVisibility()}</div>
      <Modal 
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Notes 🗒</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="center">
            <div>
              <label for="date">Date : </label>
              <input type="date" name="date" />
            </div>
            <div>
            <label for="mood">Mood : </label>
            <input type="mood" name="mood" />
            </div>
            <div>
            <label for="symptoms">Symptoms : </label>
            <input type="symptoms" name="symptoms" />
            </div>
            <div>
            <label for="flow">Flow : </label>
            <input type="flow" name="flow" />
            </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
