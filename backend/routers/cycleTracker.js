const express = require("express");
const router = express.Router();
const cycleTrackerCtrl = require("../controllers/cycleTrackerControllers");
const auth = require("../middleware/auth");

router.post("/setup-initial-data", auth, cycleTrackerCtrl.setupInitialData);
router.post("/cycleTracker-notes", auth, cycleTrackerCtrl.createNotes);
router.get("/cycleTracker-display-notes", auth, cycleTrackerCtrl.displayNotes);

module.exports = router;
