import { Box, Card, CardActions, CardContent, CardMedia, Skeleton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ReactElement } from "react";
import { ProductCardProps } from "./types/ProductCard";
import { USDollar } from "@lib/utils";

function ProductCard({ data }: ProductCardProps) : ReactElement {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345, minWidth: '100%', height: '100%' }} onClick={() => navigate('/products/' + data.id)}>
      {
        Object.keys(data).length ?
          <>
            <CardMedia
              sx={{ height: 200 }}
              image={`/uploads/${data.images[0]}`}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {data.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                USD {USDollar.format(data.price)}
              </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
          </>
        :
        <>
          <Skeleton height={140}/>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <Skeleton width={315}/>
            </Typography>
            <Typography variant="body2" color="text.secondary" key='h1'>
              <Skeleton width={315}/>
            </Typography>
            <Box sx={{display: 'flex'}}>
              <Typography variant="body2" color="text.secondary" key='h1'>
                <Skeleton width={80}/>
              </Typography>
            </Box>
          </CardContent>
        </>
      }
    </Card>
  );
}

export default ProductCard;
