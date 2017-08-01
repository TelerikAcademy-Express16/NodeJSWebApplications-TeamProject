"use strict"

var configFile = require("../../../config");

class TicketController {
    constructor(data) {
        this.data = data;
    }

    getTicket(req, res) {
        // if(!req.isAuthenticated()) {
        //     return res.status(401).redirect("/unauthorized");
        // }
        var currentId = req.query.id;
        if (!currentId) {
            return res.render("ticket/get-ticket", { issueMessage: "Ticket doesn`t exist" });
        }
        this.data.tickets.findById(currentId)
            .then((dbTicket) => {
                if (!dbTicket) {
                    return res.render("ticket/get-ticket", { issueMessage: "Ticket doesn`t exist" });
                }
                if (req.isAuthenticated()) {
                    let nextStatus = configFile.statuses[configFile.statuses.indexOf(dbTicket.status) + 1];
                    return res.render("ticket/merge-ticket", { 
                        ticket: dbTicket,
                        nextStatus: nextStatus,
                        groups: configFile.groups 
                    });
                } else {
                    return res.render("ticket/get-ticket", { ticket: dbTicket });
                }
            }).catch((err) => {
                req.flash("error", err);
            });
    }

    getTickets(req, res) {
        let authUser;
        if(req.isAuthenticated()) {
            authUser = {};
        }
        this.data.tickets.filterBy({
            status: "Open"
        }).then((dbOpenTickets) => {
            this.data.tickets.filterBy({
                status: "Started"
            }).then((dbStartedTickets) => {
                this.data.tickets.filterBy({
                    status: "Resolved"
                }).then((dbResolvedTickets) => {             
                    return res.render("ticket/get-tickets", { 
                        openTickets: dbOpenTickets, 
                        startedTickets: dbStartedTickets,
                        resolvedTickets: dbResolvedTickets,
                        authorizedUser: authUser 
                    });
                });
            });
        }).catch((err) => {
            req.flash("error", err);
        });
    }

    getMergeTicket(req, res) {
        if(!req.isAuthenticated()) {
            return res.status(401).redirect("/unauthorized");
        }
        var currentId = req.query.id;
        if (currentId) {
            return this.data.tickets.findById(currentId)
                .then((dbTicket) => {
                    let nextStatus = configFile.statuses[configFile.statuses.indexOf(dbTicket.status) + 1];
                    return res.render("ticket/merge-ticket", { 
                            ticket: dbTicket,
                            nextStatus: nextStatus,
                            groups: configFile.groups 
                        });
                }).catch((err) => {
                    req.flash("error", err);
                });
        }
        return res.render("ticket/merge-ticket", {
            statuses: configFile.statuses, 
            groups: configFile.groups 
        });
    }

    mergeTicket(req, res) {
        if(!req.isAuthenticated()) {
            return res.status(401).redirect("/unauthorized");
        }
        const bodyUser = req.body;
        return this.data.tickets.merge(bodyUser)
            .then(() => {
                return this.getTickets(req, res);
            }).catch((err) => {
                req.flash("error", err);
            });
    }

    modifyStatus(req, res) {
        if(!req.isAuthenticated()) {
            return res.status(401).redirect("/unauthorized");
        }
        const bodyUser = req.body;
        return this.data.tickets.findById(bodyUser._id)
            .then((dbTicket) => {
                dbTicket.status = bodyUser.status;
                return this.data.tickets.merge(dbTicket)
                    .then(() => {
                        return this.getTickets(req, res);
                    });
            });
    }
}

const init = (data) => {
    return new TicketController(data);
};

module.exports = { init };