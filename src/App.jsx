

import { useState,useEffect} from "react"
import { Link } from "react-router-dom"
const App=()=>{
const [searchTerm,setSearchTerm]=useState("")
const[showResults,setShowResults]=useState(null)


useEffect(()=>{
  const API_url=`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&key=AIzaSyBejpVx3jdrjh62e-4ighHzzItftDWKEsM&q=${searchTerm}`

  const searchVideo=async()=>{
    if(!searchTerm)return
    try{
    const response=await fetch(API_url)
    
    const data=await response.json()
    console.log(data)
    setShowResults(data.items)
  }catch(error){
    console.log(error)
  }}
  searchVideo()
  
},[searchTerm])
  return (
    <>
<input type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
{showResults && <ul>{showResults.map((video)=>(
  <li key={video.id.videoId}>
    <Link to={`video/${video.id.videoId}`}>
<h1>{video.snippet.title}</h1>
<img src={video.snippet.thumbnails.default.url}/>
</Link>
  </li>
))}</ul>}
    </>
  )
}
export default App