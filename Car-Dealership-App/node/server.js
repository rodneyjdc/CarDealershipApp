const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");


const port = 8000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use(express.json());
app.use(cors());

const store = {};
 
// Users api

app.get("/api/users/", (req, res) => {
  var data = fs.readFileSync("./db/users.json");
  var myData = JSON.parse(data); 
  res.status(200).send(myData);

});

app.get("/api/usersname", (req, res) => {
  var data = fs.readFileSync("./db/users.json");
  var myData = JSON.parse(data);
  var resultArr = [];
  myData.forEach((item) => resultArr.push(item.username));
  
  res.status(200).send(resultArr);
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


app.delete("api/users/:id", (request, response) => {
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

// ==================================================
// Cars API

app.get("/api/cars/", (req, res) => {
  var data = fs.readFileSync("./db/cars.json");
  var myData = JSON.parse(data); 
  res.status(200).send(myData);

});

app.post("/api/cars", (req, res) => {
 var data = fs.readFileSync("./db/cars.json");
  var myData = JSON.parse(data);
  let count = data.count + 1;
   myData.push({ id: myData.length +1 , ...req.body });
   console.log("req.body", req.body);
  let newData = JSON.stringify(myData, null, 2);
  console.log("newData", newData);
  fs.writeFileSync("./db/cars.json", newData);
  res.status(200).send(newData);
})

app.put("api/cars/:id", (request, response) => {
  const { id } = request.params ;
  
  const existingJsonData = JSON.parse(fs.readFileSync("./db/cars.json"));
  
  let Found = false;

  existingJsonData.forEach((element, index) => {
     
    if (Found == false && element.hasOwnProperty("id") && element["id"] == id) {
        Found = true;  
        element = { ...element, ...request.body};        
        existingJsonData[index] = element; 

        let newData = JSON.stringify(existingJsonData, null, 2);
        fs.writeFileSync("./db/cars.json", newData);        
    } 
  });
        
   if (Found)
    response.status("200").send("updated item for id");
    else  response.status("400").send("not found this id");

});


app.delete("api/cars/:id", (request, response) => {
  const { id } = request.params;
  console.log("id: ", id);
  const existingJsonData = JSON.parse(fs.readFileSync("./db/cars.json"));

  let Found = false;

  existingJsonData.forEach((element, index) => {
    if (Found == false && element.hasOwnProperty("id") && element["id"] == id) {
      console.log("found element: ", element);

      Found = true;
       
      existingJsonData.splice(index, 1);     
     let newData = JSON.stringify(existingJsonData, null, 2);
     
     fs.writeFileSync("./db/cars.json", newData);
    }
  });

  if (Found) response.status("200").send("Deleted item for id");
  else response.status("400").send("not found this id");
});






