// Football API Server
const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const { log } = require("console");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

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
    // slug: { type: String, required: true, unique: true },
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

// Delete Team
app.delete("/team/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTeam = await Team.findByIdAndDelete(id);

    if (!deletedTeam) {
      return res
        .status(404)
        .json({ success: false, message: "Team not found" });
    }

    console.log("Team removed:", deletedTeam.name);
    res
      .status(200)
      .json({ success: true, message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Match Schema
const MatchSchema = mongoose.Schema({
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  status: {
    type: String,
    enum: ["live", "finished", "upcoming"],
    required: true,
    default: "upcoming",
  },
  homeScore: { type: Number, default: 0 },
  awayScore: { type: Number, default: 0 },
  startTime: Date,
  endTime: Date,
  paused: { type: Boolean, default: false },
  additionalTime: { type: Number, default: 0 }, // in minutes
  elapsedTime: { type: Number, default: 0 }, // in minutes
  elapsedTimeMs: { type: Number, default: 0 }, // in milliseconds
});

const Match = mongoose.model("Match", MatchSchema);

// Add Match
app.post("/addmatch", async (req, res) => {
  try {
    const { id, homeTeam, awayTeam, date, time, venue, status, score } =
      req.body;
    const match = new Match({
      id,
      homeTeam,
      awayTeam,
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
app.delete("/matches/:id", async (req, res) => {
  try {
    const deletedMatch = await Match.findByIdAndDelete(req.params.id);
    if (!deletedMatch) {
      return res
        .status(404)
        .json({ success: false, message: "Match not found" });
    }
    res.json({ success: true, message: "Match deleted", match: deletedMatch });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update Match
app.put("/updatematch/:id", async (req, res) => {
  try {
    const { score, status } = req.body;
    const updatedMatch = await Match.findByIdAndUpdate(
      req.params.id,
      { score, status },
      { new: true }
    );
    res.json({ success: true, match: updatedMatch });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

//Update Match Score
app.put("/updatescore/:id", async (req, res) => {
  try {
    const { team, action } = req.body; // action: "increment" or "decrement"
    const match = await Match.findById(req.params.id);

    if (!match)
      return res
        .status(404)
        .json({ success: false, message: "Match not found" });

    if (team === "home") {
      if (action === "increment") match.homeScore += 1;
      if (action === "decrement" && match.homeScore > 0) match.homeScore -= 1;
    } else if (team === "away") {
      if (action === "increment") match.awayScore += 1;
      if (action === "decrement" && match.awayScore > 0) match.awayScore -= 1;
    }

    await match.save();

    io.emit("scoreUpdated", match);

    res.json({ success: true, match });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

//Update Status
app.put("/updatestatus/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const match = await Match.findById(req.params.id);

    if (!match) {
      return res.status(404).json({ success: false, error: "Match not found" });
    }

    let updateData = { status };

    if (status === "live") {
      // record start time when resuming or starting
      updateData.startTime = new Date();
    } else if (status === "paused" || status === "finished") {
      if (match.startTime) {
        const elapsed = Math.floor(
          (Date.now() - match.startTime.getTime()) / 60000
        );
        updateData.elapsedTime = match.elapsedTime + elapsed;
      }
    }

    const updatedMatch = await Match.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ success: true, match: updatedMatch });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put("/undostatus/:id", async (req, res) => {
  try {
    const { status, elapsedTime } = req.body;

    const updatedMatch = await Match.findByIdAndUpdate(
      req.params.id,
      { status, elapsedTime },
      { new: true }
    );

    res.json({ success: true, match: updatedMatch });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start Match
app.put("/matches/start/:id", async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      { status: "live", startTime: new Date(), elapsedTime: 0 },
      { new: true }
    );
    res.json({ success: true, match });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

//Pause/Resume Match
app.put("/matches/pause/:id", async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (req.body.paused) {
      // Pause: accumulate elapsed time and clear startTime
      if (!match.paused && match.startTime) {
        const now = Date.now();
        const elapsed = now - new Date(match.startTime).getTime();
        match.elapsedTimeMs = (match.elapsedTimeMs || 0) + elapsed;
        match.paused = true;
        match.startTime = null;
        await match.save();
      }
    } else {
      // Resume: set new startTime and keep elapsedTimeMs
      if (match.paused) {
        match.startTime = Date.now();
        match.paused = false;
        await match.save();
      }
    }
    res.json({ success: true, match });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update Additional Time
app.put("/matches/additional-time/:id", async (req, res) => {
  try {
    const { additionalTime } = req.body;
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      { additionalTime },
      { new: true }
    );
    res.json({ success: true, match });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Finish Match
app.put("/matches/finish/:id", async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match)
      return res
        .status(404)
        .json({ success: false, message: "Match not found" });

    // calculate total elapsed time
    const totalMinutes =
      match.elapsedTime +
      Math.floor((Date.now() - match.startTime.getTime()) / 60000);

    match.status = "finished";
    match.elapsedTime = totalMinutes;
    await match.save();

    res.json({ success: true, match });
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
    role: {
      type: String,
      required: true,
      enum: ["player", "coach", "manager"],
    },
    name: { type: String, required: true },
    nationality: { type: String },
    position: { type: String },
    jerseyNumber: { type: Number },
    age: { type: Number },
    team: { type: String },
    coachingRole: { type: String },
    experience: { type: Number },
    contact: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const Person = mongoose.model("Person", PersonSchema);

// Create Person
app.post("/person", async (req, res) => {
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

//Player Stats Schema
const StatsSchema = mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
    required: true,
  },
  playerName: { type: String, required: true },
  position: { type: String, required: true },
  team: { type: String, required: true },
  matches: { type: Number, default: 0 },
  goals: { type: Number, default: 0 },
  assists: { type: Number, default: 0 },
  cleansheets: { type: Number, default: 0 },
  yellowCards: { type: Number, default: 0 },
  redCards: { type: Number, default: 0 },
});

const Stats = mongoose.model("Stats", StatsSchema);

//Create Player Stats
app.post("/addplayerstats", async (req, res) => {
  try {
    // Find the player by name or by a playerId sent from the frontend
    const player = await Person.findById(req.body.playerId);
    if (!player) {
      return res
        .status(404)
        .json({ success: false, message: "Player not found" });
    }
    const stats = new Stats({
      playerId: player._id,
      playerName: player.name,
      position: player.position,
      team: player.team,
      matches: req.body.matches,
      goals: req.body.goals,
      assists: req.body.assists,
      cleansheets: req.body.cleansheets,
      yellowCards: req.body.yellowCards,
      redCards: req.body.redCards,
    });
    await stats.save();
    res.status(201).json({
      success: true,
      message: "Player stats added successfully",
      stats,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

//Update Player Stats
app.put("/updatestats/:id", async (req, res) => {
  try {
    const updated = await Stats.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ success: true, updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get All Player Stats
app.get("/allplayerstats", async (req, res) => {
  try {
    const allStats = await Stats.find({});
    console.log("All Player Stats Fetched");
    res.status(200).json({ success: true, allStats });
  } catch (error) {
    console.error("Error fetching all player stats", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

//Delete Player Stats
app.delete("/deletestats/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStat = await Stats.findByIdAndDelete(id);
    if (!deletedStat) {
      return res
        .status(404)
        .json({ success: false, message: "Stats not found" });
    }
    log("Stats deleted:", deletedStat.playerName);
    res.json({ success: true, message: "Stats deleted" });
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
