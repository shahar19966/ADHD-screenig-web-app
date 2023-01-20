const express = require("express");
const patients = require("./data/patients");
const dontenv = require("dotenv");
const connectDB  = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const patientRoutes = require("./routes/patientRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");


const app = express();
dontenv.config();
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running....");
});

// app.get("/api/patients", (req, res) => {
//   res.json(patients);
// });

app.use('/api/users', userRoutes);
app.use('/api/patients', patientRoutes);


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`
  )
);
