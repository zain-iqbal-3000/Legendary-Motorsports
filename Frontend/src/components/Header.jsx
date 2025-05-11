import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  AccountCircle,
  Settings,
  Garage,
  History,
  Logout,
  LoginOutlined,
  PersonAddOutlined
} from '@mui/icons-material';
import { motion, useAnimation } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const isMobile = useMediaQuery('(max-width:768px)');
  const headerControls = useAnimation();

  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Cars', path: '/#cars' },
    { name: 'About', path: '/aboutus' },
    { name: 'Services', path: '/services' },
    { name: 'Book Now', path: '/#booking' },
    { name: 'Testimonials', path: '/#testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 100);

      // Update active section based on scroll position
      if (location.pathname === '/') {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
          const sectionTop = section.offsetTop - 100;
          const sectionHeight = section.clientHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(section.id);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Animation for header
  useEffect(() => {
    headerControls.start({
      backgroundColor: scrolled ? 'rgba(57, 0, 153, 0.95)' : 'rgba(57, 0, 153, 0)',
      boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.15)' : 'none',
      height: scrolled ? 80 : 90,
      transition: { duration: 0.3 }
    });
  }, [scrolled, headerControls]);

  // Determine if a nav link is active
  const isActive = (path) => {
    if (path.startsWith('/#')) {
      const id = path.substring(2);
      return location.pathname === '/' && activeSection === id;
    }
    return location.pathname === path;
  };

  const navigateTo = (path) => {
    setDrawerOpen(false);
    
    if (path.startsWith('/#')) {
      const id = path.substring(2);
      if (location.pathname === '/') {
        // If already on homepage, just scroll to section
        const element = document.getElementById(id);
        if (element) {
          const offsetPosition = element.offsetTop - 80;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      } else {
        // Navigate to homepage then scroll to section
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            const offsetPosition = element.offsetTop - 80;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    } else {
      navigate(path);
    }
  };

  const handleOpenProfileMenu = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setProfileAnchorEl(null);
  };

  const handleProfileAction = (action) => {
    handleCloseProfileMenu();
    
    switch (action) {
      case 'profile':
        navigate('/settings');
        break;
      case 'bookings':
        navigate('/booking-history');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        dispatch(logout());  // Fix: Use dispatch to trigger logout
        navigate('/');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <AppBar 
          position="fixed" 
          component={motion.div}
          animate={headerControls}
          elevation={0}
          sx={{ 
            bgcolor: 'transparent',
            zIndex: 1100
          }}
        >
          <Container maxWidth="xl">
            <Toolbar 
              disableGutters
              sx={{ 
                height: { xs: 70, md: 90 }, 
                px: { xs: 2, sm: 4 },
                justifyContent: 'space-between',
                transition: 'height 0.3s ease'
              }}
            >
              {/* Logo */}
              <Typography 
                variant="h4" 
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                sx={{ 
                  fontWeight: 800, 
                  letterSpacing: { xs: 0, md: 1 },
                  fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
                  color: 'primary.main',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
                onClick={() => navigateTo('/')}
              >
                LEGENDARY MOTORSPORTS
              </Typography>

              {/* Desktop Navigation */}
              {!isMobile && (
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    ml: 'auto',
                    mr: { sm: 0, md: 2 }
                  }}
                >
                  <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1
                  }}>
                    {navLinks.map((link) => (
                      <Button
                        key={link.path}
                        onClick={() => navigateTo(link.path)}
                        sx={{
                          mx: { sm: 0.8, md: 1.2, lg: 2 },
                          py: 1,
                          position: 'relative',
                          color: 'text.primary',
                          fontWeight: 500,
                          fontSize: { sm: '0.8rem', md: '0.9rem' },
                          letterSpacing: 0.5,
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -2,
                            left: 0,
                            width: isActive(link.path) ? '100%' : 0,
                            height: 2,
                            bgcolor: 'primary.main',
                            transition: 'all 0.3s ease'
                          },
                          '&:hover::after': {
                            width: '100%'
                          },
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            color: '#ffbd00'
                          }
                        }}
                      >
                        {link.name}
                      </Button>
                    ))}
                  </Box>

                  {/* Authentication Buttons or Profile Avatar - with better spacing */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    ml: { sm: 2, md: 4 },
                    pl: 2,
                    height: '100%',
                    position: 'relative',
                    '&::before': user ? {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '25%',
                      bottom: '25%',
                      width: 1,
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                    } : {}
                  }}>
                    {user ? (
                      <>
                        <IconButton 
                          onClick={handleOpenProfileMenu}
                          size="large"
                          sx={{ 
                            ml: { sm: 1, md: 2 },
                            color: 'white',
                            border: '2px solid rgba(255, 189, 0, 0.7)',
                            transition: 'all 0.2s ease',
                            p: 1.2,
                            '&:hover': {
                              bgcolor: 'rgba(255, 189, 0, 0.2)',
                              transform: 'scale(1.05)'
                            }
                          }}
                        >
                          {user.photoURL ? (
                            <Avatar 
                              src={user.photoURL}
                              alt={user.displayName || 'User'}
                              sx={{ width: 36, height: 36 }}
                            />
                          ) : (
                            <AccountCircle sx={{ width: 36, height: 36 }} />
                          )}
                        </IconButton>
                        <Menu
                          anchorEl={profileAnchorEl}
                          open={Boolean(profileAnchorEl)}
                          onClose={handleCloseProfileMenu}
                          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                          PaperProps={{
                            sx: {
                              mt: 2,
                              width: 240,
                              bgcolor: 'rgba(33, 33, 33, 0.95)',
                              border: '1px solid rgba(255, 189, 0, 0.2)',
                              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                              '& .MuiDivider-root': {
                                borderColor: 'rgba(255, 255, 255, 0.1)'
                              },
                              borderRadius: 2,
                              overflow: 'hidden'
                            }
                          }}
                        >
                          <Box sx={{ px: 3, py: 2 }}>
                            <Typography variant="body1" sx={{ fontWeight: 600, color: '#fff' }}>
                              {user.displayName || 'User'}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
                              {user.email}
                            </Typography>
                          </Box>
                          <Divider />
                          <MenuItem 
                            onClick={() => handleProfileAction('profile')} 
                            sx={{ 
                              py: 1.8,
                              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' }
                            }}
                          >
                            <AccountCircle sx={{ mr: 2, fontSize: 22, color: '#ffbd00' }} />
                            <Typography variant="body2">My Profile</Typography>
                          </MenuItem>
                          <MenuItem 
                            onClick={() => handleProfileAction('bookings')}
                            sx={{ 
                              py: 1.8,
                              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' }
                            }}
                          >
                            <Garage sx={{ mr: 2, fontSize: 22, color: '#ffbd00' }} />
                            <Typography variant="body2">My Rentals</Typography>
                          </MenuItem>
                          <MenuItem 
                            onClick={() => handleProfileAction('settings')}
                            sx={{ 
                              py: 1.8,
                              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' }
                            }}
                          >
                            <Settings sx={{ mr: 2, fontSize: 22, color: '#ffbd00' }} />
                            <Typography variant="body2">Account Settings</Typography>
                          </MenuItem>
                          <Divider />
                          <MenuItem 
                            onClick={() => handleProfileAction('logout')}
                            sx={{ 
                              py: 1.8,
                              color: 'error.main',
                              '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.08)' }
                            }}
                          >
                            <Logout sx={{ mr: 2, fontSize: 22 }} />
                            <Typography variant="body2">Sign Out</Typography>
                          </MenuItem>
                        </Menu>
                      </>
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                        <Button
                          variant="outlined"
                          onClick={() => navigate('/login')}
                          startIcon={<LoginOutlined />}
                          sx={{
                            px: { sm: 2, md: 2.5, lg: 3 }, // More adaptive padding
                            py: 1, // Slightly reduced to avoid excessive height
                            minWidth: { sm: '100px', md: '110px' }, // Ensure minimum width
                            whiteSpace: 'nowrap', // Prevent text wrapping
                            color: 'white',
                            borderColor: 'rgba(255, 189, 0, 0.6)',
                            borderWidth: 1.5,
                            fontWeight: 600,
                            letterSpacing: 0.5,
                            fontSize: '0.9rem',
                            borderRadius: '30px',
                            textTransform: 'none',
                            '&:hover': {
                              borderColor: '#ffbd00',
                              bgcolor: 'rgba(255, 189, 0, 0.08)',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 12px rgba(255, 189, 0, 0.2)'
                            },
                            '& .MuiButton-startIcon': {
                              mr: 0.8
                            },
                            transition: 'all 0.25s ease'
                          }}
                        >
                          Log In
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => navigate('/signup')}
                          startIcon={<PersonAddOutlined />}
                          sx={{
                            px: { sm: 2, md: 2.5, lg: 3 }, // More adaptive padding
                            py: 1, // Slightly reduced to avoid excessive height
                            minWidth: { sm: '100px', md: '110px' }, // Ensure minimum width
                            whiteSpace: 'nowrap', // Prevent text wrapping
                            bgcolor: 'primary.main',
                            color: '#390099',
                            fontWeight: 600,
                            letterSpacing: 0.5,
                            fontSize: '0.9rem',
                            borderRadius: '30px',
                            textTransform: 'none',
                            boxShadow: '0 4px 14px rgba(255, 189, 0, 0.3)',
                            '&:hover': {
                              bgcolor: '#ffca28',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 6px 20px rgba(255, 189, 0, 0.4)'
                            },
                            '& .MuiButton-startIcon': {
                              mr: 0.8
                            },
                            transition: 'all 0.25s ease'
                          }}
                        >
                          Sign Up
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Box>
              )}

              {/* Mobile Menu Toggle - with improved spacing */}
              {isMobile && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {user && (
                    <IconButton 
                      onClick={handleOpenProfileMenu}
                      size="medium"
                      sx={{ 
                        mr: 2,
                        color: 'white',
                        border: '1.5px solid rgba(255, 189, 0, 0.7)',
                        p: 0.8
                      }}
                    >
                      {user.photoURL ? (
                        <Avatar 
                          src={user.photoURL}
                          alt={user.displayName || 'User'}
                          sx={{ width: 28, height: 28 }}
                        />
                      ) : (
                        <AccountCircle sx={{ width: 28, height: 28 }} />
                      )}
                    </IconButton>
                  )}
                  <IconButton 
                    edge="end" 
                    color="inherit" 
                    aria-label="menu"
                    onClick={() => setDrawerOpen(true)}
                    sx={{ p: 1 }}
                  >
                    <MenuIcon sx={{ fontSize: 28 }} />
                  </IconButton>
                  <Menu
                    anchorEl={profileAnchorEl}
                    open={Boolean(profileAnchorEl)}
                    onClose={handleCloseProfileMenu}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    PaperProps={{
                      sx: {
                        mt: 1.5,
                        width: 220,
                        bgcolor: 'rgba(33, 33, 33, 0.95)',
                        border: '1px solid rgba(255, 189, 0, 0.2)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                        borderRadius: 2
                      }
                    }}
                  >
                    <Box sx={{ px: 2, py: 2 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: '#fff' }}>
                        {user?.displayName || 'User'}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
                        {user?.email}
                      </Typography>
                    </Box>
                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                    <MenuItem 
                      onClick={() => handleProfileAction('profile')} 
                      sx={{ py: 1.5, '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' } }}
                    >
                      <AccountCircle sx={{ mr: 2, fontSize: 20, color: '#ffbd00' }} />
                      <Typography variant="body2">My Profile</Typography>
                    </MenuItem>
                    <MenuItem 
                      onClick={() => handleProfileAction('bookings')} 
                      sx={{ py: 1.5, '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' } }}
                    >
                      <History sx={{ mr: 2, fontSize: 20, color: '#ffbd00' }} />
                      <Typography variant="body2">My Rentals</Typography>
                    </MenuItem>
                    <MenuItem 
                      onClick={() => handleProfileAction('settings')} 
                      sx={{ py: 1.5, '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' } }}
                    >
                      <Settings sx={{ mr: 2, fontSize: 20, color: '#ffbd00' }} />
                      <Typography variant="body2">Account Settings</Typography>
                    </MenuItem>
                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                    <MenuItem 
                      onClick={() => handleProfileAction('logout')}
                      sx={{ 
                        py: 1.5,
                        color: 'error.main',
                        '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.08)' }
                      }}
                    >
                      <Logout sx={{ mr: 2, fontSize: 20 }} />
                      <Typography variant="body2">Sign Out</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </motion.div>

      {/* Mobile Navigation Drawer - Improved spacing & style */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '80%',
            maxWidth: 320,
            backgroundColor: 'rgba(33, 33, 33, 0.98)',
            boxShadow: '-5px 0 30px rgba(0, 0, 0, 0.5)',
            borderLeft: '1px solid rgba(255, 189, 0, 0.2)'
          }
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          p: 3
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700, 
              color: 'primary.main',
              letterSpacing: 1
            }}
          >
            MENU
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        {/* User info in drawer for mobile */}
        {user ? (
          <Box sx={{ 
            px: 3, 
            py: 3, 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            bgcolor: 'rgba(255, 255, 255, 0.03)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {user.photoURL ? (
                <Avatar 
                  src={user.photoURL} 
                  alt={user.displayName || 'User'} 
                  sx={{ width: 48, height: 48, mr: 2, border: '2px solid rgba(255, 189, 0, 0.7)' }}
                />
              ) : (
                <Avatar sx={{ 
                  width: 48, 
                  height: 48, 
                  mr: 2, 
                  bgcolor: 'rgba(255, 189, 0, 0.9)',
                  color: '#390099',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  border: '2px solid rgba(255, 189, 0, 0.3)'
                }}>
                  {(user.displayName || 'U').charAt(0).toUpperCase()}
                </Avatar>
              )}
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600, color: 'white' }}>
                  {user.displayName || 'User'}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.75rem' }}>
                  {user.email}
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={{ 
            px: 3, 
            py: 3, 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            bgcolor: 'rgba(255, 255, 255, 0.03)',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' }, // Column on extra small, row on small+
            gap: 2
          }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<LoginOutlined />}
              onClick={() => { setDrawerOpen(false); navigate('/login'); }}
              sx={{
                py: 1,
                height: 42, // Fixed height to avoid differences
                whiteSpace: 'nowrap', // Prevent text wrapping
                color: 'white',
                borderColor: 'rgba(255, 189, 0, 0.6)',
                borderWidth: 1.5,
                fontWeight: 600,
                letterSpacing: 0.5,
                fontSize: '0.9rem',
                borderRadius: '30px',
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#ffbd00',
                  bgcolor: 'rgba(255, 189, 0, 0.08)'
                },
                '& .MuiButton-startIcon': {
                  mr: 0.8
                }
              }}
            >
              Log In
            </Button>
            <Button
              fullWidth
              variant="contained"
              startIcon={<PersonAddOutlined />}
              onClick={() => { setDrawerOpen(false); navigate('/signup'); }}
              sx={{
                py: 1,
                height: 42, // Fixed height to avoid differences
                whiteSpace: 'nowrap', // Prevent text wrapping
                bgcolor: 'primary.main',
                color: '#390099',
                fontWeight: 600,
                letterSpacing: 0.5,
                fontSize: '0.9rem',
                borderRadius: '30px',
                textTransform: 'none',
                boxShadow: '0 4px 14px rgba(255, 189, 0, 0.25)',
                '&:hover': {
                  bgcolor: '#ffca28',
                  boxShadow: '0 6px 20px rgba(255, 189, 0, 0.35)'
                },
                '& .MuiButton-startIcon': {
                  mr: 0.8
                }
              }}
            >
              Sign Up
            </Button>
          </Box>
        )}
        
        <List sx={{ py: 2 }}>
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <ListItem 
                button 
                key={link.path} 
                onClick={() => navigateTo(link.path)}
                sx={{
                  py: 2,
                  px: 3,
                  my: 0.5,
                  borderLeft: active ? '4px solid #ffbd00' : 'none',
                  bgcolor: active ? 'rgba(255, 189, 0, 0.1)' : 'transparent',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                  }
                }}
              >
                <ListItemText 
                  primary={link.name} 
                  sx={{ 
                    ml: active ? 1 : 2,
                    transition: 'margin 0.2s ease',
                    '& .MuiTypography-root': {
                      fontWeight: active ? 600 : 500,
                      color: active ? 'primary.main' : 'white'
                    }
                  }}
                />
              </ListItem>
            );
          })}
          
          {/* User account options in drawer for mobile */}
          {user && (
            <>
              <Box sx={{ px: 3, pt: 3, pb: 1 }}>
                <Typography variant="overline" sx={{ color: 'rgba(255, 255, 255, 0.7)', letterSpacing: 1 }}>
                  ACCOUNT
                </Typography>
              </Box>
              <ListItem 
                button 
                onClick={() => { setDrawerOpen(false); handleProfileAction('profile'); }}
                sx={{ py: 2, px: 3 }}
              >
                <AccountCircle sx={{ mr: 3, color: '#ffbd00' }} />
                <ListItemText primary="My Profile" />
              </ListItem>
              <ListItem 
                button 
                onClick={() => { setDrawerOpen(false); handleProfileAction('bookings'); }}
                sx={{ py: 2, px: 3 }}
              >
                <Garage sx={{ mr: 3, color: '#ffbd00' }} />
                <ListItemText primary="My Rentals" />
              </ListItem>
              <ListItem 
                button 
                onClick={() => { setDrawerOpen(false); handleProfileAction('settings'); }}
                sx={{ py: 2, px: 3 }}
              >
                <Settings sx={{ mr: 3, color: '#ffbd00' }} />
                <ListItemText primary="Account Settings" />
              </ListItem>
              <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
              <ListItem 
                button 
                onClick={() => { setDrawerOpen(false); handleProfileAction('logout'); }}
                sx={{ 
                  py: 2,
                  px: 3,
                  color: 'error.light',
                  '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.1)' }
                }}
              >
                <Logout sx={{ mr: 3 }} />
                <ListItemText primary="Sign Out" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Header;