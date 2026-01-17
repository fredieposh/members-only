const dbHandler = require("../db/queries.js")

function convertMessagesTimeFormat (messagesArray) {
    return messagesArray.map(row => {
        const rawDate = new Date(row.time);
        const formattedDate = new Intl.DateTimeFormat('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour12: false
        }).format(rawDate).replace(',', '');
        return { ...row, time:formattedDate };
    })
};

async function getIndexPage (req, res, next ) {
    const isUserLogin = req.isAuthenticated();
    const user = isUserLogin ? req.user : null;
    const rows = await dbHandler.getMessages();
    const isAdmin = user ? user.admin : null;
    const messages = rows[0] ? convertMessagesTimeFormat(rows): null;

    res.render('indexPage', {
        title: "Home Page",
        isUserLogin,
        user,
        messages,
        isAdmin
    });
};

module.exports = {convertMessagesTimeFormat, getIndexPage};