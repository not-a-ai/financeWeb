'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button'

import {TransacoesCreate} from "@/components/Transacoes/TransacoesCreate";
import {TransacoesList} from "@/components/Transacoes/TransacoesList"


export const ExtratoPage = () => {


  const [ openModalTransacao, setOpenModalTransacao ] = useState(false);

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
        
        <Button variant="contained" color="primary" type='submit' onClick={() => setOpenModalTransacao(true)}>Nova transação</Button>
        
      </div>
    
      
      <TransacoesCreate openModal={openModalTransacao} closeModal={setOpenModalTransacao}/>
      <TransacoesList/>
      
    </>
  )
}

export default ExtratoPage;