const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();

const items =[];
const workItems=[];

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/", function(req, res) {

  res.render("list", {listTitle: date.getDate(), newListItems:items});

});

app.post("/", function(req,res){
  const item = req.body.newItem;
  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }

})

app.get("/work",function(req,res){
  res.render("list", {listTitle:"Work List", newListItems:workItems})
});


app.listen(3000, function() {
  console.log("Serve started on port 3000");
});
