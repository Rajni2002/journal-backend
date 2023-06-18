import express from "express";
import cors from "cors";
import journalRouter from './routes/journal.js'
// import feedRouter from './routes/feed.js'
import authRouter from './routes/auth.js'
import AppError from './utils/appError.js'
import errorHandler from './utils/errorHandler.js'

const app = express();

const corsOptions = {
  origin: "http://localhost:8080"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.use('/journal', journalRouter);
app.use('/auth', authRouter);
// app.use('/feeds', feedRouter);
// simple route
app.get("/", (req, res, ) => {
  res.json({ message: "Welcome to journal api." });
});

app.all("*", (req, res, next) => {
  next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
});
app.use(errorHandler);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});