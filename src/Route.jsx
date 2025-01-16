import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import InterviewSection from './components/InterviewSection'
import Register from './authentication/Register'
import Signin from './authentication/Signin'
import FormData from './components/Form'
const Approute = () => {
  return (
    <div>
        <Routes >
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/interviews' element={<InterviewSection/>}/>
            <Route path='/form' element={<FormData/>} />
            <Route path='/'  element={<Register/>} />
            <Route path='/auth/signin' element={<Signin/>} />
        </Routes>
    </div>
   
  )
}

export default Approute
