import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";




const ViewFilesApi= {
    // const token = useSelector((state) => state.token);
     [mediaFiles, setMediaFiles] : useState([]),

     [multipleFiles, setMultipleFiles] : useState(""),

      MultipleFileChange :(e) => {
      setMultipleFiles(e.target.files);
    },
      getMediaFiles:()=>{
         return mediaFiles
     },
    
      updateFiles : async (state) => {
       
        const formData = new FormData();
        console.log("swdxs", state.folder);
    
        for (let i = 0; i < multipleFiles.length; i++) {
          formData.append("files", multipleFiles[i]);
        }
        await axios
          .put("http://localhost:5000/api/updateMediaFiles", formData, {
            headers: { Authorization: token, folder: state.folder },
          })
          .then((result) => {
            // history.push("/view-files");
            showMediaFiles(state);
            setMultipleFiles("");
          })
          .catch((err) => {
            console.log(err);
          });
      },
    
    
       showMediaFiles : async (token,state) => {
        
        await axios
          .get("http://localhost:5000/api/getFolderItems", {
            headers: { Authorization: token, folderid: state._id },
          })
          .then((res) => {
            console.log("    hghytcfh    ", res.data);
            setMediaFiles(res.data);
          });
      }
}

export default ViewFilesApi


