const Cycle = require("../models/periodTracker.model");

const cycleTrackerControllers = {
  displayNotes: async (req, res) => {
    try {
      let user = req.user.id;

      const { eventDate } = req.body;
      const { flow } = req.body;
      const data = await Cycle.findOne({ user });
      console.log(data);
      console.log(data.notes.find((note) => note.flow == flow));
      res.json({ msg: data.notes.find((note) => note.eventDate == eventDate) });
    } catch (err) {
      return res.status(500).json({ displayNotes: err.message });
    }
  },

  removeNotes: async (req, res) => {
    try {
    } catch (err) {
      return res.status(500).json({ removeNotes: err.message });
    }
  },

  createNotes: async (req, res) => {
    try {
      let user = req.user.id;
      const { mood, symptoms, flow, eventDate } = req.body;
      const check = await Cycle.findOne({
        user,
      });

      if (check) {
        await Cycle.findOneAndUpdate(
          { user },
          {
            $push: {
              notes: {
                eventDate: eventDate,
                mood: mood,
                symptoms: symptoms,
                flow: flow,
              },
            },
          }
        );
        // cycle.findOne({user}).insert({"notes":[{"mood":mood,"symptoms":symptoms,"flow":flow}]})

        res.status(200).json({ createNotes: "saved" });
      } else {
        return res.status(400).json({ msg: "provide the initial data first" });
      }
    } catch (err) {
      return res.status(500).json({ createNotes: err.message });
    }
  },

  setupInitialData: async (req, res) => {
    try {
      let user = req.user.id;
      console.log(user);

      const { startDate, endDate, duration, cycleLength } = req.body;
      if (!startDate || !endDate || !duration || !cycleLength)
        return res.status(400).json({ msg: "Please fill in all fields." });
      const check = await Cycle.findOne({
        user,
      });
      if (check) {
        // console.log(check)
        return res
          .status(400)
          .json({ msg: "You have already provided the data" });
      }
      const initialinfo = new Cycle({
        user,
        startDate,
        endDate,
        duration,
        cycleLength,
      });

      await initialinfo.save();
      res.json({ setupData: "saved" });
    } catch (err) {
      return res.status(500).json({ setupData: err.message });
    }
  },
};

module.exports = cycleTrackerControllers;
