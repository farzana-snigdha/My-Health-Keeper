const mongoose = require("mongoose");

const CycleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: "users",
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  duration: {
    type: String,
  },
  cycleLength: {
    type: String,
  },
  notes: [
    {
      eventDate: {
        type: Date,
      },
      mood: {
        type: String,
      },
      symptoms: {
        type: String,
      },
      flow: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("CycleSchema", CycleSchema);
