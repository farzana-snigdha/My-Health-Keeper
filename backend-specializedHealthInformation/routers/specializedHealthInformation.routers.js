const express = require("express");
const { imageUpload,upload, } = require("../helpers/filehelper");
const router = express.Router();
const {
  multipleFileUpload,
  getallMultipleFiles
} = require("../controllers/fileuploaderController");
const auth=require("../../backend/middleware/auth")


router.post("/multipleFiles",upload.array('files'),  multipleFileUpload);
router.get("/getMultipleFiles", getallMultipleFiles);

module.exports = {
  routes: router,
};
