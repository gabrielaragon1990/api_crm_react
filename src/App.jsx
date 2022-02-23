import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Inicio from './pages/Inicio'
import NuevoCliente from './pages/NuevoCliente'
import EditarCliente from './pages/EditarCliente'
import VerCliente from './pages/VerCliente'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route path='/clientes' element={<Layout />}>
            <Route index element={<Inicio />} />
            <Route path=':id' element={<VerCliente />} />
            <Route path='nuevo' element={<NuevoCliente />} />
            <Route path='editar/:id' element={<EditarCliente />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
