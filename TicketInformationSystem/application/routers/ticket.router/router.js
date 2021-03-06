"use strict"

const { Router } = require("express");
const passport = require("passport");

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require("./controller").init(data);

    router
        .get("/get-ticket", (req, res) => {
            return controller.getTicket(req, res);
        })
        .get("/get-tickets", (req, res) => {
            return controller.getTickets(req, res);
        })
        .get("/merge-ticket", (req, res) => {
            return controller.getMergeTicket(req, res);
        })
        .post("/merge-ticket", (req, res) => {
            return controller.mergeTicket(req, res);
        })
        .post("/modify-status", (req, res) => {
            return controller.modifyStatus(req, res);
        });

    app.use("/ticket", router);
};

module.exports = { attachTo };
