'use client'
import * as S from './style.jsx'
import { Icon } from '@mui/material'
import { useState } from "react";

export const Card = ({ children, label, valor, isMeta, metas = [], saldo = 0})  => {
  const [ meta, setMeta ] = useState(null)


  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === 'meta') setMeta(value);
  
  }

  return (
    <>
      <S.ChartContainer>
        <S.IconWrapper>
          <Icon sx={{ color: '#fff'}}>{children}</Icon>
        </S.IconWrapper>
        <S.Content>
          <S.Content>{label}</S.Content>
          { !isMeta && <S.Content style={{fontWeight: 600}}>{valor}</S.Content>}
          { isMeta && <S.Content style={{fontWeight: 600}}>{ `${(((meta - saldo) / meta) * 100).toFixed(0)}%`}</S.Content>}
          
        </S.Content>
        { isMeta && 
          <S.FormControl fullWidth>
            <S.InputLabel id="tipo">Meta</S.InputLabel>
            <S.Select
              labelId="meta"
              id="meta_select"
              value={meta}
              label="Meta"
              name="meta"
              onChange={onChangeValue}
            >
            { metas.map(meta => 
              <S.MenuItem key={meta.id} value={meta.valor}>{meta.descricao}</S.MenuItem>)}
           
          </S.Select>
        </S.FormControl>}
      </S.ChartContainer>
    </>
  )
}

export default Card