const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");


const port = 5000;

app.use(express.json());
app.use(cors());

const store = {};
 

app.get("/api/users/", (req, res) => {
  var data = fs.readFileSync("./db/users.json");
  var myData = JSON.parse(data); 
  res.status(200).send(myData);

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/api/users", (req, res) => {
 var data = fs.readFileSync("./db/users.json");
  var myData = JSON.parse(data);
  let count = data.count + 1;
   myData.push({ id: myData.length +1 , ...req.body });
   console.log("req.body", req.body);
  let newData = JSON.stringify(myData, null, 2);
  console.log("newData", newData);
  fs.writeFileSync("./db/users.json", newData);
  res.status(200).send(newData);
})


app.get("/api/usersname", (req, res) => {
  var data = fs.readFileSync("./db/users.json");
  var myData = JSON.parse(data);
  var resultArr = [];
  myData.forEach((item) => resultArr.push(item.username));
  
  res.status(200).send(resultArr);
});



/* app.put("/:id", (req, res) => {
  const { id } = req.parems;

  if (store.hasOwnProperty(id)) {
    store[id] = req.body;
    res.send(`updated ${id}`);
  } else {
    res.send(`can not find ${id}`);
  }
}); */

/* app.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (store.hasOwnProperty(id)) {
    delete store[id];
    console.log(" store del", store);
    res.send(`Delete ${id}`);
  } else {
    res.send(`can not find  ${id}`);
  }
}); */


app.put("api/:id", (request, response) => {
  const { id } = request.params ;
  
  const existingJsonData = JSON.parse(fs.readFileSync("./db/users.json"));
  
  let Found = false;

  existingJsonData.forEach((element, index) => {
     
    if (Found == false && element.hasOwnProperty("id") && element["id"] == id) {
        Found = true;  
        element = { ...element, ...request.body};        
        existingJsonData[index] = element; 

        let newData = JSON.stringify(existingJsonData, null, 2);
        fs.writeFileSync("./db/users.json", newData);        
    } 
  });
        
   if (Found)
    response.status("200").send("updated item for id");
    else  response.status("400").send("not found this id");

});


app.delete("api/:id", (request, response) => {
  const { id } = request.params;

  const existingJsonData = JSON.parse(fs.readFileSync("./db/users.json"));

  let Found = false;

  existingJsonData.forEach((element, index) => {
    if (Found == false && element.hasOwnProperty("id") && element["id"] == id) {
      Found = true;
       
      existingJsonData.splice(index, 1);     
     let newData = JSON.stringify(existingJsonData, null, 2);
     
     fs.writeFileSync("./db/users.json", newData);
    }
  });

  if (Found) response.status("200").send("Deleted item for id");
  else response.status("400").send("not found this id");
});



