import { Button, Container, Grid, Paper, SxProps, Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import ProductCard from "@components/ProductCard";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "@store/api/productsApi";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { addProduct } from "@store/slices/cartSlice";
import ImageCarousel from "@components/ImageCarousel";
import { USDollar } from "@lib/utils.ts";
import { Product } from "@backend/products/entities/product.entity.ts";
import IconButton from "@mui/material/IconButton";
import { EditRounded } from "@mui/icons-material";
import { useState } from "react";

function ProductPage() {
  const params = useParams()
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth.user);
  const { data } = useGetProductQuery(params.id!);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (data == undefined) return (<></>);

  const editable = user && user.id === data.sellerId;

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
      </Paper>
      <Typography variant='h6'>
        Related
      </Typography>
      <Container sx={styles.relatedContainer}>
          <Grid container spacing={{ xs: 2 }} columns={{ xs: 12 }} sx={{width: 'fit-content'}} wrap='nowrap' sx={styles.relatedBox}>
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
    padding: 2,
    flexDirection: 'column',
    gap: 2,
  }),
  relatedContainer: () => ({
    overflowX: 'scroll',
}),
  relatedBox: () => ({
    minWidth: 'fit-content',
    padding: '10px 0px'
  })
}
export default ProductPage;