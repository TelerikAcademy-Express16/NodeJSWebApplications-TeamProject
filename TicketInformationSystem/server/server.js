"use strict"

const async = () => {
    return Promise.resolve();
};

const config = require("../config");

const run = () => {
    return async()
        .then(() => require("../db").init(config.connectionString))
        .then((db) => require("../data").init(db))
        .then((data) => require("../application").init(data))
        .then((app) => {
            app.listen(config.port, () =>
                console.log(`Server listening to port: ${config.port}`));
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = { run };