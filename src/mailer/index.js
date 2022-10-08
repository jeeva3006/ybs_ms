const nodemailer = require("nodemailer");

async function Mailer(data) {

    console.log(data);
    let transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 587,
        auth: {
            user: 'styls360@gmail.com',
            pass: 'zqgdslkmdwbevwpt',
        },
    });


    transporter.sendMail({
        from: "styls360@gmail.com",
        to: "jeevasubash64@gmail.com",
        subject: "Hello ✔",
        text: "Hello world?",
        html: `<>
            {{data.map(item => <div>{{item.title}}</div>)}}
        </>`
    });
}

module.exports = Mailer;


// {data.map(item =>
//     <div>
//         <div>{item.title}</div>
//         <img src={item.thumbnail} alt="" />
//         <a href={item.videoUrl} target="_blank">play video</a>
//     </div>
// )}
