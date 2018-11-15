const express = require('express');
const app = express();
const session = require('express-session');
const PORT = process.env.EXPRESS_CONTAINER_PORT || 8080;
const routes = require('./routes/api/index');
const cors = require('cors');

app.use(cors())

app.use('/api', routes);

app.set('trust proxy', 1)
app.use(session({
  secret: 'dreamy cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.get('/', (req, res) => {
  if (req.session.views) {
    req.session.views++;
    console.log(req.session);
  } else {
    req.session.views = 1;
    console.log(req.session);
  }
  // res.send('<p>Sanity Check</p>')
  res.end()
})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`)
})