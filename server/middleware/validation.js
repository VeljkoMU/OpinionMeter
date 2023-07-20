
Boolean.prototype.or = function(boolean) {
    return this.valueOf() || boolean;
}

function validateTag(req, res, next) {
    if((!req.query.tag).or(!req.query.pageNum)) {
        res.status(400).end();
    }
    else {
        next();
    }
}

function validateUsername(req, res, next) {
    if(!req.query.user) {
        res.status(400).end();
    }
    else {
        next();
    }
}

function validatePost(req, res, next) {
    if((req.body.post == undefined)
        .or(req.body.post == "")
        .or(req.body.tag == undefined)
        .or(req.body.tag == "")) {
            res.status(400).end()
        }
    else {
        next();
    }
}

function validateComment(req, res, next) {
    if((req.body._id == undefined)
        .or(req.body.commentText == undefined)
        .or(req.body.commentText == "")) {
            res.status(400).end();
        }
    else {
        next();
    }
}

function validateRating(req, res, next) {
    if((!req.body._id)
        .or(req.body.isPositive == undefined)) {
            res.status(400).end();
        }
    else {
        next();
    }
}

function validatePostId(req, res, next) {
    if(req.query._id == undefined) {
        res.status(400).end();
    }
    else {
        next();
    }
}

function validateRegistrationBody(req, res, next) {
    if((!req.body.username)
        .or(!req.body.emp)
        .or(!req.body.edu)
        .or(!req.body.password)
        .or(!req.body.gender)
        .or(!req.body.region)) {
            res.status(400).end();
        }
        else {
            next();
        }
}

function validateLoginBody(req, res, next) {

    if(!req.body) {
        res.status(400).end();
        return;
    }

    if((!req.body.password)
         .or(!req.body.username)) {
            res.status(400).end();
        }
    else {
        next();
    }
}

module.exports = {
    validateComment,
    validateLoginBody,
    validatePost,
    validatePostId,
    validateRating,
    validateRegistrationBody,
    validateTag,
    validateUsername
}