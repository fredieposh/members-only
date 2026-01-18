const { Router } = require("express");
const dbHandler = require("../db/queries.js");

const deleteRouter = Router();

deleteRouter.get("/:id", async (req, res, next) => {
    try {
        const rows = await dbHandler.getMessageById(req.params.id);
        const { id } = rows[0];

        if(id) {
            await dbHandler.deleteMessageById(id);
        };

        res.redirect('/');
    } catch(err) {
        next(err);
    }
});

module.exports = deleteRouter;