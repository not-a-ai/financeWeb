'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as S from './style';


export const MetasPanel = () => {

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
        console.log(response.data.data)
      }
      catch (error) {
      }
    }
    getMetas()
  }, [ ]) 
  

  return (
    <>
      <div style={{display: 'flex'}}>
         { metas.map(meta => 
          <S.ChartContainer key={meta.id} style={{margin: '1rem', borderRadius: '1rem'}}>
            <S.Content style={{fontWeight: 600}}>{meta.descricao}</S.Content> 
            <S.Content style={{fontWeight: 300}}>Valor: {meta.valor}</S.Content> 
            <S.Content style={{fontWeight: 300}}>Data: {meta.data}</S.Content> 
          </S.ChartContainer>)}
       </div>
      
    </>
  )
}

export default MetasPanel;