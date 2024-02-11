'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as S from './style';
import { format} from 'date-fns';
import { ptBR } from 'date-fns/locale';
// import MetasUpdate from '@/components/Categorias/CategoriasUpdate';
import Button from '@mui/material/Button'

export const MetasPanel = () => {

  const [ metas, setMetas ] = useState([])
  const [ openModalEditMeta, setOpenModalEditMeta ] = useState(false);

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: ''
  });

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
  
  const removeMeta = async (metaId) => {
    try {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:8080/metas/${metaId}`, {
      headers: {
        Authorization: `Bearer ${ token }`
      }
    })
    setNotification({
      open: true,
      message: `Meta apagada com sucesso`,
      severity: 'success'
    })
    location.reload();
  } catch (error) {
    setNotification({
      open: true,
      message: error.response.data.error,
      severity: 'error'
    })
  }}
  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setNotification({
      open: false,
      message: '',
      severity: ''
    })
  }


  return (
    <>
      <S.Snackbar open={ notification.open } autoHideDuration={3000} onClose={handleClose}>
        <S.Alert onClose={handleClose} severity={notification.severity} variant='filled' sx={{ width: '100%'}}>
          {notification.message}
        </S.Alert>
      </S.Snackbar>

      <div style={{display: 'flex'}}>
         { metas.map(meta => 
          <S.ChartContainer key={meta.id} style={{margin: '1rem', borderRadius: '1rem'}}>
            <div>
              <S.Content style={{fontWeight: 600}}>Meta: {meta.descricao}</S.Content> 
              <S.Content style={{fontWeight: 300}}>Valor: R$ {(meta.valor/100)}</S.Content> 
              <S.Content style={{fontWeight: 300}}>Data: {format(new Date(meta.data), 'd MMM, yyyy' ,{ locale: ptBR})}</S.Content> 
            </div>
            <Button variant="contained" color="primary" type='submit' onClick={() => removeMeta(meta.id)} style={{margin: '1rem'}}>Apagar meta</Button>
            {/* <Button variant="contained" color="primary" type='submit' onClick={() => setOpenModalEditMeta(true)}>Editar meta</Button> */}
          </S.ChartContainer>)
          
          }
       </div>
      
      {/* <MetasUpdate openModal={openModalEditMeta} closeModal={setOpenModalEditMeta}/> */}
    </>
  )
}

export default MetasPanel;