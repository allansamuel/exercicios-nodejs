const path = require('path')

const nodemailer = require('nodemailer')

const mailerhbs = require('nodemailer-express-handlebars')

const {host, port, user, pass} = require('../json/mail.json')

const transport = nodemailer.createTransport({
    host,
    port,
    auth: {
      user,
      pass
    }
  });

transport.use('compile', mailerhbs({
    viewEngine: {
        extName: '.hbs',
        partialsDir: path.resolve('./src/res/mail/auth'),
        layoutsDir: path.resolve('./src/res/mail/auth'),
        defaultLayout: 'forgot_password.html',
    },
    //atenção: parte da raiz absoluta do projeto
    viewPath: path.resolve('./src/res/mail/auth'),
    extName: '.html',
}))

module.exports = transport