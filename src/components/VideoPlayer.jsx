import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const VideoPlayer = () => {
    const[comments,setComments]=useState([])
    const[newComment,setNewComment]=useState("")
    const[name,setName]=useState("")
    const {id:videoId}=useParams()
    console.log(videoId)

    const api_key="AIzaSyBejpVx3jdrjh62e-4ighHzzItftDWKEsM"
    const Api_url=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${api_key}&maxResults=5000`
    useEffect(()=>{
const fetchComments=async()=>{
    if(!videoId)return
    try{
    const data=await fetch (Api_url)
    const response= await data.json()
    console.log(response)
setComments(response.items)
}catch(error){
    console.log(error)
}}
fetchComments()
    },[videoId])
    const handleSubmit=()=>{
        const newCommentObj = {
            snippet: {
              topLevelComment: {
                snippet: {
                  authorDisplayName: name,
                  textDisplay: newComment,
                },
              },
            },
          };
        setComments((prevComments)=>[...prevComments,newCommentObj])
        setNewComment("")
        setName("")
    }
  return (
    <div>
       {videoId? (<iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoId}`}title="YouTube video player" ></iframe>):(<h1>
        Loading...
       </h1>)}
       <ul>
       {comments.map((comment,index)=>(
    <li key={index}>
<h1>Name:{comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}</h1>
<h3>Comment:{comment?.snippet?.topLevelComment?.snippet?.textDisplay}</h3>
    </li>
))}
       </ul>
       

       <input type="name" placeholder="name" onChange={(e)=>setName(e.target.value)}/>
<input type="text" placeholder="comment"  value={newComment}onChange={(e)=>setNewComment(e.target.value)}/>
<button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default VideoPlayer