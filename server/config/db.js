// database connection file, needs to be exported and added to the app.js file

const mongoose = require("mongoose"); // imports the Mongoose library / ODM (Object Data Modeling) library for MongoDB and NodeJs/ provides a way to interact with MonogoDB databases using JS objects

const connectDB = async () =>{ //

    try {
      mongoose.set("strictQuery", false); // ''strictQuery':false' allows you to save data that doesn't conform to the defined schema// any properties not defined in the schema will not be saved to the database by default
      const conn = await mongoose.connect(process.env.MONGO_URI); // 'mongoose.connect' method allows you to establish a connection to the MongoDB database
      console.log(`Database Connected: ${conn.connection.host}`); // This retrieves the hostname of the MongoDB server to which the Mongoose connection has been established.
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;