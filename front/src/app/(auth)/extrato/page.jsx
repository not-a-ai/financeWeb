'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button'

import {MetasCreate} from "@/components/Metas/MetasCreate";
import {TransacoesCreate} from "@/components/Transacoes/TransacoesCreate";
import {TransacoesList} from "@/components/Transacoes/TransacoesList"


export const ExtratoPage = () => {


  const [ openModalMeta, setOpenModalMeta ] = useState(false);
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
        <Button variant="contained" color="primary" type='submit' onClick={() => setOpenModalMeta(true)}>Nova meta</Button>
      </div>
      
      <MetasCreate openModal={openModalMeta} closeModal={setOpenModalMeta}/>
      <TransacoesCreate openModal={openModalTransacao} closeModal={setOpenModalTransacao}/>
      <TransacoesList/>
    </>
  )
}

export default ExtratoPage;