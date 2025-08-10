// Football API Server
const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://SeyitanShalom:shalom03@cluster0.zf0de29.mongodb.net/Football"
);

// Welcome API
app.get("/", (req, res) => {
  res.send("Welcome to the Football API");
});

// Image Storage Config
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });
app.use("/images", express.static("upload/images"));

// Image Upload Endpoint
app.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.json({
      success: true,
      message: "Image uploaded successfully",
      imageurl: `http://localhost:${port}/images/${req.file.filename}`,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Team Schema
const TeamSchema = mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    logo: { type: String, required: true },
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", TeamSchema);

// Add Team
app.post("/addteam", async (req, res) => {
  try {
    const { slug, name, logo } = req.body;
    const team = new Team({ slug, name, logo });
    await team.save();
    res.status(201).json({ success: true, message: "Team created", team });
  } catch (error) {
    console.error("Error creating team:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete Team
app.post("/removeteam", async (req, res) => {
  try {
    await Team.findOneAndDelete({ id: req.body.id });
    console.log("Team removed");
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get All Teams
app.get("/allteams", async (req, res) => {
  try {
    const teams = await Team.find({});
    console.log("All teams fetched");
    res.status(200).json({ success: true, teams });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Match Schema
const MatchSchema = mongoose.Schema({
  id: { type: Number, required: true },
  home: { type: String, required: true },
  away: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  status: {
    type: String,
    enum: ["live", "finished", "upcoming"],
    required: true,
  },
  score: { type: String },
});

const Match = mongoose.model("Match", MatchSchema);

// Add Match
app.post("/addmatch", async (req, res) => {
  try {
    const { id, home, away, date, time, venue, status, score } = req.body;
    const match = new Match({
      id,
      home,
      away,
      date,
      time,
      venue,
      status,
      score,
    });
    await match.save();
    res.status(201).json({ success: true, match });
  } catch (error) {
    console.error("Error Adding Match", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete Match
app.post("/removematch", async (req, res) => {
  try {
    await Match.findOneAndDelete({ id: req.body.id });
    console.log("Match removed");
    res.json({
      success: true,
      home: req.body.home,
      away: req.body.away,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get All Matches
app.get("/allmatches", async (req, res) => {
  try {
    const matches = await Match.find({});
    console.log("All matches fetched");
    res.status(200).json({ success: true, matches });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Person Schema (Unified Player/Coach/Manager)
const PersonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["player", "coach", "manager"],
    },
    nationality: { type: String },
    position: { type: String },
    jerseyNumber: { type: Number },
    age: { type: Number },
    team: { type: String },
    coachingRole: { type: String },
    experience: { type: Number },
    club: { type: String },
    contact: { type: String },
  },
  { timestamps: true }
);

const Person = mongoose.model("Person", PersonSchema);

// Create Person
app.post("/people", async (req, res) => {
  try {
    const person = new Person(req.body);
    await person.save();
    res.status(201).json(person);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All People
app.get("/people", async (req, res) => {
  try {
    const people = await Person.find({});
    console.log("All people fetched");
    res.status(200).json({ success: true, people });
  } catch (error) {
    console.error("Error fetching people", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get People by Role
app.get("/people/:role", async (req, res) => {
  try {
    const role = req.params.role;
    const people = await Person.find({ role });
    res.status(200).json({ success: true, people });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// LineUp Schema (referencing Person)
const LineUpSchema = new mongoose.Schema(
  {
    matchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },
    players: [
      {
        person: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Person",
          required: true,
        },
        position: { type: String },
        jerseyNumber: { type: Number },
      },
    ],
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
    },
  },
  { timestamps: true }
);

const LineUp = mongoose.model("LineUp", LineUpSchema);

// Add LineUp
app.post("/addlineup", async (req, res) => {
  try {
    const { matchId, players, coach, manager } = req.body;
    const lineUp = new LineUp({ matchId, players, coach, manager });
    await lineUp.save();
    res.status(201).json({ success: true, lineUp });
  } catch (error) {
    console.error("Error adding lineUp", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get All LineUps
app.get("/allLineUps", async (req, res) => {
  try {
    const allLineUps = await LineUp.find({})
      .populate("players.person")
      .populate("coach")
      .populate("manager");
    console.log("All LineUps Fetched");
    res.status(200).json({ success: true, lineUps: allLineUps });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get LineUp by Match ID
app.get("/lineup/:matchId", async (req, res) => {
  try {
    const matchId = req.params.matchId;
    const lineUp = await LineUp.findOne({ matchId })
      .populate("players.person")
      .populate("coach")
      .populate("manager");

    if (!lineUp) {
      return res
        .status(404)
        .json({ success: false, message: "LineUp not found" });
    }
    res.json({ success: true, lineUp });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Match Event Schema
const EventSchema = new mongoose.Schema({
  team: { type: String, required: true },
  player: { type: String, required: true },
  description: {
    type: String,
    enum: [
      "goal",
      "yellow_card",
      "red_card",
      "substitution",
      "penalty",
      "own_goal",
    ],
    required: true,
  },
  minute: { type: Number, required: true },
  assist: { type: String },
  subIn: { type: String },
  subOut: { type: String },
});

const MatchEvent = mongoose.model("MatchEvent", {
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
    required: true,
  },
  events: [EventSchema],
});

// Create or Update Match Events
app.post("/creatematchevent", async (req, res) => {
  try {
    const { matchId, events } = req.body;
    const existing = await MatchEvent.findOne({ matchId });
    let result;

    if (existing) {
      existing.events = events;
      result = await existing.save();
    } else {
      const newEvents = new MatchEvent({ matchId, events });
      result = await newEvents.save();
    }

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Match Events by Match ID
app.get("/matchevents/:matchId", async (req, res) => {
  try {
    const matchEvents = await MatchEvent.findOne({
      matchId: req.params.matchId,
    });

    if (!matchEvents) {
      return res.status(404).json({ message: "No events found" });
    }

    res.json(matchEvents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(port, (err) => {
  if (!err) {
    console.log(`Server is running on port ${port}`);
  } else {
    console.log("Error starting the server:", err);
  }
});
