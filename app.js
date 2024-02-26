require('dotenv').config(); // loading and configuring environment variables from a file named .env in your Node.js application


const express = require('express'); // basic express server
const expressLayout = require('express-ejs-layouts') //imports the 'express-ejs-layouts' module middleware from the installed dependecies // works with EJS template engine //defines layouts //
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser'); // cookieParser is a module from the cookie-parser package. This middleware parses cookies attached to the client's request and makes them available in the req.cookies object.
const session = require('express-session')
const MongoStore = require('connect-mongo');  // connect-mongo is a MongoDB session store for Express, which means it provides a way to store session data in a MongoDB database.

const connectDB = require('./server/config/db')

const app = express(); //express application
const PORT = 5000 || process.env.PORT // port for the application // attempts to retrieve the value of the 'PORT' environment variable

// db connection
connectDB();

// these two lines of code set up the Express application to handle both URL-encoded form data and JSON data in incoming requests. 
app.use(express.urlencoded({ extended:true })) //this middleware is responsible for parsing incoming requests // 'extended:true' option allows for parsing complex in the UR:-encoded data
app.use(express.json()); // This middleware is used for parsing incoming requests with JSON payloads. It parses the JSON data in the request body and makes it available in req.body for further processing in your routes.
app.use(cookieParser());
app.use(methodOverride('_method'));
// console.log("MongoDB URI:", process.env.MONGO_URI);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    //cookie: { maxAge: new Date ( Date.now() + (3600000) ) }
  })
);


app.use(express.static('public')); // built into Express and is used to serve static files, such as images, stylesheets, scripts, etc //'express.static' the directory from which to serve the static files... "public" directory

//Template Engine
app.use(expressLayout); // 'app.use' used to mount middleware functions
app.set('layout', './layouts/main'); // sets the default layout for your views. It tells Express that, by default, it should use the layout located at ./layouts/main.ejs
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'))
app.use('/', require('./server/routes/admin'))

app.listen(PORT, () => { // app.listen is used to start the express.js application // listens to incoming requests on this port 500
    console.log(`Server is listening on port ${PORT}`)
})