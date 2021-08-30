import nodemailer from 'nodemailer';

import { EMAIL_SERVICE, SENDGRID_USERNAME, SENDGRID_PASSWORD, EMAIL_FROM } from '../config/index.js';

const {createTransport} = nodemailer;

const sendEmail = (options) => {

const transporter  = createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: SENDGRID_USERNAME,
      pass: SENDGRID_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  })
};

export default sendEmail;