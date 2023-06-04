const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const morgan = require("morgan");

// CONNECT TO POSTGRE
const connectPostgre = require('./src/config/postgre.js');
connectPostgre();

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// DOTENV CONFIG
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });

// CORS
app.use(cors({ origin: "*" }));
app.use((req, res, next) => {
  res.header("Access-Controll-Allow-Origin", "*");
  res.header(
    "Access-Controll-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// ROUTES
const sqlBuildersRoute = require('./src/routes/sqlbuilders.js');
app.get('/', (req, res) => {
    res.send('API TBD by Aufa Nasywa Rahman (21/475255/TK/52454)');
});
app.use('/sqlbuilders', sqlBuildersRoute);

// ERROR HANDLING
app.use((req, res, next) => {
    const error = new Error("Not found!");
    error.status = 404;
    next(error);
  });
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });


// LISTENING ON PORT
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
