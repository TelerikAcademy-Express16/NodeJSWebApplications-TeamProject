"use strict"

const { Router } = require("express");
const passport = require("passport");

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require("./controller").init(data);

    router
        .get("/profile", (req, res) => {
            return controller.getProfile(req, res);
        })
        .get("/sign-up", (req, res) => {
            return controller.getSignUpForm(req, res);
        })
        .get("/sign-in", (req, res) => {
            return controller.getSignInForm(req, res);
        })
        .post("/sign-out", (req, res) => {
            return controller.signOut(req, res);
        })
        .post("/sign-up", (req, res) => {
            return controller.signUp(req, res);
        })
        .post("/sign-in", passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/auth/sign-in",
            //failureFlash: true,
            failureFlash: "Invalid username or password"
        }))
        .post("/modify-user", (req, res) => {
            return controller.modifyUser(req, res);
        });

    app.use("/auth", router);
};

module.exports = { attachTo };
