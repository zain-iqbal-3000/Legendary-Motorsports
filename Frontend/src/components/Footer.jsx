import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Link,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  YouTube as YouTubeIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Footer = () => {
  const navigate = useNavigate();

  // Footer links data
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Our Fleet', href: '/#cars' },
    { name: 'About Us', href: '/aboutus' },
    { name: 'Services', href: '/services' },
    { name: 'Book Now', href: '/#booking' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'Contact', href: '/#contact' }
  ];

  const serviceLinks = [
    { name: 'Hypercar Rentals', href: '#' },
    { name: 'Chauffeur Services', href: '#' },
    { name: 'Track Day Experiences', href: '#' },
    { name: 'Custom Road Trips', href: '#' },
    { name: 'Special Event Rentals', href: '#' },
    { name: 'Corporate Packages', href: '#' }
  ];

  const legalLinks = [
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Rental Agreement', href: '#' },
    { name: 'Insurance Policy', href: '#' },
    { name: 'Cancellation Policy', href: '#' },
    { name: 'FAQ', href: '#' }
  ];

  const footerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const footerItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Function to handle navigation
  const navigateTo = (path) => {
    if (path.startsWith('/#')) {
      const id = path.substring(2);
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      navigate(path);
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#212121',
        pt: { xs: 8, md: 10 },
        pb: 4
      }}
    >
      <Container>
        <motion.div
          variants={footerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Grid container spacing={4} sx={{ mb: 6 }}>
            {/* Company Information */}
            <Grid item xs={12} sm={6} md={3}>
              <motion.div variants={footerItemVariants}>
                <Typography 
                  variant="h4" 
                  component={motion.div}
                  whileHover={{ scale: 1.05 }}
                  sx={{ 
                    fontWeight: 800, 
                    letterSpacing: 1,
                    color: 'primary.main',
                    mb: 2,
                    cursor: 'pointer'
                  }}
                  onClick={() => navigateTo('/')}
                >
                  LEGENDARY MOTORSPORTS
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                  Experience the pinnacle of automotive engineering with our exclusive hypercar rental service, 
                  designed for those who demand nothing less than extraordinary.
                </Typography>
                <Box sx={{ display: 'flex', mt: 2 }}>
                  <IconButton 
                    component={motion.button}
                    whileHover={{ y: -5, color: '#FFBD00' }}
                    transition={{ duration: 0.2 }}
                    sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.1)', 
                      mr: 1,
                      '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.15)' }
                    }}
                  >
                    <FacebookIcon />
                  </IconButton>
                  <IconButton 
                    component={motion.button}
                    whileHover={{ y: -5, color: '#FFBD00' }}
                    transition={{ duration: 0.2 }}
                    sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.1)', 
                      mr: 1,
                      '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.15)' }
                    }}
                  >
                    <InstagramIcon />
                  </IconButton>
                  <IconButton 
                    component={motion.button}
                    whileHover={{ y: -5, color: '#FFBD00' }}
                    transition={{ duration: 0.2 }}
                    sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.1)', 
                      mr: 1,
                      '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.15)' }
                    }}
                  >
                    <TwitterIcon />
                  </IconButton>
                  <IconButton 
                    component={motion.button}
                    whileHover={{ y: -5, color: '#FFBD00' }}
                    transition={{ duration: 0.2 }}
                    sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.15)' }
                    }}
                  >
                    <YouTubeIcon />
                  </IconButton>
                </Box>
              </motion.div>
            </Grid>
            
            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={3}>
              <motion.div variants={footerItemVariants}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3, 
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -10,
                      left: 0,
                      width: 50,
                      height: 3,
                      bgcolor: 'primary.main'
                    }
                  }}
                >
                  Quick Links
                </Typography>
                <List disablePadding>
                  {quickLinks.map((link) => (
                    <ListItem 
                      key={link.name} 
                      disablePadding 
                      sx={{ mb: 1 }}
                      component={motion.li}
                      whileHover={{ x: 10 }}
                    >
                      <ListItemText>
                        <Link 
                          component="button"
                          onClick={() => navigateTo(link.href)}
                          sx={{ 
                            color: 'text.secondary',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            font: 'inherit',
                            padding: 0,
                            '&:hover': {
                              color: 'primary.main'
                            }
                          }}
                        >
                          {link.name}
                        </Link>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </motion.div>
            </Grid>
            
            {/* Our Services */}
            <Grid item xs={12} sm={6} md={3}>
              <motion.div variants={footerItemVariants}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3, 
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -10,
                      left: 0,
                      width: 50,
                      height: 3,
                      bgcolor: 'primary.main'
                    }
                  }}
                >
                  Our Services
                </Typography>
                <List disablePadding>
                  {serviceLinks.map((link) => (
                    <ListItem 
                      key={link.name} 
                      disablePadding 
                      sx={{ mb: 1 }}
                      component={motion.li}
                      whileHover={{ x: 10 }}
                    >
                      <ListItemText>
                        <Link 
                          href={link.href}
                          sx={{ 
                            color: 'text.secondary',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              color: 'primary.main'
                            }
                          }}
                        >
                          {link.name}
                        </Link>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </motion.div>
            </Grid>
            
            {/* Legal */}
            <Grid item xs={12} sm={6} md={3}>
              <motion.div variants={footerItemVariants}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3, 
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -10,
                      left: 0,
                      width: 50,
                      height: 3,
                      bgcolor: 'primary.main'
                    }
                  }}
                >
                  Legal
                </Typography>
                <List disablePadding>
                  {legalLinks.map((link) => (
                    <ListItem 
                      key={link.name} 
                      disablePadding 
                      sx={{ mb: 1 }}
                      component={motion.li}
                      whileHover={{ x: 10 }}
                    >
                      <ListItemText>
                        <Link 
                          href={link.href}
                          sx={{ 
                            color: 'text.secondary',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              color: 'primary.main'
                            }
                          }}
                        >
                          {link.name}
                        </Link>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
        
        {/* Copyright Section */}
        <Box 
          sx={{ 
            borderTop: 1, 
            borderColor: 'rgba(255, 255, 255, 0.1)', 
            pt: 3,
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
            &copy; {new Date().getFullYear()} Legendary Motorsports. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;