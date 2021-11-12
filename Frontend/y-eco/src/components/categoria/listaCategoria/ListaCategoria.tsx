import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import Categoria from '../../../models/Categoria';
import './ListaCategoria.css';
import useLocalStorage from 'react-use-localstorage';
import {useHistory} from 'react-router-dom';
import { busca } from '../../../services/Service';

function ListaCategoria() {
  const [categorias, setCategoria] = useState<Categoria[]>([])
  const [token, setToken] = useLocalStorage('token');
  let history = useHistory();

  useEffect(()=>{
    if(token == ''){
      alert("Você precisa estar logado")
      history.push("/login")
    }
  }, [token])


  async function getCategoria() {
    await busca("/categoria", setCategoria, {
      headers: {
        'Authorization': token
      }
    })
  }


  useEffect(()=>{
    getCategoria()
  }, [categorias.length])

  return (
    <>
    {
      categorias.map(categoria =>(
      <Box m={2} >
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Categoria
            </Typography>
            <Typography variant="h5" component="h2">
             {categoria.nome}
            </Typography>
            <Typography variant="h5" component="h2">
             {categoria.setor}
            </Typography>
            <Typography variant="h5" component="h2">
             {categoria.tipo}
            </Typography>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5} >

              <Link to={`/formularioCategoria/${categoria.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" className="marginLeft" size='small' color="primary" >
                    atualizar
                  </Button>
                </Box>
              </Link>
              <Link to={`/deletarCategoria/${categoria.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" size='small' color="secondary">
                    deletar
                  </Button>
                </Box>
              </Link>
            </Box>
          </CardActions>
        </Card>
      </Box>
      ))
      }
    </>
  );
}


export default ListaCategoria;