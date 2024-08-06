import React from 'react'
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from 'react-router-dom';
import Register from './pages/auth/Register';
import RootLayout from './components/RootLayout';
import Login from './pages/auth/login';
import Cookies from 'js-cookie';
function App() {
  const accessToken = Cookies.get('accessToken');
  const router = createBrowserRouter(createRoutesFromElements(
     <Route path='/' element={<RootLayout />}>
        <Route index element={<h1>Authentication App</h1>} />
        <Route path='auth'>
          <Route
            path='login'
            element={
               <Login />
            }
          />
          <Route
            path='register'
            element={
              accessToken ? <Navigate to='/dashboard' replace /> : <Register/>
            }
          />
      
        </Route>
      </Route>
  )
 );
   return <RouterProvider router={router} />;
 
  
}



export default App;