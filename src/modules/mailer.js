const path = require('path')

const nodemailer = require('nodemailer')

const hbs = require('nodemailer-express-handlebars')

const {host, port, user, pass} = require('../json/mail.json')

const transport = nodemailer.createTransport({
    host,
    port,
    auth: {
      user,
      pass
    }
  });

transport.use('compile', hbs({
    viewEngine: 'handlebars',
    //atenção: parte da raiz absoluta do projeto
    viewPath: path.resolve('./src/res/mail/'),
    extName: '.html',
}))

module.exports = transport