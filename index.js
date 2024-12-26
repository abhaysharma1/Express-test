import express from "express";

const app = express();

const port = 3000;

app.use(express.json());

let teadata = [];
let nextid = 1;


//add element to teadata

app.post("/teas", (req, res) => {
  const { name, price } = req.body;

  const newTea = {
    id: nextid++,
    name,
    price,
  };

  teadata.push(newTea);
  res.status(201).send(newTea);
});


//get element from teadata by id

app.get("/teas/:id", (req, res) => {
  const tea = teadata.find(t => t.id === parseInt(req.params.id));
  if (!tea){
    return res.status(404).send('Tea Not Found')
  }
  res.status(200).send(tea)
});

//update tea

app.put("/teas/:id",(req,res)=>{
    const tea = teadata.find(t => t.id === parseInt(req.params.id));
    if (!tea){
        return res.status('404').send('Tea Not Found')
    }
    const {name,price} = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})


//delete
app.delete("/teas/:id",(req,res)=>{
    const index = teadata.findIndex(t=>t.id===parseInt(req.params.id))
    if (index === -1){
        return res.status(404).send('tea not found')
    }
    teadata.splice(index,1)
    res.status(404).send('Deleted')
})

app.listen(port, () => {
  console.log("server is running");
});
