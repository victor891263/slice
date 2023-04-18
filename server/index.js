require('dotenv').config();
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const app = express();


process.on('uncaughtException', (error, source) => {
    console.log('uncaughtException', error, source);
});


process.on('unhandledRejection', (error, source) => {
    console.log('unhandledRejection', error, source);
});


process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed');
        process.exit(0);
    });
});


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('./middleware/error'));


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to database')).catch(error => console.log(error));


app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find();
    res.send(shortUrls.reverse());
});


app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (!shortUrl) return res.sendStatus(404);

    shortUrl.clicks++;
    await shortUrl.save();

    res.redirect(shortUrl.full);
});


app.post('/shortUrls', async (req, res) => {
    const url = await ShortUrl.create({ full: req.body.fullUrl, createdOn: req.body.createdOn });
    res.send(url);
});


app.listen(process.env.PORT || 5000);