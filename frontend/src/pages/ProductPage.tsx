import { Button, Container, Grid, Paper, SxProps, Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import ProductCard from "@components/ProductCard";
import { useLocation } from "react-router-dom";
import { useGetProductQuery } from "@store/api/productsApi";
import { useAppDispatch } from "@hooks/redux";
import { addProduct } from "@store/slices/cartSlice";
import ImageCarousel from "@components/ImageCarousel";

function ProductPage() {
  const { state } = useLocation()
  const { data } = useGetProductQuery(state.productId);
  const dispatch = useAppDispatch()

  if (data == undefined) return (<></>);

  return (
    <>
      <Paper sx={styles.paper}>
        <ImageCarousel images={[data.picture]}/>
        <Typography variant='h5'>
          {data.name}
        </Typography>
        <Typography variant='h6'>
          {data.price}
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
          <Grid container spacing={{ xs: 2 }} columns={{ xs: 12 }}>
            <Grid item xs={4}>
              <ProductCard data={{}}/>
            </Grid>
            <Grid item xs={4}>
              <ProductCard data={{}}/>
            </Grid>
          </Grid>
      </Container>
    </>
  );
}

const styles: {[key: string]: SxProps<Theme>} = {
  paper: () => ({
    display: 'flex',
    padding: 2,
    flexDirection: 'column',
    gap: 2,
  }),
  relatedContainer: () => ({
    overflowX: 'scroll'
  }),
  relatedBox: () => ({
    width: 'fit-content !important',
  })
}
export default ProductPage;