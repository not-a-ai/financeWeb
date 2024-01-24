'use client'

import { useEffect } from "react";
import axios from "axios";
//import {CategoriasCreate} from "@/components/Categorias/CategoriasCreate";
//import {CategoriasUpdate} from "@/components/Categorias/CategoriasUpdate";
//import {MetasCreate} from "@/components/Metas/MetasCreate";
//import {MetasUpdate} from "@/components/Metas/MetasUpdate";
// import {CateriaCreate} from "@/components/Categorias/CategoriasCreate";
// import {TransacoesCreate} from "@/components/Transacoes/TransacoesCreate";
// import {TransacoesUpdate} from "@/components/Transacoes/TransacoesUpdate";
//import {CateriaUpdate} from "@/components/Categorias/CategoriasUpdate";


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
  }).catch(error => {
    window.location.href = '/login'
  }) 
}, [])

  return (
    <div>
      <h1>Dashboard</h1>
      {/* <MetasCreate /> */}
      {/* <MetasUpdate metaId={ 1 }/> */}
      {/* <TransacoesCreate/> */}
      {/* <TransacoesUpdate transacaoId={ 1 }/> */}

    </div>
  )
}

export default DashboardPage;