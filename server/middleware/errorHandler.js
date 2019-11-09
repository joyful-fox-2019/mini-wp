module.exports = (err, req, res, next) => {
    let status = err.status || 500
    let message = err.msg || 'Internal Server Error'
    console.log(err);
   
    switch (err.name) {
        case 'ValidationError':
            let errors = []
            for (const key in err.errors) {
                errors.push(err.errors[key].message)
            }
            status = 400
            message = errors
            break;
    }

    console.log(status, message);
    res.status(status).json({ message })
}