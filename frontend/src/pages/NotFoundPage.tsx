import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { ReactElement } from "react";

function NotFoundPage(): ReactElement {
  return (
    <>
      <Box display='flex' justifyContent='center' alignItems='center' height='100vh' flexDirection='column'>
        <Typography variant='h4'>
          404 - Not Found
        </Typography>
        <Link to='/'>
          <Typography variant='h6'>
            Go back
          </Typography>
        </Link>
      </Box>
    </>
  );
}

export default NotFoundPage;