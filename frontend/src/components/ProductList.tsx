import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import { ProductListProps } from "./types/ProductList";
import { ReactElement } from "react";

function ProductList({list}: ProductListProps): ReactElement {
  return (
    <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 2, sm: 8, md: 12 }}>
      {
        list !== undefined ? list.map((product, i) =>
          <Grid item xs={2} sm={4} md={4} key={i}>
            <ProductCard data={product}/>
            </Grid>
            ) :
          [{},{},{}].map((product, i) => (
            <Grid item xs={2} sm={4} md={4} key={i}>
              <ProductCard data={product}/>
            </Grid>
          ))
      }
    </Grid>
  );
}

export default ProductList;