const bcrypt = require('bcryptjs');

module.exports = {
    generate: function(password) {
        console.log(password)
        return bcrypt.hashSync(password, 10);
    },
    compare: function(password, passwordDB){
        return bcrypt.compareSync(password, passwordDB);
    }
}