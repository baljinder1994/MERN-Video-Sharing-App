const express=require('express')
const multer=require('multer')
const path=require('path')
const Video=require('../models/Video')
const router=express.Router()

const storage=multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + path.extname(file.originalname));
    }
})

const upload=multer({storage});

//Get all videos
router.get('/',async(req,res) =>{
    try{
        const videos=await Video.find();
        res.status(200).json(videos)
    }catch(error){
        res.status(500).json({message:'Error getting videos'})
    }
})

//By Id

router.get('/:id',async(req,res) =>{
    try{
        const video=await Video.findById(req.params.id);
        res.status(200).json(video)
    }catch(error){
        res.status(500).json({message:'Error getting videos'})
    }
})

router.post('/:id/like',async(req,res) =>{
    try{
        const video= await Video.findById(req.params.id);
        if(!video) return res.status(404).json({message:'Video not found'})
            video.likes=(video.likes || 0) + 1;
        await video.save();
        res.json({ likes: video.likes});
    }catch(error){
        res.status(500).json({message:'Error getting videos'})
    }
})

router.post('/:id/comments',async (req,res) =>{
    try{
        const video=await Video.findById(req.params.id)
        if(!video) return res.status(404).json({message:'Video not found'})
        const comment={ text: req.body.text}
        video.comments=video.comments || []
        video.comments.push(comment)
        await video.save();
        res.json(comment)

    }catch(error){
        res.status(500).json({message:'Error getting videos'})
    }
})



//POST upload video

router.post('/upload',upload.single('video'), async(req,res) =>{
    try{
        const { title,description,category} =req.body;
        const videoUrl=req.file.path;

        const newVideo=new Video({
            title,
            description,
            videoUrl,
            category
           
        })
        await newVideo.save();
        res.status(200).json({message:'Video uploaded successfully'})
    }catch(error){
        res.status(500).json({message:'Error uploading video'})
    }
})







module.exports=router