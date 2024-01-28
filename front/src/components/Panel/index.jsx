'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../Card"
import Grid from '@mui/material/Grid';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SwapHorizontal from '@mui/icons-material/SwapHoriz';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AdsClickIcon from '@mui/icons-material/AdsClick';

export const Panel = ()  => {

  const [ somatorio, setSomatorio] = useState({
    receita: 0,
    despesa: 0,
    saldo: 0
  })
  

  useEffect(() => {
    const getTransacoes = async () => {
      try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:8080/transacoes`, {
            headers: {
              Authorization: `Bearer ${ token }`
          }
        })
        
       
        const somatorio = {}

        for(const transacao of response.data.data) {
          if(transacao.tipo === 'Receita') {
            somatorio.receita = somatorio.receita  ? somatorio.receita + transacao.valor : transacao.valor 
          }
          if(transacao.tipo === 'Despesa') {
            somatorio.despesa = somatorio.despesa ? somatorio.despesa + transacao.valor : transacao.valor 
          }
        }

        somatorio.saldo = somatorio.receita - somatorio.despesa
        setSomatorio(somatorio)
      }
      catch (error) {
      }
    }
    getTransacoes()
}, [ ]) 
  
  
const [ metas, setMetas ] = useState([])


useEffect(() => {
  const getMetas = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/metas`, {
          headers: {
            Authorization: `Bearer ${ token }`
        }
      })

      setMetas(response.data.data)
    }
    catch (error) {
    }
  }
  getMetas()
}, [ ]) 




  return (
    <>
      <Grid container spacing={8}>
        <Grid item xs={6}>
          <Card label={"Saldo Atual"} valor={`R$ ${somatorio.saldo /100}`}>
            <AccountBalanceWalletIcon/>
          </Card>
          <Card label={"Receitas"} valor={`R$ ${somatorio.receita /100}`}>
           <LocalAtmIcon/>
          </Card>
          
        </Grid>
        <Grid item xs={6}>
        <Card label={"Despesas"} valor={`R$ ${somatorio.despesa /100}`}>
            <SwapHorizontal/>
          </Card>
          <Card label={"Metas"} valor={"R$250,00"} isMeta metas= { metas } saldo={ somatorio.saldo }>
            <AdsClickIcon/>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Panel