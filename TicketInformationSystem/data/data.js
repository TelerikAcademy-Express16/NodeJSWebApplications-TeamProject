"use strict"

const UsersData = require("./models/users.data"),
    TicketsData = require("./models/tickets.data");

const init = (db) => {
    return Promise.resolve({
        users: new UsersData(db),
        tickets: new TicketsData(db)
    });
};

module.exports = { init };
