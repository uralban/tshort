const express = require('express');

const app = express();

app.use(express.json({extended: true}));

const {
  authRouter,
  categoryRouter,
  itemRouter,
  cartRouter,
  orderRouter,
} = require('./routes');

app.use('/app/category', categoryRouter);
app.use('/app/cart', cartRouter);
app.use('/app/order', orderRouter);
app.use('/app/auth', authRouter);
app.use('/app/item', itemRouter);

app.listen(process.env.PORT || 3020, () => {
    console.log('Server started!');
  });