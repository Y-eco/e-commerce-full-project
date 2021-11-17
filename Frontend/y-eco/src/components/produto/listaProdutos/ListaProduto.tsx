import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import './ListaProduto.css';
import Produto from '../../../models/Produto';

import useLocalStorage from 'react-use-localstorage';
import { busca } from '../../../services/Service';
import { BorderClear } from '@material-ui/icons';

function ListaProduto() {

  const [produto, setProduto] = useState<Produto[]>([])
  const [token, setToken] = useLocalStorage('token');
  let history = useHistory();

  useEffect(() => {
    if (token == "") {
      alert("Você precisa estar logado")
      history.push("/home")

    }
  }, [token])

  async function getProduto() {
    await busca('/produto', setProduto, {
      headers: { 'Authorization': token }
    })
  }

  useEffect(() => {
    getProduto()
  }, [produto.length])

  return (
    <>
      <Box display="flex" flexWrap="wrap" justifyContent="center" minHeight="100vh">
        {
          produto.map(produto =>(
          <Box m={2} >
            <Card className = "cardProduto" variant="outlined">
              <CardContent>
                <Box>
                  <img className = "imgProduto" src="https://i.imgur.com/DAQ5FMZ.png" alt="" />
                </Box>
                <Typography variant="h5" component="h2">
                  {produto.nome}
                </Typography>
                <Typography variant="body1" component="p">
                  {produto.quantidade} unidades
                </Typography>
                <Typography variant="body2" component="p">
                R&#36;{produto.valor} 
                </Typography>
                <Typography variant="body2" component="p">
                  {produto.categoria?.nome}
                </Typography>
              </CardContent>
              <CardActions>
                <Box display="flex" justifyContent="center" mb={1.5}>

                  <Link to={`/formularioProduto/${produto.id}`} className="text-decorator-none" >
                    <Box mx={1}>
                      <Button variant="contained" className="marginLeft" size='small' color="primary" >
                        atualizar
                      </Button>
                    </Box>
                  </Link>
                  <Link to={`/deletarProduto/${produto.id}`} className="text-decorator-none">
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
      </Box>
    </>)
}

export default ListaProduto;
