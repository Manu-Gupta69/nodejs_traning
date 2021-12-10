const express = require('express');
const app = express();

const inventoryRoutes = require('./routes/inventory');

app.use(express.json());
app.use(inventoryRoutes);

app.listen(3000 , ()=>{
    console.log('listening on port 3000')
})