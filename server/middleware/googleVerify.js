const {
    OAuth2Client
} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

function verify(req, res, next) {
    client.verifyIdToken({
            idToken: req.body.id_token,
            audience: "435404984094-seh9is2iclqngre45hfjbm0vd4lq7mih.apps.googleusercontent.com"
        })
        .then(ticket => {
            const payload = ticket.getPayload();
            req.decoded = payload;
            // console.log(req.decoded)
            next()
        })
        .catch(err => {
            res.status(500).json({
                err
            })
        })
}

module.exports = verify;