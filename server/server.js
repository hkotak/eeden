const express = require('express');
const app = express();
const session = require('express-session');
const PORT = process.env.EXPRESS_CONTAINER_PORT || 8080;
const cors = require('cors');
const Redis = require('connect-redis')(session);
const flash = require('connect-flash');
const passport = require('passport');
const routes = require('./routes/api/index');
const auth = require('./routes/auth/auth');
const methodOverride = require('method-override');
const { methodSwitch } = require('./helpers/serverHelper');

app.use(cors())

app.use(session({
  store: new Redis(),
  secret: 'lollerkates',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.use(methodOverride((req, res) => {
  return methodSwitch(req, res );
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', auth)
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('<p>Test EC2 Change</p>')
})

app.get('*', (req, res) => {
  res.status(404).render('invalid');
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`)
})