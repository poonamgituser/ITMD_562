const express = require('express')
const app = express()
const port = 3000

var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID

app.use(express.json())
app.use(express.static('public'))

MongoClient.connect('mongodb://localhost:27017/books', function (err, client) {
  if (err) throw err

  let db = client.db('books')
  let books = db.collection('books')
  
  app.post('/books', (req, res) => {
    let newRecord = req.body
    console.log(req.body)
    books.insertOne(newRecord, function(err, result) {
      if (err) {
        console.log(err)
        res.status(500).send("There was an internal error")
      } else {
        console.log(req.body)
        res.send(result.ops[0])
        console.log("INSERT DATA DONE")
      }
    });
  });

  app.get('/books/:id', (req, res) => {
    let id = ObjectID.createFromHexString(req.params.id)

    books.findOne({"_id": id}, function(err, book) {
      if (err) {
        console.log(err)
        res.status(500).send("Internal server error")
      } else {
        console.log(book)
        if (book === null) {
          res.status(404).send("Not found")
        } else {
          console.log(book)
          res.send(book)
        }
      }
    });
  });

   
  app.put('/books', (req, res) => {
    let newRecord = req.body
    console.log(req.body)
    books.insertOne(newRecord, function(err, result) {
      if (err) {
        console.log(err)
        res.status(500).send("There was an internal error")
      } else {
        console.log(req.body)
        res.status(204)
        res.send(result.ops[0])
        console.log("INSERT DATA DONE")
      }
    });
  });

  app.delete('/books/:id', (req, res) => {
    let id = ObjectID.createFromHexString(req.params.id)
    console.log("Input is ")
    console.log(id)
    db.books.findOneAndRemove({"_id":id}, function (err, result) {
      if (err) {
        console.log(err)
        res.status(500).send("There was an internal server error")
      } else {
        console.log(req.body)
        res.status(204)
        console.log("Delete data done")
      }
    });
    
    console.log("Deleted the record")
        
  });

  app.get('/booksAll', (req, res) => {
    db.collection("books").find({}).toArray(function(err,books)
  {
    if (err) {
      console.log(err)
      res.status(500).send("Internal server error?")
    } else {
      console.log("TEST here!!")
      res.status(200)
      console.log(books)
      res.send(books)
    }
  })

});

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))