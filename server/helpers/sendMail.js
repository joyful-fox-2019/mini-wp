const nodemailer = require('nodemailer');

module.exports = {
  sendMail(receiver,message,option) {
    return new Promise ((resolve, reject) => {
      let transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : process.env.GMAIL_MAIL,
            pass : process.env.GMAIL_PASS
        }
      });

      let mainOption = {
        from : process.env.GMAIL_MAIL,
        to : receiver,
        subject : 'Welcome to Dc Mini WordPress official by @dreamcarr_' || option.subject,
        text : message.msg
      }


      transporter.sendMail(mainOption)
        .then(function(){
          resolve({msg: 'Successfully Send Mail!'})
        })
        .catch(reject)
        })
    }
}