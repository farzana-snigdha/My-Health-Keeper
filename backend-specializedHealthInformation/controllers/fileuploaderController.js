"use strict";
const MultipleFile = require("../models/multiplefile.models");

const multipleFileUpload = async (req, res) => {
  try {
    let user = req.headers["userid"];
    let title = req.body.title;
    let filesArray = [];
    console.log(req.files);
    req.files.forEach((element) => {
      const file = {
        fileName: element.originalname,
        filePath: element.path,
        fileType: element.mimetype,
        fileSize: fileSizeFormatter(element.size, 2),
      };
      filesArray.push(file);
    });
    const multipleFiles = new MultipleFile({
      user: user,
      title: title,
      files: filesArray,
    });
    await multipleFiles.save().then(() => {
      res.status(201).send("Files Uploaded Successfully");
    });
  } catch (error) {
    console.log("cqecd ", error.message);
    res.send(error.message);
  }
};

const getallMultipleFiles = async (req, res, next) => {
  try {
    let user = req.headers["userid"];
    let title=req.body.title

    const files = await MultipleFile.find({ user,title });
    res.status(200).send(files);
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
  multipleFileUpload,
  getallMultipleFiles,

};
