'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import {CategoriasCreate} from "@/components/Categorias/CategoriasCreate";
//import {CategoriasUpdate} from "@/components/Categorias/CategoriasUpdate";
//import {MetasCreate} from "@/components/Metas/MetasCreate";
//import {MetasUpdate} from "@/components/Metas/MetasUpdate";
// import {CateriaCreate} from "@/components/Categorias/CategoriasCreate";
// import {TransacoesCreate} from "@/components/Transacoes/TransacoesCreate";
// import {TransacoesUpdate} from "@/components/Transacoes/TransacoesUpdate";
//import {CateriaUpdate} from "@/components/Categorias/CategoriasUpdate";
import {Chart} from "@/components/Charts";
import {Panel} from "@/components/Panel";


export const DashboardPage = () => {
  const [ user, setUser ] = useState({
    id: null
  })
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
    setUser(response.data.data)
  }).catch(error => {
    window.location.href = '/login'
  }) 
}, [])

  return (
    <div>
      <h1>Olá, {user.name}</h1>
      <Panel/>
      <div style={{marginLeft: '80px'}}>
        <Chart />
      </div>
      
    </div>
  )
}

export default DashboardPage;