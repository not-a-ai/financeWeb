'use client'

import { useEffect } from "react";
import axios from "axios";
//import {CategoriasCreate} from "@/components/Categorias/CategoriasCreate";
import {CategoriasUpdate} from "@/components/Categorias/CategoriasUpdate";

export const DashboardPage = () => {
  useEffect(() => {
  const token = localStorage.getItem('token')
  if (!token) {
    window.location.href = '/login'
  }

  axios.get('http://localhost:8080/users/me', {
    headers: { 
      'Authorization': `Bearer ${token}`
  }
  }).then(response => {
    console.log(response.data.data)
  }).catch(error => {
    window.location.href = '/login'
  }) 
}, [])

  return (
    <div>
      <h1>Dashboard</h1>
      <CategoriasUpdate categoriaId={ 1 }/>

    </div>
  )
}

export default DashboardPage;