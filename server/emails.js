const minionsRouter = require('express').Router();

module.exports = minionsRouter;

"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function init(userId) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: 'manonentu407@gmail.com', // generated ethereal user
      pass: 'Tt12345678' // generated ethereal password
    }
  });

  try {
    const now = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'manonentu407@gmail.com', // sender address
      to: `${userId}@ntu.edu.tw`, // list of receivers
      subject: "你的車違停了", // Subject line
      text: "你的車在今天違停了，請將車停好。", // plain text body
      html: `<b>同學你好，這裡是男一生治會，你的車在${now}違停了，請將車停好，謝謝你的配合。</b>` // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    return info
  } catch(error) {
    return error
  }
}


minionsRouter.post('/:userId', (req, res, next) => {
  console.log('new email to ' + `${req.params.userId}`)
  init(req.params.userId)
    .then(info => {
      res.status(201).send(info);
    })
    .catch(error => {
      res.status(401).send(info);
      console.log(error)
    });
});


