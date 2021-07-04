const express = require("express");
const router = express.Router();
const cycleTrackerCtrl = require("../controllers/cycleTrackerControllers");
const auth = require("../middleware/auth");

router.post("/setup-initial-data", auth, cycleTrackerCtrl.setupInitialData);
router.post("/cycleTracker-notes", auth, cycleTrackerCtrl.createNotes);
router.get("/cycleTracker-display-notes", auth, cycleTrackerCtrl.displayNotes);
router.delete("/cycleTracker-delete-notes", auth, cycleTrackerCtrl.removeNotes);
router.post("/update-menstrual-data",cycleTrackerCtrl.updateInitialData)
router.get("/is-initial-data-available",cycleTrackerCtrl.isInitialDataAvailable)

module.exports = router;
