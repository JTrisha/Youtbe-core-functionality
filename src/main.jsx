
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import VideoPlayer from './components/VideoPlayer.jsx'

const router=createBrowserRouter([
  {path:"/",
    element:<App/>
  },{
    path:"/video/:id",
    element:<VideoPlayer/>
  }
])
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
)
