"use strict"

const BaseData = require("../base/base.data");
const User = require("../../models/user.model");

class UsersData extends BaseData {
    constructor(db) {
        super(db, User, User);
    }

    findByUsername(username) {
        return this
            .filterBy({ username: new RegExp(username, "i") })
            .then(([user]) => user);
    }

    checkPassword(username, password) {
        return this.findByUsername(username)
            .then((user) => {
                if (!user) {
                    return { status: false, issueMessage: "Invalid user" };
                }

                if (user.password !== password) {
                    return { status: false, issueMessage: "Invalid password" };
                }

                return { status: true };
            });
    }
}

module.exports = UsersData;