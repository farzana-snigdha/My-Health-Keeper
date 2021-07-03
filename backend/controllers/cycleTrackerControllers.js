const Cycle = require("../models/periodTracker.model");

const cycleTrackerControllers = {
  displayNotes: async (req, res) => {
    try {
      let user = req.user.id;

      const { eventDate } = req.body;
      const { flow } = req.body;
      const data = await Cycle.findOne({ user });
      // console.log(data);
      const noteData = data.notes.find((note) => note.eventDate == eventDate);
      res.json(noteData);
      console.log(noteData.mood);
      // res.json({ msg: data.notes.find((note) => note.eventDate == eventDate) });
    } catch (err) {
      return res.status(500).json({ displayNotes: err.message });
    }
  },

  //doesn't work
  removeNotes: async (req, res) => {
    try {
      let user = req.user.id;

      const { eventDate } = req.body;
      const { flow } = req.body;
      const { mood } = req.body;
      const data = await Cycle.findOne({ user });
      const noteData = data.notes.find((note) => note.flow == flow);
      console.log(noteData);

      // console.log(Cycle.findOneAndUpdate({ notes: noteData }, { mood }));
      res.json({ msg: "k" });
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

  updateInitialData: async (req, res) => {
    try {
      let user = req.user.id;
   
      
        // console.log(check)
        const {startDate, endDate,} = req.body
        await User.findOneAndUpdate({user}, {
          startDate, endDate
        })

       return res.json({msg: "Update Success!"})
        

    
    } catch (err) {
      return res.status(500).json({ setupData: err.message });
    }
  },

  setupInitialData: async (req, res) => {
    try {
      let user = req.user.id;
      console.log(user);

      const { startDate, endDate, duration, cycleLength } = req.body;
      if (!startDate || !endDate || !duration || !cycleLength)
        return res.json({ msg: "Please fill in all fields." });
      const check = await Cycle.findOne({
        user,
      });
      if (check) {
        // console.log(check)
        const {startDate, endDate,} = req.body
        await User.findOneAndUpdate({user}, {
          startDate, endDate
        })

       return res.json({msg: "Update Success!"})
        
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
