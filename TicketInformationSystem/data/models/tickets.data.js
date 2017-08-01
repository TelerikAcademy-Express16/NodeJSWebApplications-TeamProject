"use strict"

const { ObjectID } = require("mongodb");
const BaseData = require("../base/base.data");
const Ticket = require("../../models/ticket.model");

class TicketsData extends BaseData {
    constructor(db) {
        super(db, Ticket, Ticket);
    }
    
    merge(model) {
        model.lastChangeDate = new Date();
        if (model._id && model._id != "") {
            return this.collection.updateOne({
                _id: new ObjectID(model._id)
            }, { 
                $set: {
                    "group" : model.group,
                    "ticketFixer" : model.ticketFixer,
                    "title": model.title,
                    "status": model.status,
                    "description": model.description,
                    "lastChangeDate": model.lastChangeDate
                } 
            });
        } 
        delete model._id;
        model.createDate = new Date();
        return this.create(model);
    }
}

module.exports = TicketsData;