const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const controller = require('../components/registerUser/controller')
const User = require('../components/registerUser/model');


//Ojo el username y password son caracteristicas propias de passport que utiliza para reconocer
//que le estas pasando un usuario y contrasena eso encontre investigando ahora si en un caso no quiere hacer 
//login con un usuario si no con un correo seria email y password

passport.use('local-signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  //Buscamos el usuario
  const user = await User.findOne({user: username});

  if(!user) {
    return done(null, false, req.flash('signinMessage', 'Usuario no encontrado'));
  }
  //Este if solo lo puede utilizar si encripta las Contraseñas
  //Compara si la Contraseña que ingreso es iguala la guardada en la base
  //if(!user.comparePassword(password)) {
  
  //Como no tenemos Contraseñas encriptada solo comparamos
  if(user.password != password) {
   return done(null, false, req.flash('signinMessage', 'Contraseña Incorrecta'));
  }
  return done(null, user);
}));


/*
Este es para registrar pero no cumple con el estandar dado por el Profezor Pizarro
asi que hacemos el registro normal ensenadopor el profe

passport.use('local-signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const user = await User.findOne({'user': username})
  console.log(user)
  if(user) {
    return done(null, false, req.flash('signupMessage', 'Usuario registrado'));
  } else {
    const newUser = new User();
    newUser.user = req.body.user;
    newUser.firstname = req.body.firstname;
    newUser.lastname = req.body.lastname;
    newUser.password = req.body.password;
    newUser.date = new  Date();
    console.log(newUser)
    await newUser.save();
    done(null, newUser);
  }
}));*/

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});