const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = sendEmail;

async function sendEmail({ to, subject, html, from = process.env.EMAIL_FROM }) {
    await resend.emails.send({ from, to, subject, html });
}
