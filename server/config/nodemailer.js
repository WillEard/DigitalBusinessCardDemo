import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // or 'STARTTLS'
    auth: {
        user: process.env.SMTP_UNAME,
        pass: process.env.SMTP_PASS,
    },
});

export default transporter;