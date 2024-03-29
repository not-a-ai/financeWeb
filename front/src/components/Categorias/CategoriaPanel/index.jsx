'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as S from './style';


export const CategoriaPanel = () => {

  const [ categorias, setCategorias ] = useState([])


  useEffect(() => {
    const getCategorias = async () => {
      try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:8080/categorias`, {
            headers: {
              Authorization: `Bearer ${ token }`
          }
        })
  
        setCategorias(response.data.data)
      }
      catch (error) {
      }
    }
    getCategorias()
  }, [ ]) 
  

  return (
    <>
      
         { categorias.map(cateogoria => 
          <S.ChartContainer key={cateogoria.id} style={{margin: '1rem', borderRadius: '1rem'}}><S.Content  style={{fontWeight: 600}}>{cateogoria.name}</S.Content> </S.ChartContainer>)}
          
      
    </>
  )
}

export default CategoriaPanel;