const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // used to insert data


router.get("", async (req, res) => {
  try {
    const locals = {
      title: "Final Project",
      description:
        "The final project is a simple blog built with NodeJs, Express, & MongoDb",
    };

    // Fetch all posts without pagination
    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }]);

    res.render("index", {
      locals,
      data,
    });
  } catch (error) {
    console.log(error);
  }
});


// GET 
// get post by Id
router.get("/post/:id", async (req, res) => {
  // app.get handles HTTP GET requests made to the specified path
  
  try {

      let findPost = req.params.id;

      const data = await Post.findById({_id: findPost}); // finds all the post
      
      const locals = {
      title: data.title,
      description:
        "The final project is a simple blog built with NodeJs, Express, & MongoDb",
    };
    //grabbing the id
   res.render("post", { locals, data }); // when we need to pass in more objects we can put them in curly brackets
  } catch (error) {
    console.log(error);
  }

});

// POST
// SEARCH 

router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "Seach",
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      data,
      locals,
      // currentRoute: "/",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;






// function insertPostData() {
//   Post.insertMany([
//     {
//       title: "Building a Blog",
//       body: "This is the Body text"
//     }
//   ])
// }

// insertPostData();
/*
'insertMany' is a Mongoose model method that allows you to insert multiple documents into a MongoDB collection in a single operation. 
It is a convenient way to add multiple documents to the collection in an efficient manner.
*/

// router.get("", async (req, res) => {
//   // app.get handles HTTP GET requests made to the specified path
//   const locals = {
//     title: "Final Project",
//     description:
//       "The final project is a simple blog built with NodeJs, Express, & MongoDb",
//   };

//   try {
//     const data = await Post.find(); // finds all the post
//     res.render("index", { locals, data }); // when we need to pass in more objects we can put them in curly brackets
//   } catch (error) {
//     console.log(error);
//   }
// });