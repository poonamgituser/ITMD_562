const express = require('express')
const app = express()
const port = 3000

  var dummyCounter = 0;

  let counters = [dummyCounter];
    
  app.use(express.static('public'))
  app.use(express.json())
  
app.get('/counter', (req, res) => res.send(counters))
app.get('/counter/:id', (req, res) => {
    let id = req.params.id
    let foundCounter = counters[id];
  
    if (foundCounter === undefined) {
      res.status(404)
      res.send()
    } else {
      res.send(foundCounter)
      res.status(200)
      res.send()
    }
  });
  
  app.post('/counter', (req, res) => {
    let newCounter = req.body;
    dummyCounter = dummyCounter+1;
    counters.push(dummyCounter);
    console.log("Incremented counter value: " +dummyCounter);
    res.status(204).send(newCounter)
  });
  
  app.delete('/counters:counters', (req, res) => {
    let counter = req.params.counter;
    counters[dummyCounter] = undefined;
    res.status(204).send();
  });  

app.listen(port, () => console.log(`Example app listening on port ${port}!`))