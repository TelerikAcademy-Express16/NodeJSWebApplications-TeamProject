"use strict"

var configFile = require("../../../config");

class UsersController {
    constructor(data) {
        this.data = data;
    }

    getProfile(req, res) {
        if(!req.isAuthenticated()) {
            return res.status(401).redirect("/unauthorized");
        }
        return res.render("auth/profile");
    }

    getSignUpForm(req, res) {
        return res.render("auth/sign-up");
    }

    getSignInForm(req, res) {
        return res.render("auth/sign-in");
    }

    signOut(req, res) {
        if(!req.isAuthenticated()) {
            return res.status(401).redirect("/unauthorized");
        }
        req.logout();
        return res.redirect("/");
    }

    signUp(req, res) {
        const bodyUser = req.body;

        this.data.users.findByUsername(bodyUser.username)
            .then((dbUser) => {
                if (dbUser) {
                    return res.render("auth/sign-up", { issueMessage: "User already exists" });
                } 
                if (bodyUser.password != bodyUser["repeat-password"]) {
                    return res.render("auth/sign-up", { issueMessage: "Repeated password is not equal to the original one" });
                }
                this.data.users.getAll()
                    .then((currentDataLength) => {
                        let createUser = {};
                        createUser.username = bodyUser.username;
                        createUser.password = bodyUser.password;
                        createUser.email = bodyUser.email;
                        createUser.userTypeId = currentDataLength.length == 0 ? 
                            configFile.userTypes.indexOf("Admin") : 
                            configFile.userTypes.indexOf("Standard User");
                        createUser.userAvailable = true;
                        createUser.ticketFixingRank = 0.0;

                        return this.data.users.create(createUser);
                    }).then((dbUser) => {
                        return res.redirect("/auth/sign-in");
                    })
                    .catch((err) => {
                        req.flash("error", err);
                    });
            });
    }

    modifyUser(req, res) {
        if(!req.isAuthenticated()) {
            return res.status(401).redirect("/unauthorized");
        }
        const bodyUser = req.body;
        this.data.users.findByUsername(bodyUser.username)
            .then((dbUser) => {
                if (!dbUser) {
                    return res.status(401).redirect("/unauthorized");
                }
                if (bodyUser.password != bodyUser["repeat-password"]) {
                    return res.render("auth/profile", { issueMessage: "Repeated password is not equal to the original one" });
                }
                dbUser.password = bodyUser.password.trim().length == 0 ? 
                    dbUser.password : 
                    bodyUser.password;
                dbUser.email = bodyUser.email.trim().length == 0 ?
                    dbUser.email :
                    bodyUser.email;
                return this.data.users.updateById(dbUser);
            }).then((dbUser) => {
                return res.redirect("/auth/profile");
            })
            .catch((err) => {
                req.flash("error", err);
            }); 
    }
}

const init = (data) => {
    return new UsersController(data);
};

module.exports = { init };
