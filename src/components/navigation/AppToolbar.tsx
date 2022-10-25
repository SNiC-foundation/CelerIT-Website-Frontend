import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { adminMenuPages, generalPages, userMenuPages } from './MenuItems';
import Authorize from '../../auth/Authorize';
import { AuthContext } from '../../auth/AuthContextProvider';
import AlertContainer from '../../alerts/AlertContainer';

function AppToolbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [anchorElAdmin, setAnchorElAdmin] = React.useState<null | HTMLElement>(null);

  const authContext = React.useContext(AuthContext);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenAdminMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAdmin(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseAdminMenu = () => {
    setAnchorElAdmin(null);
  };

  return (
    <AppBar id="main-menu" position="fixed" enableColorOnDark sx={{ zIndex: 100, top: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              marginRight: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CelerIT
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
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
                display: { xs: 'block', md: 'none' },
              }}
            >
              {generalPages.map((page) => (
                <MenuItem
                  key={page.name}
                  component={Link}
                  to={page.target}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
              <Authorize roles={['Admin']}>
                <MenuItem
                  onClick={handleOpenAdminMenu}
                >
                  <Typography textAlign="center">Admin</Typography>
                </MenuItem>
              </Authorize>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              marginRight: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CelerIT
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {generalPages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{
                  color: 'white', display: 'block', marginY: '13.75px',
                }}
                component={Link}
                to={page.target}
              >
                {page.name}
              </Button>
            ))}
            <Authorize roles={['Admin']}>
              <Button
                sx={{
                  color: 'white', display: 'block', marginY: '13.75px',
                }}
                onClick={handleOpenAdminMenu}
              >
                Admin
              </Button>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-admin-appbar"
                anchorEl={anchorElAdmin}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElAdmin)}
                onClose={handleCloseAdminMenu}
              >
                {adminMenuPages.map((page) => (
                  <MenuItem
                    key={page.name}
                    component={Link}
                    to={page.target}
                    onClick={() => {
                      handleCloseAdminMenu();
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Authorize>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
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
              onClose={handleCloseUserMenu}
            >
              {userMenuPages
                .filter((m) => (m.disabled === undefined || !m.disabled(authContext)))
                .map((page) => (
                  <MenuItem
                    key={page.name}
                    component={Link}
                    to={page.target}
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
        </Toolbar>
        <AlertContainer />
      </Container>
    </AppBar>
  );
}
export default AppToolbar;
