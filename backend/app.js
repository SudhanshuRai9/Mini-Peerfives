const express = require('express');
const app = express();
const mongoose = require('mongoose');

// requiring routes
const userRoutes = require('./routes/user.router');
const p5Routes = require('./routes/p5.router');
const rewardsRoutes = require('./routes/rewards.router');

require('dotenv').config();

const DB = process.env.DB_URI;
mongoose.connect(DB).then(() => {
    console.log(`DB Connection Successfull!`);
}).catch((err) => console.log(err));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/api", p5Routes);
app.use("/api", rewardsRoutes);
app.use("/api", userRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server listening on PORT ${port}`);
})