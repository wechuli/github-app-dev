const express = require("express"),
  cors = require("cors"),
  morgan = require("morgan"),
  helmet = require("helmet");

const eventRoute = require("./routes/main");

const app = express();

//middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/app/events", eventRoute);
// app.use("/app/installation", userRoutes);

//404 default route

app.use((req, res) => {
  res.status(404).json({ error: true, message: "Route unavailable" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.info(`Listening on Port ${PORT}`));
