const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { format } = require('timeago.js');

//Initializations **********************************************************
const app = express();
require('./database');

//Settings *******************************************************************
app.set('port', process.env.PORT || 3000);

//Saber donde esta la carpeta views
app.set('views', path.join(__dirname, 'views'));

//Decirle el tipo de archivo que vamos a utilizar
app.set('view engine', 'ejs');

//Middlewares *****************************************************************
//Imprimir por consola informacion sobre las peticiones que recibe el server
app.use(morgan('dev'));

//Desde un formulario los diferentes inputs, lo pueda entender desde el servidor
app.use(express.urlencoded({ extended: false }));

//Cuando suba la imagen, nombre aleatorio con su extension. La configuraciòn para guardar la imagen
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuidv4() + path.extname(file.originalname))
    }
});

//Decirle a travez de que input le vamos a ingresar las imagenes, y tendra una propiedad llamada image
//Una sola imagen a la vez. Dentro de ese directorio va colocar todas las
app.use(multer({ storage: storage }).single('image'));

//Global variables *************************************************************
app.use((req, res, next) => {
    app.locals.format = format;
    next();
});

//Routes ************************************************************************
app.use(require('./routes/index'));

// Static files ******************************************************************
app.use(express.static(path.join(__dirname, 'public')));

//Start the server *****************************************************************
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});