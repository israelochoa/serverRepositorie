const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app=express();
const {config}=require("dotenv");
config()
const port=process.env.port||5000;
const db=mysql.createPool({
    host: 'localhost',
    user:'root',
    password:'IsraI@9312',
    database:'schematest5_14am'
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.get('/',(req,res)=>{
    res.send('Hi there Israel, Welcome the 7me cycle')
})
app.get('/getBooks',(req,res)=>{
    const selectQuery='Select * from booksreviews'
    db.query(selectQuery,(err,result)=>{
        res.send(result)
    })
})
app.post("/insert", (req, res) => {
    const bookName = req.body.setBookName;
    const bookReview = req.body.setReview;
    const InsertQuery = "INSERT INTO booksreviews (bookname, bookreviews) VALUES (?, ?)";
    db.query(InsertQuery, [bookName, bookReview], (err, result) => {
      console.log(result)
    })
})
app.delete("/delete/:bookId", (req, res) => {
    const bookId = req.params.bookId;
    const DeleteQuery = "DELETE FROM booksreviews WHERE idbooks= ?";
    db.query(DeleteQuery, bookId, (err, result) => {
        if (err) console.log(err);
    })
})
app.put("/update/:bookId", (req, res) => {
    const bookReview = req.body.reviewUpdate;
    const bookId = req.params.bookId;
    const UpdateQuery = "UPDATE booksreviews SET bookreviews = ? WHERE idbooks = ?";
    db.query(UpdateQuery, [bookReview, bookId], (err, result) => {
        if (err) console.log(err)
    })
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});