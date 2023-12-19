const express = require('express');
const Router = express.Router();
const Data = require('../Models/Data')

Router.get('/',(err,res)=>{
    res.render('index')
})

// create / insert data

Router.post('/add', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  const data = new Data({
    name,
    email
  });

  try {
    await data.save();
    
    res.redirect('/show');
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("An error occurred while saving the data.");
  }
});


// // find data 

Router.get('/show', async (req, res) => {
    try {
      const docs = await Data.find();
      res.render('show', {
        students: docs,
      });
    } catch (err) {
      // Handle errors here
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

// // update data

Router.get('/edit/:id', async (req, res) => {
    try {
      const docs = await Data.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
      res.render('edit', { studentdata: docs });
    } catch (err) {
      console.error("Can't update", err);
      // Handle the error, e.g., res.status(500).send('Internal Server Error');
    }
  });

  Router.post('/edit/:id', (req, res) => {
    Data.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then((docs) => {
            res.redirect('/show');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error updating Data");
        });
});
// Del data 

Router.get('/delete/:id', async (req, res) => {
    try {
      const deletedData = await Data.findByIdAndDelete(req.params.id);
      if (!deletedData) {
        console.log("Data not found");
      } else {
        console.log("Deleted");
        res.redirect('/show');
      }
    } catch (err) {
      console.log("Error:", err);
      // Handle errors or send an error response to the client
    }
  });


module.exports = Router;