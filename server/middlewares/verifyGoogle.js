module.exports = function (req, res, next){
    const {OAuth2Client} = require('google-auth-library')
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    client.verifyIdToken({
        idToken : req.body.id_token,
        audiance : process.env.GOOGLE_CLIENT_ID
    })
    .then(ticket=>{
        let {email, name} = ticket.getPayload()
        req.ticket = {email, name}
        next()
    })
    .catch(next)
}