const mongoose = require('mongoose'); // ODM(Object Data Modeling) library for MongoDB and Nodejs

//creating the schema which is the database field

const Schema = mongoose.Schema; //  imports the Schema class from the Mongoose library.
const PostSchema = new Schema({
  /*
    'const PostSchema = new Schema({ * schema definition *  });'
    This line creates a new instance of the Schema class, defining the structure for a 'Post' document. 
    Inside the curly braces {}, you specify the fields of the document along with their types and any additional options.
    */

  /*
    The Schema class is responsible for defining the structure of documents within a MongoDB collection. 
    It allows you to specify the fields, their types, and any additional options or constraints.
    */

  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', PostSchema) // 'Post' is a Mongoose model, allows you to interact with the MongoDB collection using methods provided by Mongoose.
/*
'mongoose.model' is a method that creates a Mongoose model. 
A Mongoose model is a constructor function that represents a specific document type within a MongoDB collection. 
It provides an interface for interacting with the documents in that collection
*/