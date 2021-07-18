import React, { useState, useEffect, useRef } from "react";
import "../../../static/Styling/spHealthInfo.css";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import ModalImage from "react-modal-image";
import LazyLoad from "react-lazyload";
import { Button, Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import PdfView from "./pdfView";

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
  // const inputRef = useRef(null);
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);

  const [mediaFiles, setMediaFiles] = useState([]);
  const { state } = useLocation();

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
            // ref={inputRef}
            type="file"
            // hidden
            onChange={(e) => {
              MultipleFileChange(e);
            }}
            multiple
          ></input>
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
                      <LazyLoad key={element.fileName}>
                        <ModalImage
                          small={`http://localhost:5000/${element.filePath}`}
                          large={`http://localhost:5000/${element.filePath}`}
                          alt={element.fileName}
                          hideDownload={false}
                          hideZoom={false}
                        />
                        <h7>
                          <b>Name:</b> {element.fileName}
                        </h7>
                      </LazyLoad>
                    ) : (
                      <div className="react-pdf__Page__canvas">
                        <LazyLoad key={element.fileName}>
                          <PdfView getFilePath={element.filePath} />
                          <h7>
                            <b>Name:</b> {element.fileName}
                          </h7>
                        </LazyLoad>
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
