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
import DatePicker from "react-datepicker";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@material-ui/core";
import { useCookies } from "react-cookie";
const initialState = {
  startdate: "",
  enddate: "",
  duration: "",
  cycleLength: "",
  err: "",
  success: "",
  eventDate: "",
  mood: "",
  symptoms: "",
  flow: "",
};

export default function MenstrualCycle() {
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  const [cookies, setCookie] = useCookies(["user"]);

  const [initialData, setInitialData] = useState(initialState);
  const [visible, setVisible] = useState(true);
  const {
    startDate,
    endDate,
    duration,
    cycleLength,
    err,
    success,
    eventDate,
    mood,
    symptoms,
    flow,
  } = initialData;
  let history = useHistory();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInitialData({ ...initialData, [name]: value, err: "", success: "" });
  };
  const handle = (id) => {
    setCookie("UserMenstrualInfo", id, { path: "/menstrual-cycle" });
  };
  const getInitialData = async () => {
    if (localStorage.getItem("UserMenstrualInfo")) {
      console.log("sxsx  ", cookies.UserMenstrualInfo);
      setVisible(false);
    }
  };

  useEffect(() => {
    getInitialData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

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
  };
  const [noteDate, setnoteDate] = useState(new Date());
  const handleDateInput = (e) => {
    const { name , value } = e.target;
    setnoteDate({ [name] : value });
    //console.log(name)
  };
  const showNotes= async (e) => {
    e.preventDefault();
    const noteDates = noteDate.name;
    const id = user._id;

    try {
      const res = await axios.get(
        "http://localhost:5000/user/cycleTracker-display-notes",
        {
          headers: { Authorization: token, userid: id, dates: noteDates },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
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
      localStorage.setItem("UserMenstrualInfo", id);
      handle(id);
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
          {
           
             isViewEnabled?
             <div>
             <h1 >These are the notes of ${demo} </h1> 
             <Button className="notesButton" onClick={handleNotesShow}>
             Hide Your Notes
           </Button>
           </div>: " "
          
          }
          
          
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={addModalShow}
            onHide={handleNotesClose}
          >
            <Modal.Header>
              <Modal.Title>📝 View Notes </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className="viewNote">
                <div>
                  <label for="date">Date : </label>
                  <input
                    type="date"
                    id="noteDate"
                    name="noteDate"
                    value={noteDate}
                    onChange={handleDateInput}
                    InputLabelProps={{
                      shrink: false,
                    }}
                  />
                  <Button variant="primary" type="submit" onClick={showNotes}>
                    GO
                  </Button>
                </div>
                {/* <div className="note_body">
        {noteList.map((cycle_schemas) => (
          <div className="note_card">
            <h2>{cycle_schemas.notes.eventDate.substring(0,10)}</h2>
            <p>Mood: {cycle_schemas.notes.mood}</p>
            <p>Symptoms: {cycle_schemas.notes.symptoms}</p>
            <p>Flow: {cycle_schemas.notes.flow}</p>
          </div>
        ))}
      </div> */}
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleNotesClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>{" "}
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

  //------Viewing NoteLists----

  const [addModalShow, setNotesModal] = useState(false);
  const handleNotesClose = () => setNotesModal(false);
  const handleNotesShow = () => setisViewEnabled(false)
  const [isViewEnabled, setisViewEnabled] = useState(false);

  const [noteList, setNoteList] = useState([]);
  

  
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
  const [demo, setDemo] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Demo = (ar) => {
    setDemo(ar);
  };
 const viewNotes =()=>{
   console.log(demo)
   handleClose()
   if(isViewEnabled){
     setisViewEnabled(false)
   }
   else setisViewEnabled(true)
 }
  const handleDateClick = (arg) => {
    // e.preventDefault();
    handleShow(true);
    Demo(arg.dateStr);
  };

  const saveNotes = async () => {
    const id = user._id;
    try {
      const res = await axios.post(
        "http://localhost:5000/user/cycleTracker-notes",
        {
          eventDate: demo,
          mood,
          symptoms,
          flow,
        },
        {
          headers: { Authorization: token, userid: id },
        }
      );

      setInitialData({ ...initialData, err: "", success: res.data.msg });
      console.log("nn ", res.data.msg);
      history.push("/menstrual-cycle");
      handleClose(true);
      // alert("Notes Added");
    } catch (err) {
      err.response.data.msg &&
        setInitialData({
          ...initialData,
          err: err.response.data.msg,
          success: "",
        });
    }
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </div>
    );
  };

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
        show={show}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title>📝 Add Notes </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="center">
            <div>
              <label for="date">Date : </label>
              <input
                type="date"
                value={demo}
                onChange={handleChangeInput}
                name="eventDate"
              />
            </div>
            <div>
              <label for="mood">Mood : </label>
              <input
                type="mood"
                value={mood}
                onChange={handleChangeInput}
                name="mood"
              />
            </div>
            <div>
              <label for="symptoms">Symptoms : </label>
              <input
                type="symptoms"
                value={symptoms}
                onChange={handleChangeInput}
                name="symptoms"
              />
            </div>
            <div>
              <label for="flow">Flow : </label>
              <input
                type="flow"
                value={flow}
                onChange={handleChangeInput}
                name="flow"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={viewNotes} > View Notes</Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={saveNotes}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}