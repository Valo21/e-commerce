import constructionIMG from '@assets/underconstruction.jpg'
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";

function UnderConstruction() {
  return (
    <Container sx={{display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Typography variant='h4'>Under Construction</Typography>
      <img src={constructionIMG} alt='Under construction image'/>
    </Container>
  );
}

export default UnderConstruction;