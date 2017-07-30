"use strict"

const { MongoClient } = require("mongodb");

const init = (connectionString) => {
    return MongoClient.connect(connectionString)
        .then((db) => {
            console.log("Database connection successfull");
            return db;
        });
};

module.exports = { init };