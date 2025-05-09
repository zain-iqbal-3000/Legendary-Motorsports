import { useState, useEffect } from 'react';
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
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { motion, useAnimation } from 'framer-motion';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const isMobile = useMediaQuery('(max-width:768px)');
  const headerControls = useAnimation();

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
          <Container>
            <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0, sm: 2 } }}>
              <Typography 
                variant="h4" 
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                sx={{ 
                  fontWeight: 800, 
                  letterSpacing: 1,
                  color: 'primary.main',
                  cursor: 'pointer'
                }}
                onClick={() => navigateTo('/')}
              >
                LEGENDARY MOTORSPORTS
              </Typography>

              {/* Desktop Navigation */}
              {!isMobile && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {navLinks.map((link) => (
                    <Button
                      key={link.path}
                      onClick={() => navigateTo(link.path)}
                      sx={{
                        mx: 2,
                        position: 'relative',
                        color: 'text.primary',
                        fontWeight: 500,
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: -5,
                          left: 0,
                          width: isActive(link.path) ? '100%' : 0,
                          height: 2,
                          bgcolor: 'primary.main',
                          transition: 'all 0.3s ease'
                        },
                        '&:hover::after': {
                          width: '100%'
                        }
                      }}
                    >
                      {link.name}
                    </Button>
                  ))}
                </Box>
              )}

              {/* Mobile Menu Toggle */}
              {isMobile && (
                <IconButton 
                  edge="end" 
                  color="inherit" 
                  aria-label="menu"
                  onClick={() => setDrawerOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </motion.div>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '70%',
            maxWidth: 300,
            backgroundColor: 'background.default',
            boxShadow: '-5px 0 30px rgba(0, 0, 0, 0.3)'
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <ListItem 
                button 
                key={link.path} 
                onClick={() => navigateTo(link.path)}
                sx={{
                  py: 2,
                  borderLeft: active ? '3px solid' : 'none',
                  borderColor: 'primary.main',
                  bgcolor: active ? 'rgba(255, 189, 0, 0.08)' : 'transparent'
                }}
              >
                <ListItemText 
                  primary={link.name} 
                  sx={{ 
                    textAlign: 'center',
                    '& .MuiTypography-root': {
                      fontWeight: 500
                    }
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

export default Header;