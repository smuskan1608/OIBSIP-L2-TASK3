const express=require('express');
const mongoose=require('mongoose');
const cors = require ('cors');

const app=express();
app.use(express.json());
app.use(cors());

require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log("database connection successfull"))
.catch((error)=>{
    console.log('Issue in connection');
    console.error(error.message);
    process.exit(1);
})

const Todo=require('./models/Todo')

app.get('/', async(req,res) => {
    const todos = await Todo.find();
    res.json(todos);
})

app.post('/create', async(req,res) => {
    const {title,description} = req.body;
    const todo = new Todo({
        title,description
    })
    todo.save();

    res.json(todo);
})

app.delete('/delete/:id', async(req,res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
})

app.put('/update/:id', async(req,res)=>{
    const id = req.params.id;
    const {title,description} = req.body;
    
    const result = await Todo.findByIdAndUpdate(id,{title,description,updatedAt:Date.now()}, {new:true});
    res.json(result);
})

app.listen(3001, ()=>{
    console.log(`Server started successfully at 3001`);
})