const fs = require("fs");
const path = require("path");
const asyncfs = require("fs/promises");
const databasePath = path.join(__dirname, "..", "database", "data.json");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

class User {
  constructor(username, name, password, email) {
    this.username = username;
    this.name = name;
    this.password = password;
    this.email = email;
    this.createdAt = new Date().toISOString();
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

  static findOne(criteria, toBeFound) {
    return new Promise(async (resolve, reject) => {
      try {
        const dataContent = await asyncfs.readFile(databasePath);
        const result = JSON.parse(dataContent).findIndex((user) => {
          return user[criteria] === toBeFound;
        });
        if (result >= 0) {
          resolve(JSON.parse(dataContent)[result]);
        } else {
          resolve(null);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  static findAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const dataContent = await asyncfs.readFile(databasePath);
        const mappedDataContent = JSON.parse(dataContent).map((user) => {
          return {
            name: user.name,
            username: user.username,
            email: user.email,
            id: user.id,
          };
        });
        resolve(mappedDataContent);
      } catch (err) {
        reject(err);
      }
    });
  }

  save() {
    return new Promise((resolve, reject) => {
      let content = [];
      this.id = content.length;
      fs.readFile(databasePath, async (err, filecontent) => {
        try {
          if (err) {
            content.push(this);
            this.writeFile(databasePath, content)
              .then((filecontent) => resolve(filecontent))
              .catch((err) => reject(err));
          } else {
            content = JSON.parse(filecontent);
            const result = await User.findOne("email", this.email);

            if (result !== null) {
              reject("User Already Exits");
              return;
            }

            this.id = content.length;
            content.push(this);

            const filedata = await this.writeFile(databasePath, content);
            resolve(filedata);
          }
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  static getToken(id) {
    return jwt.sign({ _id: id }, process.env.SECRET);
  }
}

module.exports = User;
