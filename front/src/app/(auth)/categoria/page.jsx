'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import {CategoriasCreate} from "@/components/Categorias/CategoriasCreate";
import Button from '@mui/material/Button'


export const CategoriaPage = () => {
  
  const [ openModalCategoria, setOpenModalCategoria ] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      window.location.href = '/login'
    }
  
    axios.get('http://localhost:8080/users/me', {
      headers: { 
        'Authorization': `Bearer ${token}`
    }
    }).then(_ => {}).catch(_ => {
      window.location.href = '/login'
    }) 
  }, [])

  return (
    <>
        <div style={{ display: 'flex', gap: '15px', margin: '20px', paddingTop: '20px'}}>
          <Button variant="contained" color="primary" type='submit' onClick={() => setOpenModalCategoria(true)}>Nova categoria</Button>
        </div>

      <CategoriasCreate openModal={openModalCategoria} closeModal={setOpenModalCategoria}/>
    </>
  )
}

export default CategoriaPage;