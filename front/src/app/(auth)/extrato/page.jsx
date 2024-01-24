'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button'
import {CategoriasCreate} from "@/components/Categorias/CategoriasCreate";

export const ExtratoPage = () => {

  const [ openModal, setOpenModal ] = useState(false);
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
    <>
      <div style={{ display: 'flex', gap: '15px'}}>
        <Button variant="contained" color="primary" type='submit' onClick={() => setOpenModal(true)}>Nova categoria</Button>
        <Button variant="contained" color="primary" type='submit'>Nova transação</Button>
        <Button variant="contained" color="primary" type='submit'>Nova meta</Button>
      </div>
      <CategoriasCreate openModal={openModal} closeModal={setOpenModal}/>
    </>
  )
}

export default ExtratoPage;