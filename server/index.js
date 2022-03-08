if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const monumentsRoutes = require('./routes/monuments');
const userRoutes = require('./routes/user');
const stateRoutes = require('./routes/state');
const paymentRoutes = require('./routes/payments');

const dbURL = process.env.MONGO_DB_URL;
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', () => {
  console.log('Error in connecting Database');
});
db.on('success', () => {
  console.log('Database connected');
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/monuments', monumentsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/states', stateRoutes);
app.use('/api/payment', paymentRoutes);

app.get('/', (req, res) => {
  res.send('server up and running!!');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
