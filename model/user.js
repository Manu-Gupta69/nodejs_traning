const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const databasePath = path.join(__dirname, "..", "database", "data.json");

class User {
  constructor(username, name, password, email) {
    this.username = username;
    this.name = name;
    this.password = password;
    this.email = email;
  }

  writeFile(path, contentToSave) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, JSON.stringify(contentToSave), (err, filecontent) => {
        if (err) {
          reject(err);
        }
        resolve(filecontent);
      });
    });
  }

  save() {
    return new Promise((resolve, reject) => {
      let content = [];
      this.id = content.length;
      fs.readFile(databasePath, (err, filecontent) => {
        if (err) {
          content.push(this);
          this.writeFile(databasePath, content)
            .then((filecontent) => resolve(filecontent))
            .catch((err) => reject(err));
        } else {
          content = JSON.parse(filecontent);
          const result = content.findIndex((user) => {
            return user.email === this.email;
          });
          if (result >= 0) {
            reject("user already exists");
            return;
          }
          this.id = content.length;
          content.push(this);
          this.writeFile(databasePath, content)
            .then((filecontent) => resolve(filecontent))
            .catch((err) => reject(err));
        }
      });
    });
  }
}

module.exports = User;
