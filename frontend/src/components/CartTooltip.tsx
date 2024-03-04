import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import ProductItem from "./ProductItem";
import List from "@mui/material/List";
import { useAppSelector } from "@hooks/redux";
import { ReactElement } from "react";
import { CartItem } from "@components/types/ProductItem";

function CartTooltip() : ReactElement {
  const array = useAppSelector(state => state.cart.products);
  const products = Object.values(array);

  return (
    <Box>
      <Typography variant='h6' justifyContent='end' display='flex'>
        Cart
      </Typography>
        <List>
          {
            products.map((item, i) => <ProductItem key={i} data={item as CartItem}/>)
          }
        </List>
      <Typography variant='h6' justifyContent='end' display='flex'>
        Total: USD {products.reduce((sum, current) => sum + current.price * current.amount, 0).toFixed(2)}
      </Typography>
      <Box display='flex' justifyContent='end' mb={2}>
        <Button variant='contained'>
          Buy
        </Button>
      </Box>
    </Box>
  );
}

export default CartTooltip;