const Cycle = require("../models/periodTracker.model");
const sendMail = require("./sendMail");

setInterval(() => {
  // console.log('ss')
  // let user = req.headers['userid'];
  Cycle.find({}, (err, reminder) => {
    if (err) {
      console.log("cycle notification: ", err);
    }
    if (reminder) {
      //for loop reminder.size,
      for (i = 0; i < reminder.length; i++) {
        if (!reminder[i].isReminded) {
       
          const now = new Date();
          if ((new Date(reminder[i].startDate)) - now < 0) {
            // console.log(reminder[i].userEmail)
            Cycle.findByIdAndUpdate(
              reminder[i]._id,
              { isReminded: true },
              (err, remind) => {
                if (err) {
                  console.log(err);
                }
                // console.log(remind.userEmail)
                sendMail(
                  remind.userEmail,
                  null,
                  "get ready for your period"
                );

              }
            );
            // console.log(new Date(reminder[i].startDate));
          }
        }
      }
      // console.log(reminder.length);
    }
  });
}, 1000);
const cycleTrackerControllers = {
  displayNotes: async (req, res) => {
    try {
      let user = req.headers["userid"];

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
      let user = req.headers["userid"];

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
      let user = req.headers["userid"];
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
      const { startDate, endDate } = req.body;
      await User.findOneAndUpdate(
        { user },
        {
          startDate,
          endDate,
        }
      );

      return res.json({ msg: "Update Success!" });
    } catch (err) {
      return res.status(500).json({ setupData: err.message });
    }
  },
  isInitialDataAvailable: async (req, res) => {
    try {
      let user = req.headers["userid"];
      // console.log(JSON.stringify(req.headers['userid']))
      console.log("check ", user);
      const check = await Cycle.findOne({
        user,
      });
      // console.log(check)
      if (check) {
        console.log(check.startDate);
        return res.json(check);
      }
    } catch (err) {
      return res.status(500).json({ setupData: err.message });
    }
  },

  setupInitialData: async (req, res) => {
    try {
      let user = req.headers["userid"];
      // console.log(user);

      const { startDate, endDate, duration, cycleLength, userEmail } = req.body;
      if (!startDate || !endDate || !duration || !cycleLength)
        return res.json({ msg: "Please fill in all fields." });
      // const check = await Cycle.findOne({
      //   user,
      // });
      //  console.log("bbb ",check)
      // if (check) {

      //   // const {startDate, endDate,} = req.body
      //   // await User.findOneAndUpdate({user}, {
      //   //   startDate, endDate
      //   // })

      //  return res.json({msg: "Update Success!"})

      // }
      const initialinfo = new Cycle({
        user: user,
        startDate: startDate,
        endDate: endDate,
        duration: duration,
        cycleLength: cycleLength,
        userEmail: userEmail,
      });

      await initialinfo.save();
      return res.json({ msg: "Initial data is saved" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = cycleTrackerControllers;
