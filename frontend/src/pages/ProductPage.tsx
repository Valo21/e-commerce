import { Box, Button, Container, Grid, InputAdornment, Paper, SxProps, TextField, Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import ProductCard from "@components/ProductCard";
import { useParams } from "react-router-dom";
import { useGetProductQuery, useUpdateProductMutation } from "@store/api/productsApi";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { addProduct } from "@store/slices/cartSlice";
import ImageCarousel from "@components/ImageCarousel";
import { USDollar } from "@lib/utils.ts";
import { Product } from "@src/types";
import IconButton from "@mui/material/IconButton";
import { EditRounded } from "@mui/icons-material";
import React, { ReactElement, useState } from "react";
import { enqueueSnackbar } from "notistack";
import Divider from "@mui/material/Divider";

function ProductPage() : ReactElement{
  const params = useParams()
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth.user);
  const { data } = useGetProductQuery(params.id!);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updateProduct] = useUpdateProductMutation()

  if (data == undefined) return (<></>);

  const editable = user && user.id === data.sellerId;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (data == undefined) return null;
    const res = await updateProduct([data.id, formData])

    if ('error' in res) {
      const error = res.error as ApiError;
      enqueueSnackbar(error.data.message, { variant: 'error'})
      return
    }

    enqueueSnackbar('Product updated', { variant: 'success'})
    setIsEditing(false)
  }

  return (
    <>
      <Paper sx={styles.paper}>
        {editable && !isEditing ?
          <IconButton
            sx={{
              position: 'absolute',
              right: 2,
              top: 2,
              border: '2px solid',
              zIndex: 10,
            }}
            onClick={()=> setIsEditing(true)}
          >
            <EditRounded/>
          </IconButton>
          : null
        }
        <ImageCarousel images={data.images} title={data.name}/>
        {
          isEditing ?
            <>
              <Box component='form' encType='multipart/form-data' onSubmit={handleSubmit}  sx={styles.form}>
                <TextField name='name' defaultValue={data.name} id="standard-basic" label="Name" variant="standard" required/>
                <TextField
                  name='price'
                  label="Price"
                  id="standard-start-adornment"
                  InputProps={{
                    endAdornment: <InputAdornment position="start">USD</InputAdornment>,
                  }}
                  inputProps={{
                    step: 0.01
                  }}
                  defaultValue={data.price}
                  variant="standard"
                  type='number'
                  required
                />
                <TextField name='description' defaultValue={data.description} label="Description" variant="standard" required multiline/>
                <Button variant='contained' color='success' type='submit'>
                  Save
                </Button>
                <Button variant='contained' onClick={()=> setIsEditing(false)} color='error'>
                  Cancel
                </Button>
              </Box>
            </>
            :
            <>
              <Typography variant='h5'>
                {data.name}
              </Typography>
              <Typography variant='h6'>
                USD {USDollar.format(data.price)}
              </Typography>
              <Button variant='contained'>
                Buy now
              </Button>
              <Button variant='contained' onClick={()=> dispatch(addProduct(data))}>
                Add to cart
              </Button>
              <Box>
                <Typography variant='h6'>
                  Description
                </Typography>
                <Divider/>
                <Typography variant='body1' sx={{marginTop: 1}}>
                  {data.description}
                </Typography>
              </Box>
            </>
        }
      </Paper>
      <Typography variant='h6'>
        Related
      </Typography>
      <Container sx={styles.relatedContainer}>
          <Grid container spacing={{ xs: 2 }} columns={{ xs: 12 }} wrap='nowrap' sx={styles.relatedBox}>
            {
              data.related!.map((product: Product, i: number) => (
                <Grid item key={i} sx={{width: 400}}>
                  <ProductCard data={product}/>
                </Grid>
              ))
            }
          </Grid>
      </Container>
    </>
  );
}

const styles: {[key: string]: SxProps<Theme>} = {
  paper: () => ({
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    gap: 2,
    padding: 2,
  }),
  form: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    gap: 2,
  },
  relatedContainer: () => ({
    overflowX: 'scroll',
  }),
  relatedBox: () => ({
    minWidth: 'fit-content',
    padding: '10px 0px'
  })
}
export default ProductPage;
