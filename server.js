const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { readdirSync } = require("fs");
require('dotenv').config();

//app
const app = express();

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true
})
.then(() => console.log('DB CONNECTED'))
.catch((err) => console.log(`DB CONNECTION ERR ${err}`));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());

readdirSync("./routes").map((r) => 
    app.use("/api", require("./routes/" + r))
);

//port
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});