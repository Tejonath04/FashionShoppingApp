const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const connectDb = require('./config/database');

const app = express();
app.use(bodyParser.json());

connectDb();

app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/recommendation', recommendationRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

