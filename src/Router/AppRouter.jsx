import React from 'react'
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import Home from '../components/Home'
import Dashboard from '../components/Dashboard'
import NotFound from '../components/NotFound'
import ProfileSelector from '../components/ProfileSelector'
import ProfileDetail from '../components/ProfileDetail'
import ProfileCreate from '../components/ProfileCreate'
import ProfileEdit from '../components/ProfileEdit'
import Login from '../components/Login' 
import Register from '../components/Register'
import PrivateRoute from '../components/PrivateRoute'

const AppRouter = () => {
  const navigate = useNavigate()
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} /> 
        <Route path='/login' element={<Login />} /> 
        <Route path='/register' element={<Register />} />
        
        <Route
          path='/list'
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* rutas anidadas */}
        <Route
          path="/nested-route"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="users" element={<p className="text-white">Users 🧑🏻‍💻</p>} />
          <Route path="settings" element={<p className="text-white">Settings ⚙️</p>} />
        </Route>

        {/* rutas dinámicas protegidas */}
        <Route
          path='/profiles'
          element={
            <PrivateRoute>
              <ProfileSelector />
            </PrivateRoute>
          }
        />
        <Route
          path='/profiles/:id'
          element={
            <PrivateRoute>
              <ProfileDetail />
            </PrivateRoute>
          }
        />
        <Route
          path='/profiles/create-profile'
          element={
            <PrivateRoute>
              <ProfileCreate />
            </PrivateRoute>
          }
        />
        <Route
          path='/profiles/:id/edit'
          element={
            <PrivateRoute>
              <ProfileEdit />
            </PrivateRoute>
          }
        />

        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default AppRouter