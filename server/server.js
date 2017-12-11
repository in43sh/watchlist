const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ctrl = require('./watchlist');``

const app = express();

app.use(bodyParser.json());

app.use(cors());

const PORT = 3535;
app.post('/api/addmovie', ctrl.post);
// app.get('api/getwatchlist', ctrl.get);
// app.delete('/api/deletemovie', ctrl.delete);

app.listen(PORT, () => console.log('we are listening on port ' + PORT));
