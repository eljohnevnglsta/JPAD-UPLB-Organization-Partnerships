const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')
const ReportModel = require('./models/Reports')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://jvvillarosa:WT5xr53ZEjZRoRu9@jpadprojectdatabase.vc75f.mongodb.net/test")

app.get('/getUsers', (req, res) => {
    UserModel.find()
      .then(users => res.json(users))
      .catch(err => res.json(err));
  });

  app.get('/getReports', (req, res) => {
    ReportModel.find()
      .then(reports => res.json(reports))
      .catch(err => res.json(err));
  });

  
app.listen(3001, () => {
    console.log("Server is running")
})