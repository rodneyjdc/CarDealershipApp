//bring in resolve from path
const { resolve } = require("path");

//bring in built-in fs
const fs = require("fs");

//bring in promise version of fs
const fsPromises = require("fs").promises;

async function readWrite(path, action = null, entry = null) {
  let data = await JSON.parse(
    fs.readFileSync(resolve(__dirname, path), "utf8")
  );
  if (action) {
    data = await action(data, entry);
    if (typeof data === "string") {
      console.log("Error", data);
      return data;
    }
    const nFile = await fsPromises.writeFile(
      resolve(__dirname, path),
      JSON.stringify(data, null, 2)
    );
    console.log("upd file", nFile);
  }
  return data;
}

module.exports = { readWrite: readWrite };