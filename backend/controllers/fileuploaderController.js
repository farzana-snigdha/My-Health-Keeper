const MultipleFile = require("../models/multiplefile.models");

const multipleFileUpload = async (req, res, next) => {
  try {
    let user = req.headers["userid"];

    let filesArray = [];
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
user:user,
      title: req.body.title,
      files: filesArray,
    });
    await multipleFiles.save();
    res.status(201).send("Files Uploaded Successfully");
  } catch (error) {
    res.send(error.message);
  }
};

const getallMultipleFiles = async (req, res, next) => {
  try {
    let user = req.headers["userid"];

    const files = await MultipleFile.find({user});
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
