import { Box, CardMedia, ListItemAvatar } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useAppDispatch } from "@hooks/redux";
import { addProduct, removeProduct } from "@store/slices/cartSlice";
import { ReactElement } from "react";
import { ProductItemProps } from "./types/ProductItem";

function ProductItem({data}: ProductItemProps) : ReactElement {
  const dispatch = useAppDispatch()

  return (
    <Box display='flex' gap={2}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <CardMedia
            sx={{ height: 50 }}
            image={`http://localhost:3000/uploads/${data.picture}`}
            title="green iguana"
          />
        </ListItemAvatar>
        <ListItemText
          primary={data.name}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {data.price}
              </Typography>
            </>
          }
        />
        <Box>
          <IconButton onClick={()=> dispatch(addProduct(data))}>
            <AddIcon/>
          </IconButton>
          <IconButton onClick={()=> dispatch(removeProduct(data))}>
            <RemoveIcon/>
          </IconButton>
        </Box>
        <Typography
          sx={{ display: 'inline' }}
          component="span"
          variant="body1"
          color="text.primary"
          alignSelf='center'
        >
          {data.amount}
        </Typography>
      </ListItem>
    </Box>
  );
}

export default ProductItem;