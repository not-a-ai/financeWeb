'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as S from './style';

export const TransacoesCreate = ({ categoriaId }) => {
  const [descricao, setDescricao] =  useState();
  const [valor, setValor] =  useState();
  const [dataTransacao, setDataTransacao] =  useState();
  const [categoria, setCategoria] =  useState('');
  const [categorias, setCategorias] =  useState([]);
  const [tipo, setTipo] =  useState('Receita');

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === 'descricao') setDescricao(value);
    if (name === 'valor') setValor(value);
    if (name === 'dataTransacao') setDataTransacao(value);
    if (name === 'categoria') setCategoria(value);
    if (name === 'tipo') setTipo(value);
    
  }

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: ''
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/transacoes', { descricao, valor, data: dataTransacao, tipo, categoria_id: categoria}, {
        headers: {
          Authorization: `Bearer ${ token }`
        }
      })
      console.log(response)
      setNotification({
        open: true,
        message: `Transacão ${ descricao } realizada com sucesso`,
        severity: 'success'
      })
    } catch (error) {
      setNotification({
        open: true,
        message: error.response.data.error,
        severity: 'error'
      })
    }
  };

  useEffect(() => {
    const getCategorias = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/categorias`, {
          headers: {
            Authorization: `Bearer ${ token }`
        }
      })
      console.log(response)
      setCategorias(response.data.data.categoria_id)
    }
   catch (error) {
    setNotification({
      open: true,
      message: error.response,
      severity: 'error'
    })
  }
  
 }
 getCategorias()
}, [ ]) 


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
      < S.Form onSubmit ={ onSubmit }>
      <S.H1>Criar Transação</S.H1>

        <S.TextField fullWidth onChange={ onChangeValue } variant="outlined"  name="descricao" label="Descrição" color="primary"/>
        <S.TextField fullWidth onChange={ onChangeValue } variant="outlined"  name="valor" label="Valor" color="primary"/>
        <S.TextField fullWidth onChange={ onChangeValue } variant="outlined"  name="dataTransacao" label="Data Transacao" color="primary"/>
        <S.FormControl fullWidth>
          <S.InputLabel id="tipo">Categoria</S.InputLabel>
          <S.Select
            labelId="categoria"
            id="categoria_select"
            value={categoria}
            label="Categoria"
            name="categoria"
            onChange={onChangeValue}
          >
          { categorias.map(categoria => <S.MenuItem key={categoria.id} value={categoria.id}>{categoria.name}</S.MenuItem>)}
           
          </S.Select>
        </S.FormControl>

        <S.FormControl fullWidth>
          <S.InputLabel id="tipo">Tipo</S.InputLabel>
          <S.Select
            labelId="tipo"
            id="tipo_select"
            name='tipo'
            value={tipo}
            label="Tipo"
            onChange={onChangeValue}
          >
            <S.MenuItem value="Receita">Receita</S.MenuItem>
            <S.MenuItem value="Despesa">Despesa</S.MenuItem>
          </S.Select>
        </S.FormControl>
     
        <S.Button variant="contained" color="success" type='submit'>Enviar</S.Button>
        
      </S.Form>


      <S.Snackbar open={ notification.open } autoHideDuration={3000} onClose={handleClose}>
        <S.Alert onClose={handleClose} severity={notification.severity} variant='filled' sx={{ width: '100%'}}>
          {notification.message}
        </S.Alert>
      </S.Snackbar>
    </>
  )
}

export default TransacoesCreate;