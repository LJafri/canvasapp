const express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path')
const app = express();
const crypto = require('crypto');
const consumerSecret = process.env.CANVAS_CONSUMER_SECRET || '90E61B04E7D258F84F86804ABCF0B070F3A23428E603CD2DEB08EA1330B35407';

app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', function(res, req) {
    res.render('hello');
});

app.post('/', function(res, req) {
    let bodyArray = req.body.signed_request.split('.');
    let consumerSecret = bodyArray[0];
    let encoded_envelope = bodyArray[1];

    let check = crypto.createHmac("sha256", consumerSecretApp).update(encoded_envelope).digest('base64');

    if (check === consumerSecret) {
        let envelope = JSON.parse(new Buffer(encoded_envelope, 'base64').toString('asci'));
        res.render('index', { title: envelope.context.user.userName, req : JSON.stringify(envelope) });
    } else {
        res.send('authentication failed 401');
    }
})

app.listen(3000, function() {
    console.log('Server is Running');
});