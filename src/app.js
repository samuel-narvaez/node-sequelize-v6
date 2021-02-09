const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());


const PORT = process.env.PORT || 4000;


//Routes
const routes = require('./routes');
routes(app);

app.listen(PORT, () =>{
    console.log(`Escuchando en el puerto ${PORT}` );
})