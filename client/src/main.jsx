import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from '../Page/HomePage'
import Update from '../Page/Update'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/update/:id' element={<Update/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
