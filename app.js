/*
 Authors: William Green
 Your name and student #: William Green A01239604
 Your Partner's Name and student #: N/A
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require("fs");

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const movieList = []

app.get("/", (req, res) => res.render("pages/index",{_movieList: movieList}));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  // Add your implementation here 
  let formData = req.body;
  
  let movies = formData.input.split(",")
  for(let i = 0;i<movies.length;i++){movieList.push(movies[i])}
  
  res.redirect("/");
});

app.get("/myListQueryString", (req, res) => {
  // Add your implementation here
  let movie1 = req.query.movie1
  let movie2 = req.query.movie2

  res.render("pages/index.ejs",{_movieList: [movie1,movie2]})
});

app.get("/search/:movieName", (req, res) => {
  // Add your implementation here
  let quieres = req.params.movieName;
  let data = fs.readFile("movieDescriptions.txt",(err,data)=>{
    if(err){console.log(err)}
    else{
    let desc_list = data.toString().split("\n");
    let desc_dict = []
    for(let i = 0; i<desc_list.length;i++){
      let j = desc_list[i].split(":");
      desc_dict.push(j);
    }

    let trigger = "false";
    let title = "";
    let description="";
    for(let i = 0;i<desc_dict.length;i++){
      //console.log(desc_dict[i][0])
      if(quieres.toLowerCase()===desc_dict[i][0].toLowerCase()){
        
        title=desc_dict[i][0]
        console.log(title)
        description=desc_dict[i][1]
        console.log(description)
        trigger=1
      }
    }
    res.render("pages/searchResults.ejs",
    {trigger: trigger,
    title: title,
    description:description});
    }
  })
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});