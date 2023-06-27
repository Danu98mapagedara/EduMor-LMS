const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.email',
    secure: false,
    auth: {
        user: 'edumor.hackstone@gmail.com',
        pass: 'qzsyforpzknseyby'
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = {

    sendVerificationEmail: async (senderAddress, link) => {
        let error = false;
        try {
            await transporter.sendMail({
                from: {
                    name: 'EduMor- Learning Management System',
                    address: 'edumor.hackstone@gmail.com',
                },
                to: senderAddress,
                subject: "Verify your Email",
                html:
                    `<div style="background-color: #f6f6f6; padding: 20px;">
                <div style="background-color: white; padding: 20px; border-radius: 10px;">
                  <h1 style="text-align: center; color: #041083; margin-bottom: 20px;">Verify Your Email</h1>
                  <p style="font-size: 18px; margin-bottom: 30px;">Welcome to EduMor! To get started, please verify your email address by clicking the button below:</p>
                  <div style="text-align: center; margin-bottom: 30px;">
                    <a href="${link}" style="background-color: #041083; color: white; padding: 10px 20px; border-radius: 10px; text-decoration: none; font-size: 20px;">Verify Email</a>
                  </div>
                  <p style="font-size: 18px;">This email is valid for only 24 hours, so please verify your email as soon as possible. If you did not create an account on EduMor, please ignore this message.</p>
                </div>
              </div>`,
            });
        } catch (e) {
            console.log(`Error sending email to ${senderAddress}: ${e}`);
            error = true;
        }
        return error;
    },
    sendForgotPasswordEmail: async (senderAddress, link) => {
        let error = false;
        try {
            await transporter.sendMail({
                from: {
                    name: 'EduMor- Learning Management System',
                    address: 'edumor.hackstone@gmail.com',
                },
                to: senderAddress,
                subject: "Reset Password",
                html:
                    ` <div style="background-color: #f6f6f6; padding: 20px;">
                <div style="background-color: white; padding: 20px; border-radius: 10px;">
                  <h1 style="text-align: center; color: #041083; margin-bottom: 20px;">Reset Password</h1>
                  <p style="font-size: 18px; margin-bottom: 30px;">Please reset your password by clicking the button below:</p>
                  <div style="text-align: center; margin-bottom: 30px;">
                    <a href="${link}" style="background-color: #041083; color: white; padding: 10px 20px; border-radius: 10px; text-decoration: none; font-size: 20px;">Reset Password</a>
                  </div>
                  <p style="font-size: 18px;">This link is valid for only 24 hours, so please reset your password as soon as possible. If you did not request a password reset on EduMor, please ignore this message.</p>
                </div>
              </div>`,
            });
        } catch (e) {
            console.log(`Error sending email to ${senderAddress}: ${e}`);
            error = true;
        }
        return error;
    }

}
