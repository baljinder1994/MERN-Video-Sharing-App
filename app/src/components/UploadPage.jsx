import React, { useState } from 'react'
import axios from 'axios'
const UploadPage = () => {

    const [video,setVideo]=useState(null);
    const[title,setTitle]=useState('')
    const[description,setDescription]=useState('')
    const[category,setCategory]=useState('')
    const[categories]=useState(['Funny','Cooking','Tech'])

   const handleSubmit= async (e)=>{
     e.preventDefault();
     const formData=new FormData();
     formData.append('video',video);
     formData.append('title',title);
     formData.append('description',description);
     formData.append('category',category);

     try{
        await axios.post('http://localhost:5000/api/videos/upload',formData)
        alert('Video Uploaded Successfully')
     }catch(error){
        console.error('Error uploading video',error)
     }



   }
   const handleFileChnage=(e)=>{
    setVideo(e.target.files[0])
   }

  return (
    <div className="upload-page">
       <h1>Upload Your Videos</h1>
       <form onSubmit={handleSubmit}>
        <label>Title:
            <input
             type="text"
             value={title}
             onChange={(e) => setTitle(e.target.value)}
             required
            >
            </input>
        </label>
        <label>Description:
           <textarea
             value={description}
             onChange={(e) => setDescription(e.target.value)}
             required
           >

           </textarea>
        </label>
        <label>Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
                {categories.map(cat =>(
                <option key={cat} value={cat}>
                     {cat}
                </option>
            ))}

            </select>
        </label>
        <label>
            Video:
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChnage}
              required
            ></input>
        </label>
        <button type="submit">Upload Video</button>
       </form>
    </div>
  )
}

export default UploadPage
