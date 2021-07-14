const express = require("express");
const {  upload } = require("../helpers/filehelper");
const router = express.Router();
const {
  saveSpecializedHealthInfo,
  getallSpecializedHealthInfo,
  getallMediaFiles,
  updateSpecializedHealthInfo,
} = require("../controllers/specializedHealthInfo.controllers");

router.post(
  "/save-specialized-health-info",
  upload.array("files"),
  saveSpecializedHealthInfo
);
router.get("/get-specializedHealthInfo", getallSpecializedHealthInfo);
router.get("/getallMediaFiles", getallMediaFiles);
router.patch("/updateSpecializedHealthInfo", updateSpecializedHealthInfo);
module.exports = 
  router
;
