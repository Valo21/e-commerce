import { ReactElement } from "react";
import Carousel from "react-material-ui-carousel";
import { Box, CardMedia } from "@mui/material";

function ImageCarousel({images}: ImageCarouselProps) : ReactElement {

  return (
    <Carousel>
      {
        images.map( (image, i) =>
          <Box key={i}>
            <CardMedia
              sx={{ aspectRatio: 'auto', height: 400 }}
              image={`http://localhost:3000/uploads/${image}`}
              title="green iguana"
            />
          </Box>
        )
      }
    </Carousel>
  )
}

export default ImageCarousel;