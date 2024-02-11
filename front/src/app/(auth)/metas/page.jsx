'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button'
import { MetasPanel } from '@/components/Metas/MetasPanel';

import {MetasCreate} from "@/components/Metas/MetasCreate";


export const MetaPage = () => {

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

  const [ openModalMeta, setOpenModalMeta ] = useState(false);
  
  return (
    <>
    <div style={{margin: '1rem'}}>
      <Button variant="contained" color="primary" type='submit' onClick={() => setOpenModalMeta(true)} style={{margin: '1rem'}}>Nova meta</Button>
      <MetasCreate openModal={openModalMeta} closeModal={setOpenModalMeta}/> 
      <MetasPanel/> 
    </div> 
    </>
  )
}

export default MetaPage;