import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import todolistRoute from './routes/todolist.js'
const app = express();

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(express.json({limit:"20mb", extended:true}));
app.use(express.urlencoded({limit:"20mb", extended:true}));

app.use(cors(corsOptions));
app.use('/todolist', todolistRoute);


const CONNECTION_URL = 'mongodb+srv://nvh:nvhoang@cluster0.ty3fw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser:true, useUnifiedTopology:true
}).then(() => app.listen(PORT, () => 
    console.log(`Connection is on port: ${PORT}}`)
)).catch((err) => console.log(err.message));

mongoose.set('useFindAndModify',false);


