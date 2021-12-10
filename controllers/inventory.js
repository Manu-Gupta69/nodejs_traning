const fs = require('fs');

const datapath = `${__dirname}/../data/inv.json`;
exports.getInventorydata = (req, res, next) => {
  fs.readFile(datapath, (err, filecontent) => {
    let data = [];
    if (err) {
      data = 'NO data found';
    } else {
      data = JSON.parse(filecontent);
    }
    res.json({ data: data });
  });
};
exports.postInventorydata = (req, res, next) => {
  const reqdata = req.body;
  fs.readFile(datapath, (err, filecontent) => {
    let inventory = [];
    if (err) {
      inventory.push(reqdata);
    } else {
      inventory = JSON.parse(filecontent);
      inventory.push(reqdata);
    }
    fs.writeFile(datapath, JSON.stringify(inventory), (err, content) =>
      console.log(err)
    );
    res.json({ data: inventory, status: 'successfully added' });
  });
};
