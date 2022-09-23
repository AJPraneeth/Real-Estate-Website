const nodemailer = require("nodemailer");
const dotenv=require('dotenv');
dotenv.config()


const sendEmail = async (email, subject, text) => {
    console.log(email);
    console.log(subject);
    console.log(text);
    try {

        // let testAccount = await nodemailer.createTestAccount();

        // console.log(testAccount.user,"email");
        // console.log(testAccount.pass,"password");

        const transporter = nodemailer.createTransport({
            
            host: process.env.HOST,
            service: process.env.SERVICE,
            // host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
                
                
            },
        });

    let mail=    await transporter.sendMail({
            from: process.env.USER,
            // from: testAccount.user,
            to: email,
            subject: subject,
            html: text,
            
            
        });
        console.log(mail,"email sent sucessfully");
        
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;