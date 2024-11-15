import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home';
import Navbar from './components/navbar';
import Paste from './components/Paste';
import Viewpastes from './components/Viewpastes';


const router = createBrowserRouter(

  [
    {
      path:"/",
      element:
      <div>
<Navbar/>
<Home/>
      </div>
    },
    {
      path:"/pastes",
      element:
      <div>
          <Navbar/>
          <Paste/>
      </div>
    },
    {
      path:"/pastes/:id",
      element:
      <div>
        <Navbar/>
        <Viewpastes/>

      </div>
    },

  ]

);


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <RouterProvider router={router}/>
      
    </div>
  )
}

export default App
