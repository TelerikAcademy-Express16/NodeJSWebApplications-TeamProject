"use strict"

const BaseData = require("../base/base.data");
const Ticket = require("../../models/ticket.model");

class TicketsData extends BaseData {
    constructor(db) {
        super(db, Ticket, Ticket);
    }
}

module.exports = TicketsData;