
function authorize(req, res, next) {
    if(!req.session || !req.session.username) {
        res.status(405).end();
        return;
    }

    next()
} 

module.exports = authorize