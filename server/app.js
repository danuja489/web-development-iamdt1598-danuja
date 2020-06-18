var http = require('http');
const nodemailer = require('nodemailer');

http.createServer(function (req, res) {
    let message = [];
    req.on('data', function (chunk) {
        message.push(chunk);
       /* message = {
            from: 'sasankaarjuna99@gmail.com', // Sender address
            to: 'shehanm489@gmail.com',         // List of recipients
            subject: 'Config Test', // Subject line
            text: 'Test' // Plain text body
        };*/
    });
    req.on('end', function () {
        message = Buffer.concat(message).toString();

        let transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: 'shehanm489@gmail.com',
                pass: '0112717891'
            }
        });

        transport.sendMail(message, function(err, info) {
            if (err) {
                console.log(err)
                res.writeHead(500);
            } else {
                console.log(info);
                res.writeHead(200);
            }
        });

        console.log(message)

    });
}).listen(8080);