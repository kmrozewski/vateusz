import React from 'react';
import t from '../../assets/translations';
import {useNavigate} from 'react-router-dom';
import {format} from 'date-fns';
import {useAuthenticator} from '@aws-amplify/ui-react';
import {useCognitoGroup} from '../../hooks/useCognitoGroup';
import MenuIcon from '@mui/icons-material/Menu';
import './NavigationBar.scss';
import {AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography} from '@mui/material';
import ThemeSwitch from '../switch/ThemeSwitch';
import {Pages} from '../../resources/Pages';

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const {user, signOut} = useAuthenticator();
  const now = new Date();
  const year = format(now, 'yyyy');
  const month = format(now, 'MM');
  const [isUser] = useCognitoGroup();
  const invoicesPage = isUser ? Pages.InvoicesRoot : Pages.AdminRoot;

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = () => {
    handleCloseUserMenu();
    signOut();
  };

  const handleNavigation = (path: string) => {
    handleCloseNavMenu();
    navigate(path);
  };

  const items = [
    isUser && {key: 'upload', path: Pages.Home, label: t.navigation.pages.upload},
    {key: 'invoices', path: `${invoicesPage}/${year}/${month}`, label: t.navigation.pages.invoices},
    {key: 'calculator', path: Pages.Calculator, label: t.navigation.pages.calculator},
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            sx={{
              display: {xs: 'none', md: 'flex'},
              mr: 2,
            }}>
            {t.navigation.bar.title}
          </Typography>

          <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {xs: 'block', md: 'none'},
              }}>
              {items.map(
                item =>
                  item && (
                    <MenuItem key={item.key} onClick={() => handleNavigation(item.path)}>
                      <Typography textAlign="center">{item.label}</Typography>
                    </MenuItem>
                  )
              )}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: {xs: 'flex', md: 'none'},
              flexGrow: 1,
            }}>
            {t.navigation.bar.title}
          </Typography>
          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {items.map(
              item =>
                item && (
                  <Button key={item.key} onClick={() => handleNavigation(item.path)} sx={{my: 2, color: 'white', display: 'block'}}>
                    {item.label}
                  </Button>
                )
            )}
          </Box>

          <Box sx={{flexGrow: 0}}>
            <ThemeSwitch />
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                <Avatar alt="User avatar" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{mt: '45px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              <MenuItem key="account" onClick={handleSignOut} sx={{display: 'block'}}>
                <Typography mb={1}>{user?.attributes?.name ?? t.auth.userName}</Typography>
                <Typography>{t.auth.signOut}</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;
