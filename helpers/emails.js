import nodemailer from "nodemailer";
import hbs from "nodemailer-handlebars";
import path from "path";

const viewPath = path.resolve("./views/");

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  var transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "andres_puello90@hotmail.com",
      pass: "Slik1990",
    },
  });

  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extName: ".handlebars",
        partialsDir: viewPath,
        layoutsDir: viewPath,
        defaultLayout: false,
      },
      viewPath: viewPath,
      extName: ".hbs",
    })
  );
  var mailOptions = {
    from: "andres_puello90@hotmail.com",
    to: email,
    subject: "Confirmar cuenta",
    template: "index",
    context: {
      nombre: nombre,
      token: token,
      url: process.env.FRONTEND_URL,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      return res.json({
        message:
          "El correo ha sido enviado, favor seguir las instrucciones dadas en el mismo.",
      });
    }
  });
};

export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  var transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "andres_puello90@hotmail.com",
      pass: "Slik1990",
    },
  });

  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extName: ".handlebars",
        partialsDir: viewPath,
        layoutsDir: viewPath,
        defaultLayout: false,
      },
      viewPath: viewPath,
      extName: ".hbs",
    })
  );
  var mailOptions = {
    from: "andres_puello90@hotmail.com",
    to: email,
    subject: "Restablecer Contraseña",
    template: "password",
    context: {
      nombre: nombre,
      token: token,
      url: process.env.FRONTEND_URL,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      return res.json({
        message:
          "El correo ha sido enviado, favor seguir las instrucciones dadas en el mismo.",
      });
    }
  });
};
