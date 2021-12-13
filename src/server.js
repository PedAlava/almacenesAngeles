const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')
const router = require('./network/routes')

//este modulo nos sirve para ver las peticiones de nuestro servidor
const morgan = require('morgan')

//este modulo no lo utilice pero es para manejar las cookies
const cookieParser = require('cookie-parser')

//Modulo que necesita passport para funcionar
//connect-flash nos sirve para pasar un mensaje por asi decirlo en nuestro request
const flash = require('connect-flash')

//express-session con este modulo habilitaremos las sesiones mediante una key que nosotros le pasemos 
const session = require('express-session')

//este modulo nos servira para iniciar las sesiones
const passport = require('passport');

const config = require('./config')
var app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

//Modulo importante para concatenar directorios o rutas
const path = require('path')

const socket = require('./socket')

//Conexion a la base
db(config.debUrl)

//Aqui validaremos las sesiones
//Si el usuario esta en el login o dashboard e inicia sesion o pone la ruta dashboard pasara primero por
//local-auth.js para validar si es que hay una sesion activa
require('./passport/local-auth');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Como el codigo esta dentro de la carpeta src y express no encontrara mi carpeta views
//Le indico en donde se encuentra previamente debo instalar el modulo path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs')

//middlewares
app.use(morgan('dev'))
app.use(cookieParser())

// required for passport
//Aqui usamos elmodulo express-sesion y la pasamos un key enmi caso PedAlava
app.use(session({
    secret: 'PedAlava',
    resave: false,
    saveUninitialized:false
}))

//aqui inicializamos el connect-flash para poder recibir los mensajes enviados de passport
//tambien creamos y guardamos variables locales que utilizaremos para saber si hay o no un usuario
//inicializamos passport
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.user = req.user;
    //console.log(app.locals)
    next();
});
socket.connect(server)
router(app)

// static files
app.use(express.static(path.join(__dirname, 'public')));

server.listen(config.port,()=>{
    console.log('Servidor iniciado...: ' + config.host + ':'+ config.port);
});