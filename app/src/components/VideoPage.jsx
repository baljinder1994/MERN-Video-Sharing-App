import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const VideoPage = () => {
    const {id}= useParams();
    const[video,setVideo]=useState(null);
    const[likes,setLikes]=useState(0);
    const[comments,setComments]=useState([]);
    const[newComment,setNewComment]=useState('')

    useEffect(() =>{
        const fetchVideo=async() =>{
            try{
                const response=await axios.get(`http://localhost:5000/api/videos/${id}`)
                setVideo(response.data)
                setLikes(response.data.likes)
                setComments(response.data.comments || [])
            }catch(error){
                console.error('Error fetching videos',error)
            }
        }
        fetchVideo()
    },[id])

    const handleLike=async() =>{
        try{
            const response=await axios.post(`http://localhost:5000/api/videos/${id}/like`);
            setLikes(response.data.likes)

        }catch(error){
            console.error('Error liking video',error)
        }
    }

    const handleAddComment=async() =>{
        if(!newComment.trim()) return;
        try{
            const response=await axios.post(`http://localhost:5000/api/videos/${id}/comments`,{text:newComment})
            setComments([...comments,response.data])
            setNewComment('')
        }catch(error){
            console.error('Error adding comment',error)
        }
    }


    if(!video) return <div>Loading...</div>


  return (
    <div className='video-page'>
       <h1>{video.title}</h1>
       <video controls>
         <source src={`http://localhost:5000/${video.videoUrl}`} type="video/mp4"></source>
     
       </video>
       <p>{video.description}</p>

    

       <button className='like-button' onClick={handleLike}>Like({likes})</button>
   
      <div className='comments-section'>
        <h3>Cooments</h3>
        <ul>
            {comments.map((comment,index) =>(
                <li key={index}>{comment.text}</li>
            ))}
        </ul>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></input>
        <button onClick={handleAddComment}>Submit</button>
      </div>
      
    </div>
  )
}

export default VideoPage
