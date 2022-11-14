const nodemailer = require("nodemailer");
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const { appPassWord } = require("../constant");
const htmlPath = path.join(__dirname, 'html.hbs');
const moment = require('moment');

const readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            callback(err);
            console.log("Error in reading html path");
        }
        else callback(null, html);
    });
};

function Mailer(videos) {
    const date = moment().format('DD MMM YYYY hh:mm');
    const data = { date, videos };

    if (videos && videos.length > 0) {
        readHTMLFile(htmlPath, function (err, html) {
            if (!err) {
                const template = handlebars.compile(html);
                let htmlToSend = videos && videos.length > 0 ? template(data) : `<h3> No videos found</h3>`;

                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    secure: true,
                    port: 587,
                    auth: {
                        user: 'styls360@gmail.com',
                        pass: appPassWord,
                    },
                });

                transporter.sendMail({
                    from: "styls360@gmail.com",
                    to: "jeevasubash64@gmail.com",
                    subject: `${videos.length} video(s) on ${date} from API`,
                    text: "Hello world?",
                    html: htmlToSend
                },
                    function (error) {
                        if (error) console.log(error);
                        else console.log(`Email sent for ${date}`);
                    });
            }
        });
    }
}

module.exports = Mailer;