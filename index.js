const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config');
const db = require('./models');
const userRoute = require('./routes/user');
const  cors = require('cors')

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

/// route react

/// general routes

/// auth routes


const appPromise = (async () => {

    console.log('start connection');

    db.sequelize.authenticate().then(() => {
        console.log('connection established');
    })
    
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );

    app.use(
        bodyParser.json({inflate: true, strict: true}),
    );

    app.use('/', userRoute);


    return app;
})();

appPromise.then((app) => {
    app.listen(config.port, () => console.log('ку ебать'));
})
