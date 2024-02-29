import { Avatar, Box, Paper, SxProps, Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { ArrowForwardIosRounded, PermIdentityRounded, SecurityRounded } from "@mui/icons-material";

const paths = [
  {
    title: 'Personal Information',
    path: '/settings/info',
    icon: <PermIdentityRounded/>
  },
  {
    title: 'Security',
    path: '/settings/info',
    icon: <SecurityRounded/>
  }
]

function ProfilePage() {
  return (
    <>
      <Paper sx={styles.paper}>
        <Avatar sx={{width: 100, height: 100}}/>
        <Typography variant='h4'>
          John Doe
        </Typography>
      </Paper>
      {
        paths.map((item) => (
          <Paper sx={styles.paper}>
            <Box sx={styles.box}>
              {item.icon}
              <Typography variant='h6'>
                {item.title}
              </Typography>
              <ArrowForwardIosRounded sx={styles.arrowIcon}/>
            </Box>
          </Paper>
        ))
      }
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
  box: {
    display: 'flex',
    gap: 2,
    alignItems: 'center'
  },
  arrowIcon: () => ({
    justifySelf: 'end'
  })
}

export default ProfilePage;