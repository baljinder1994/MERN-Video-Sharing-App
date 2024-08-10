import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
const HomePage = () => {
    const[videos,setVideos]=useState([])
    const[categories,setCategories]=useState(['All','Funny','Cooking','Tech'])
     const[selectedCategory,setSelectedCategory]=useState('All')

     useEffect(() =>{
        const fetchVideos=async() =>{
            try{
                const response=await axios.get('http://localhost:5000/api/videos');
                const correctedVideos=response.data.map(video =>({
                    ...video,
                    videoUrl:video.videoUrl.replace(/\\/g,'/')
                }))
                setVideos(correctedVideos)
            }catch(error){
                console.error('Error fetching videos')
            }
        }
        fetchVideos()
     },[])

     useEffect(() =>{
        const fetchVideosByCategory=async() =>{
            try{
                const response=await axios.get('http://localhost:5000/api/videos');
                const correctedVideos= response.data.map(video =>({
                    ...video,
                    videoUrl:video.videoUrl.replace(/\\/g,'/')
                }))

                if(selectedCategory==='All'){
                    setVideos(correctedVideos)
                }else{
                    const filteredVideos= correctedVideos.filter(video => video.category === selectedCategory)
                    setVideos(filteredVideos)
                }
            }catch(error){
                console.log('Error fetching videos by category')
            }
        }
        fetchVideosByCategory()
     },[selectedCategory])

     const handleCategoryChange=(e)=>{
         setSelectedCategory(e.target.value)
     }

  return (
    <div className='dashboard'>
      <header className='header'>
       
        <div className='search-bar'>
            <label htmlFor="category">Filter By Category</label>
            <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                {categories.map(cat =>(
                    <option key={cat} value={cat}>{cat}</option>
                ))}

            </select>
        </div>
      </header>
      <div className='video-list'>
        {videos.length === 0 ? (
            <p>No videos found</p>
        ):(
            videos.map(video =>(
                <div key={video._id} className='video-card'>
                    <h2>{video.title}</h2>
                    <p>{video.description}</p>
                    <Link to={`/video/${video._id}`}>
                      <video width="320" height="240" controls>
                        <source src={`http://localhost:5000/${video.videoUrl}`}>
                          
                        </source>
                        Your browser not supported
                      </video>
                    </Link>
              </div>
            ))
        )}
      </div>
    </div>
  )
}

export default HomePage
