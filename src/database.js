const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dbimages', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log(`DB is connected :D...`))
    .catch(err => console.log(err));