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
const booksRoute = require('./src/routes/books.js');
const wroteRoute = require('./src/routes/wrote.js');
const authorRoute = require('./src/routes/author.js');
const storeRoute = require('./src/routes/store.js');
const customerRoute = require('./src/routes/customer.js');
const staffRoute = require('./src/routes/staff.js');
const languageRoute = require('./src/routes/language.js');
const purchaseRoute = require('./src/routes/purchase.js');
const inventoryRoute = require('./src/routes/inventory.js');
const publisherRoute = require('./src/routes/publisher.js');
const addressRoute = require('./src/routes/address.js');
const genreRoute = require('./src/routes/genre.js');
const countryRoute = require('./src/routes/country.js');
const bookGenreRoute = require('./src/routes/bookgenre.js');
const cityRoute = require('./src/routes/city.js');

app.get('/', (req, res) => {
    res.send('API TBD by Aufa Nasywa Rahman (21/475255/TK/52454)');
});
app.use('/sqlbuilders', sqlBuildersRoute);
app.use('/Book', booksRoute);
app.use('/Wrote', wroteRoute);
app.use('/Author', authorRoute);
app.use('/Store', storeRoute);
app.use('/Customer', customerRoute);
app.use('/Staff', staffRoute);
app.use('/Language', languageRoute);
app.use('/Purchase', purchaseRoute);
app.use('/Inventory', inventoryRoute);
app.use('/Publisher', publisherRoute);
app.use('/Address', addressRoute);
app.use('/Genre', genreRoute);
app.use('/Country', countryRoute);
app.use('/BookGenre', bookGenreRoute);
app.use('/City', cityRoute);

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