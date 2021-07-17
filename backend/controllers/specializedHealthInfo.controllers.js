"use strict";
const MultipleFile = require("../models/specializedHealthInfo.model");

const saveSpecializedHealthInfo = async (req, res) => {
  try {
    // let user = req.headers["userid"];
    let { user, folder, description, noteDate } = req.body;
    let filesArray = [];
    await MultipleFile.find({ user, folder }).then((result) => {
      req.files.forEach((element) => {
        const file = {
          fileName: element.originalname,
          filePath: element.path,
          fileType: element.mimetype,
          fileSize: fileSizeFormatter(element.size, 2),
        };
        filesArray.push(file);
      });
      console.log("eccec ", result.length);
      const multipleFiles = new MultipleFile({
        user: user,
        folder: folder,
        description: description,
        noteDate: noteDate,
        files: filesArray,
        numberOfFiles: filesArray.length,
      });
      multipleFiles
        .save()
        .then(() => {
          res.json({ msg: "Files Uploaded Successfully" });
        })
        .catch((err) => {
          res.json({ msg: "This folder already exists" });
        });
    });
  } catch (error) {
    console.log("cqecd ", error.message);
    res.send(error.message);
  }
};

const updateSpecializedHealthInfo = async (req, res) => {
  let user = req.headers["userid"];
  let { folder, description, noteDate } = req.body;

  await MultipleFile.findOneAndUpdate(
    { user, folder },
    {
      description,
      noteDate,
    }
  )
    .then(() => {
      res.json({ msg: "Update Success!" });
    })
    .catch((err) => {
      res.json({ msg: err.message });
    });
};

const getallSpecializedHealthInfo = async (req, res, next) => {
  try {
    let user = req.headers["userid"];
    
    console.log("user          ", user);
    const files = await MultipleFile.find({ user });
    console.log("files", files);
    res.status(200).send(files);
  } catch (error) {
    res.send(error.message);
  }
};
const getallMediaFiles = async (req, res) => {
  try {
    const folderID = req.headers["folderid"];

    const files = await MultipleFile.findOne({ folderID });
    res.status(200).send(files.files);
  } catch (error) {
    res.send(error.message);
  }
};

const getFolderItems = async (req, res) => {
  try {
    const folderID = req.headers['folderid'];
    console.log("folderID: ", folderID);
    const files = await MultipleFile.findById(folderID, function (err, ans) {
      if (err) {
        console.log("getallMediaFiles>err: ", 'no files found');
        res.send("no files found")
      } if(ans) {
        console.log("getallMediaFiles>ans: ", ans.files);
        res.status(200).send(ans.files);
      }
    });
  } catch (error) {
    res.send(error.message);
  }
};

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

module.exports = {
  saveSpecializedHealthInfo,
  getallSpecializedHealthInfo,
  getallMediaFiles,
  updateSpecializedHealthInfo,
  getFolderItems,
};
