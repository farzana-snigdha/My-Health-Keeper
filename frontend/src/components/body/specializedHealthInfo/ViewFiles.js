import React, { useState, useEffect, useRef } from "react";
import "../../../static/Styling/spHealthInfo.css";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import { Button, IconButton, Link, Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import PdfView from "./pdfView";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles({
  root: {
    maxWidth: "100mvh",
  },
  media: {
    resizeMode: "contain",
    height: 180,
    width: 190,
  },
});

export default function AddFiles() {
  const inputRef = useRef(null);
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  const [mediaFiles, setMediaFiles] = useState([]);
  const { state } = useLocation();
  console.log("state1: ", state);
  const showMediaFiles = async (state) => {
    await axios
      .get("http://localhost:5000/api/getFolderItems", {
        headers: { Authorization: token, folderid: state._id },
      })
      .then((res) => {
        console.log("    hghytcfh    ", res.data);
        setMediaFiles(res.data);
      });
  };

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const [multipleFiles, setMultipleFiles] = useState("");
  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
  };

  const folderName = state.folder;
  const fileLength = state.numberOfFiles;

  useEffect(async () => {
    showMediaFiles(state);
  }, []);

  const updateFiles = async () => {
    const formData = new FormData();
    console.log("swdxs", state.folder);

    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append("files", multipleFiles[i]);
    }
    await axios
      .put("http://localhost:5000/api/updateMediaFiles", formData, {
        headers: { Authorization: token, folder: folderName },
      })
      .then((result) => {
        // history.push("/view-files");
        showMediaFiles(state);
        setMultipleFiles("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="spHealth_reminder_buttons">
        <div className="viewFiles_Btn">
          <Button className="viewFiles_addBtn" onClick={updateFiles} multiple>
            {" "}
            Save
          </Button>
          <input
            ref={inputRef}
            type="file"
            // hidden
            onChange={(e) => {
              MultipleFileChange(e);
              // updateFiles()
            }}
            // className="form-control"
            multiple
          ></input>

          {/* <Button
            className="viewFiles_addBtn"
            onClick={() => inputRef.current.click()}
            onChange={(e) => {MultipleFileChange(e)
            updateFiles()}}
            // className="form-control"
            multiple
          >
            {" "}
            ➕ Add New Files
          </Button> */}
        </div>
      </div>
      <h3>&emsp;{folderName}</h3>
      <hr></hr>
      {fileLength == 0 ? (
        <>NO Files Added 😢</>
      ) : (
        <div>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {mediaFiles.map((element) => (
              <div>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={mediaFiles.indexOf(element)}
                >
                  <div className="media_card">
                    {element.fileType != "application/pdf" ? (
                      <>
                        {" "}
                        {console.log(element.fileType)}
                        <img
                          className={classes.media}
                          component="img"
                          src={`http://localhost:5000/${element.filePath}`}
                          title="Contemplative Reptile"
                          alt="lpl"
                        />
                        <CardContent>
                          <h7>
                            <b>Name:</b> {element.fileName}
                          </h7>
                          <div>
                            <IconButton
                              className="viewBtn"
                              data-toggle="tooltip"
                              title="Delete this file"
                              // onClick={() => deleteReminder(medicines._id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </CardContent>
                      </>
                    ) : (
                     
                      <div className="react-pdf__Page__canvas">
                        
                         <PdfView getFilePath={element.filePath}/>
                   
                        <CardContent>
                          <h7>
                            <b>Name:</b> {element.fileName}
                          </h7>
                          <div>
                            <IconButton
                              className="viewBtn"
                              data-toggle="tooltip"
                              title="Delete this file"
                              // onClick={() => deleteReminder(medicines._id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </CardContent>
                      </div>
                    )}
                  </div>
                </Grid>
              </div>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
}
