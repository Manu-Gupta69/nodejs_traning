const http = require('http');
const path = require('path');
const fs = require('fs/promises');

const server = http.createServer((req, res) => {
  const method = req.method;

  const invpath = path.join(__dirname, 'data', 'inv.json');
  if (req.url === '/') {
    res.write('Hello World');
    res.end();
  } else if (method === 'GET' && req.url === '/inventory') {
    fs.readFile(invpath)
      .then((filecontent) => {
        res.write(filecontent);
        res.end();
      })
      .catch((err) => {
        res.write('NO DATA FOUND');
        res.end();
      });
  } else if (method == 'POST' && req.url === '/inventory') {
    const body = [];
    let parsedBody;
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      parsedBody = Buffer.concat(body).toString();
      fs.readFile(invpath)
        .then((filecontent) => {
          const content = JSON.parse(filecontent);
          const obj = JSON.parse(parsedBody);
          obj.id = content.length;
          content.push(obj);
          fs.writeFile(invpath, JSON.stringify(content))
            .then((con) => {})
            .catch((err) => console.log(err));

          res.setHeader('Content-type', 'application/json');
          res.write(JSON.stringify(content));
          return res.end();
        })
        .catch((err) => {
          const inventory = [];
          const obj = JSON.parse(parsedBody);
          obj.id = inventory.length;
          inventory.push(obj);
          fs.writeFile(invpath, JSON.stringify(inventory))
            .then((filecontent) => {})
            .catch((err) => {
              console.log(err);
              return res.end();
            });
          res.write(JSON.stringify(inventory));
          return res.end();
        });
    });
  }
});

server.listen(3000);
