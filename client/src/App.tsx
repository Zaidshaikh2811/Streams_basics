
import { useState } from 'react'
import './App.css'
import { VideoPlayer } from '6pp'

function App() {
  const [quality, setQuality] = useState('720p')



  return (
    <div>
      <h1>hello</h1>

      <VideoPlayer src='http://localhost:3000/video' setQuality={quality} />
      {/* <video style={{
        width: '100%',
        height: '100%',
      }} src="http://localhost:3000/video" controls></video> */}
    </div>
  )
}

export default App
