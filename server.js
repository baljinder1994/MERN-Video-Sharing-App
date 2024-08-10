const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors')
const videoRoutes=require('./routes/videos')

const path=require('path')

const app=express()

app.use(cors())
app.use(bodyParser.json())

app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use('/api/videos',videoRoutes)


mongoose.connect('mongodb://localhost:27017/video1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.listen(5000,() =>{
    console.log('Server is running on port 5000')
})