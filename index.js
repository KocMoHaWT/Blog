const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models');
const userRoute = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: false }));

const appPromise = (async () => {

    console.log('start connection');

    db.sequelize.authenticate().then(() => {
        console.log('connection established');
    })
    console.log('121');
    
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
    // app.listen(8080, 'back')
    app.listen(8080, () => console.log('ку ебать'));
})
