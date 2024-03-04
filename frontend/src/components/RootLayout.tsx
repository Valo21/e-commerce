import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { Avatar, Box, Button, Tooltip } from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Outlet, useNavigate } from "react-router-dom";

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Container } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import CartTooltip from "./CartTooltip";
import { ExploreRounded } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { switchTheme } from "@store/slices/themeSlice";
import ThemeSwitch from "@components/ThemeSwitch";

const items = [
  {
    title: 'Explore',
    icon: <ExploreRounded />,
    path: '/'
  },
  {
    title: 'My Products',
    icon: <ExploreRounded />,
    path: '/my-products',
    authorized: true
  }
]

function AppNavbar(): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const { darkMode } = useAppSelector(state => state.theme);
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleTooltipClick = () => {
    setTooltipOpen(!tooltipOpen);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if(e.key == 'Enter'){
        navigate('/search?q='+ e.currentTarget.value);
      }
  }

  function handleThemeSwitch(event: React.ChangeEvent<HTMLInputElement>) {
    event.stopPropagation();
    dispatch(switchTheme());
  }

  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation" onClick={toggleDrawer(false)}>
      <Box display='flex' padding='20px' flexDirection='column' alignItems='start'>
        { user ?
          <>
              <IconButton onClick={() => navigate('profile')}>
                <Avatar/>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                sx={{
                  position: 'absolute',
                  right: '25px',
                }}
                onClick={() => navigate('settings')}
              >
                  <SettingsIcon/>
              </IconButton>
              <Typography variant='h5'>{user.givenName} {user.familyName}</Typography>
          </>
          : <>
            <Button variant='contained' onClick={()=> navigate('/auth')}>Join</Button>
          </>
        }
      </Box>
      <Divider />
      <List>
        {items.map((item) => (
          ((item.authorized && user) || (!item.authorized)) ?
          <ListItem key={item.title} disablePadding onClick={() => navigate(item.path)}>
            <ListItemButton>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
            : null
        ))}
      </List>
      <ThemeSwitch onChange={handleThemeSwitch} checked={darkMode} onClick={(e)=>e.stopPropagation()}/>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{
        boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px',
        alignItems: 'center',
        backdropFilter: 'blur(10px)'
      }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={(theme) =>({
              mr: 2,
              [theme.breakpoints.up('sm')]: {
                display: 'none'
              },
            })}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={(theme) =>({
              flexGrow: 1,
              [theme.breakpoints.down('sm')]: {
                display: 'none'
              },
            })}
          >
            ECommerce
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onKeyDown={handleEnter}
            />
          </Search>
          <Box sx={(theme) =>({
            display: 'flex',
            margin: '0px 10px',
            [theme.breakpoints.down('sm')]: {
              display: 'none'
            },
          })}>
            {items.map((item) => (
              ((item.authorized && user) || (!item.authorized)) ?
              <ListItem key={item.title} disablePadding onClick={() => navigate(item.path)}>
                <ListItemButton>
                  <ListItemText sx={{textWrap: 'nowrap'}} primary={item.title} />
                </ListItemButton>
              </ListItem> : null
            ))}
          </Box>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClick}
            open={tooltipOpen}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={<CartTooltip/>}
          >
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="open drawer"
              onClick={handleTooltipClick}
            >
              <ShoppingCartIcon/>
            </IconButton>
          </Tooltip>
          {
            !user ? <Button variant='contained' color='secondary' onClick={()=> navigate('/auth')} sx={(theme) =>({
              ml: 3,
              [theme.breakpoints.down('sm')]: {
                display: 'none'
              },
            })}>Join</Button> : null
          }
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer(false)} transitionDuration={500}>
        {DrawerList}
      </Drawer>
      <ThemeSwitch onChange={handleThemeSwitch} checked={darkMode} sx={(theme) => ({[theme.breakpoints.down('sm')] : {
        display: 'none'
        }})}/>
    </>
  )
}

function RootLayout() : React.ReactElement {
  return (
    <>
      <AppNavbar/>
      <Toolbar/>
      <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        gap: 2
      }}>
        <Outlet/>
      </Container>
    </>
  );
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default RootLayout;