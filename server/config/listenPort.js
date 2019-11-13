const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

module.exports = app.listen(PORT, () => {
    console.log(`Listen To Port : ${PORT}`);
})