

const express = require('express'); 
const app = express();
const bodyParser = require('body-parser'); 
const db = require('./testdb');

app.use(bodyParser.json());


app.post('/signup',(req,res)=>{
    //let obj = req.body;
    db.testmodel.create(req.body,(error)=>{
        if(error) throw error;
    });
    res.send('Document Created Succesfully');
});

app.get('/data',async (req,res)=>{
    let obj = await db.testmodel.find();
    res.send(obj);
    console.log(obj);
});

app.put('/update/:id', async (req,res)=>{
    try{
        let obj = await db.testmodel
        .find({_id:req.params.id})
        .updateOne(req.body,(error)=>{
        if(error) throw error;
        res.send('Updated Succesfully :)')
    });
    }catch(e){
        res.status(500).send(e);
    }
});


app.delete("/delete/:id", async (req,res) => {
    try {
        await db.testmodel
        .deleteOne({ _id: req.params.id });
        res.send('Deleted Succesfully :(');
    } catch (error) {
        res.status(500).send(error);
    }
});



app.listen(4000,()=>{
    console.log("Listening....");
});