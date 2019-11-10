module.exports = (err, req, res, next) => {
    if (err === '422') {
        res.status(422).json({
            message: 'Title or Content can\'t be empty'
        })
    } else if (err === 'UNF') {
        res.status(404).json({
            message: 'Email not exists'
        })
    } else if (err === 'WRONG') {
        res.status(404).json({
            message: 'Wrong email/password'
        })
    } else if (err === 'ANF') {
        res.status(401).json({
            message: 'Data not exists / You trying to access data that you don\'t have permission on'
        })
    } else if (err === '403') {
        res.status(403).json({
            message: 'Sorry this site is forbidden for you'
        })
    } else if (err.name && err.name === 'ValidationError') {
        res.status(400).json({
            message: 'Please make sure all required fields are filled'
        })
    } else {
        console.log(err)
        res.status(500).json({
            err
        })
    }
}