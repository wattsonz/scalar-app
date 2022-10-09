import { Box, Grid, Paper} from '@mui/material'
import { experimentalStyled as styled } from '@mui/material/styles';
import Image from 'next/image';
import React from 'react'

type Props = {}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function Products({}: Props) {
  // var product = 5;
  const product = [{image:"/imgs/lazy_cat.jpg",price:"100",describe:"1"}
                  ,{image:"/imgs/lazy_cat.jpg",price:"100",describe:"2"}
                ,{image:"/imgs/lazy_cat.jpg",price:"100",describe:"3"}
              ,{image:"/imgs/lazy_cat.jpg",price:"100",describe:"4"}];

  // product.forEach( product => )
  if(product.length != 0){
    return (
      <div>
          <Grid padding={10} container spacing={1}>
                  <Grid item xs={3}>
                      <Image src={product[0].image} width={200} height={200} layout = 'fixed'></Image>
                      <p>{product[0].describe}</p>
                      <p>{product[0].price}</p>
                  </Grid>
                  <Grid item xs={3}>
                      <Image src={'/imgs/lazy_cat.jpg'} width={200} height={200} layout = 'fixed'></Image>
                      <p>describ</p>
                      <p>price</p>
                  </Grid>
                  <Grid item xs={3}>
                      <Image src={'/imgs/lazy_cat.jpg'} width={200} height={200} layout = 'fixed'></Image>
                      <p>describ</p>
                      <p>price</p>
                  </Grid>
                  <Grid item xs={3}>
                      <Image src={'/imgs/lazy_cat.jpg'} width={200} height={200} layout = 'fixed'></Image>
                      <p>describ</p>
                      <p>price</p>
                  </Grid>
              </Grid>
      </div>
    )
  }
}