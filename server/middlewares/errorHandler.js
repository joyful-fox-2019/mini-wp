module.exports = function(err, req, res, next){
    let status
    let message
    let arr = []

    switch (err.name) {
        case 'ValidationError':
            status = 400
            
            for(let i in err.errors){
                arr.push(err.errors[i].message)
            }
            message = arr
            break;
            
        case 'JsonWebTokenError' :
            status = 401
            message = err.message
            break;

        case 'MongoError' :
            if(err.keyValue.email){
                status = 400
                arr.push( 'email already taken')
                message = arr
            }
            if(err.keyValue.username){
                status = 400
                arr.push( 'username already taken')
                message = arr
            }
            break;

        default:
            status = err.status || 500
            message = err.msg || err.message || 'internal server error'
            break;
    }
    console.log('vvvvvvv sini')
    console.log(status, message)
    res.status(status).json({code : status, message})
}