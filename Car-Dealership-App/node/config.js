module.exports = {
  url: "mongodb://localhost:27017/mycardealership?authSource=admin",
  // url: "mongodb://localhost:27017/mycardealership",
  user: "root",
  pwd: "root",
};

  // db -> admin = user:"team3" pwd:"password2"
  // db -> mycardealership = user:"team3car" pwd:"password"
  // db -> admin = user:"root" pwd:"root"
  // db -> mycardealership = user:"team3" pwd:"password"
  // ?authSource=admin
