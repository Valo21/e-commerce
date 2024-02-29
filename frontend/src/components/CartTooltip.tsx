import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import ProductItem from "./ProductItem";
import List from "@mui/material/List";
import { useAppSelector } from "@hooks/redux";
import { ReactElement } from "react";
import { CartItem } from "@components/types/ProductItem";

function CartTooltip() : ReactElement {
  const products = useAppSelector(state => state.cart.products);

  return (
    <Box>
      <Typography variant='h6' justifyContent='end' display='flex'>
        Cart
      </Typography>
        <List>
          {
            Object.entries(products).map((item, i) => <ProductItem key={i} data={item[1] as CartItem}/>)
          }
        </List>
      <Box display='flex' justifyContent='end' mb={2}>
        <Button variant='contained'>
          Buy
        </Button>
      </Box>
    </Box>
  );
}

export default CartTooltip;