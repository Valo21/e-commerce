import { ReactElement } from "react";
import Carousel from "react-material-ui-carousel";
import { Box, CardMedia } from "@mui/material";

function ImageCarousel({ images, title }: ImageCarouselProps): ReactElement {

  return (
    <Carousel animation='slide' sx={{ height: 480 }}>
      {
        images.map((image, i) =>
          <Box key={i}>
            <CardMedia
              sx={{ aspectRatio: 'auto', height: 480, backgroundSize: 'contain' }}
              image={`/uploads/${image}`}
              title={title}
            />
          </Box>
        )
      }
    </Carousel>
  )
}

export default ImageCarousel;
