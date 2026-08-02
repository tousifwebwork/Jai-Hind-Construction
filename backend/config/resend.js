const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_Mail_KEY_);

module.exports = resend;