import express from "express";
import morgan from "morgan";
import cors from "cors";
// import mariadb from "mariadb";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";

// ES module workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Import database pool
import pool from "./config/db.js";

const app = express();

// Routers
/*import { habitRouter } from "./routes/habitRoute.js";
import { petRouter } from "./routes/petRoute.js";
import { planetRouter } from "./routes/planetRoute.js";
import { taskRouter } from "./routes/taskRoute.js";
import { userHabitRouter } from "./routes/userHabitRoute.js";
import { userRouter } from "./routes/userRoute.js";*/
import { fileURLToPath } from "url";
import { dirname } from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    const filename = file.fieldname + "-" + uniqueSuffix;
    req.body.file = filename;
    cb(null, filename);
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error('Only .jpg .jpeg .png images are supported!');
      err.name = 'ExtensionError';
      return cb(err);
    }
  },
  limits: { fileSize: 5 * 1000 * 1000 },
});
//const hostname = "nodejs_2425-cs7025-group1";

// Configuration
const PORT = process.env.BACKEND_PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0'; // Important for Docker

// Database connection test
const testDbConnection = async () => {
  try {
    const conn = await pool.getConnection();
    console.log('MySQL database connected successfully');
    conn.release();
  } catch (err) {
    console.error('MySQL connection failed:', err.message);
    // Don't exit in development, retry connection
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      console.log('Retrying database connection in 5 seconds...');
      setTimeout(testDbConnection, 5000);
    }
  }
};

// Test database connection on startup
testDbConnection();


// Use Morgan for logging HTTP requests
app.use(morgan("dev"));

// Middleware
app.use(express.json());

// Use CORS
app.use(cors());

app.set("view engine", "ejs");

app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello");
});

// profile image upload
app.post("/upload", upload.single("img"), (req, res) => {
  console.log("req.body", req.body);
  if (req.file && req.file.path) {
    res.status(200).send(req.file.path);
  } else {
    res
      .status(400)
      .send({ error: "no file was uploaded", "request-body": req.body });
  }
});

/************** ROUTES ******************/

/*// Habits
app.use("/habits", habitRouter);

// Pets
app.use("/pets", petRouter);

// Planets
app.use("/planets", planetRouter);

// Tasks
app.use("/tasks", taskRouter);

// User Habits
app.use("/userHabits", userHabitRouter);

// Users
app.use("/users", userRouter);

// Images
app.get("/uploads/:image", function (req, res) {
  res.sendFile(path.join(__dirname, "/uploads/", req.params.image)); // find out the filePath based on given fileName
});*/

/*
app.post("/create-post", upload.array("postImages", 5), (req, res) => {
  console.log("req.body", req.body);
  console.log("req.files", req.files);
  if (req.file) console.log("req.file", req.file);

  if (req.files ) { // && req.file.path
    connect((conn) => postController.createPost(conn, req, res));
    // res.status(200).send(req.files);
  } else {
    res
        .status(400)
        .send({ error: "no file was uploaded", "request-body": req.body });
  }
});
 */

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});

