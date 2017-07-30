"use strict"

const fs = require("fs");
const path = require("path");

const attachTo = (app, data) => {
    app.get("/", (req, res) => {
        // if(!req.isAuthenticated()) {
        //     return res.status(401).redirect('/unauthorized');
        // }
        return res.render("home");
    });

    app.get("/unauthorized", (req, res) => {
        return res.render("unauthorized/index");
    });

    fs.readdirSync(__dirname)
        .filter((file) => file.includes(".router"))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            require(modulePath).attachTo(app, data);
        });
};

module.exports = { attachTo };