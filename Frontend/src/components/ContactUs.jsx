import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  Card, 
  CardContent,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Phone as PhoneIcon, 
  Email as EmailIcon, 
  LocationOn as LocationIcon,
  AccessTime as AccessTimeIcon,
  FacebookRounded as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

const ContactUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [loading, setLoading] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Form handling functions
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      errors.message = 'Please provide more details (minimum 20 characters)';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSnackbar({
        open: true,
        message: 'Your message has been sent successfully! Our team will contact you shortly.',
        severity: 'success'
      });
      
      // Clear form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to send your message. Please try again or contact us directly.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  // Social media links
  const socialLinks = [
    { icon: <FacebookIcon />, name: 'Facebook', url: 'https://facebook.com' },
    { icon: <InstagramIcon />, name: 'Instagram', url: 'https://instagram.com' },
    { icon: <TwitterIcon />, name: 'Twitter', url: 'https://twitter.com' },
    { icon: <LinkedInIcon />, name: 'LinkedIn', url: 'https://linkedin.com' }
  ];
  
  return (
    <>
      <Header />
      
      {/* Top spacing for header */}
      <Box sx={{ height: { xs: 70, sm: 90 } }} />
      
      {/* Hero section */}
      <Box
        sx={{
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          py: { xs: 10, md: 15 },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3)',
            zIndex: -1
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '30%',
            background: 'linear-gradient(to top, rgba(10, 10, 32, 1), rgba(10, 10, 32, 0))',
            zIndex: -1
          }
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                fontWeight: 800, 
                color: 'white',
                textAlign: 'center',
                mb: 2,
                textTransform: 'uppercase',
                letterSpacing: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -16,
                  left: '50%',
                  width: 100,
                  height: 4,
                  backgroundColor: 'primary.main',
                  transform: 'translateX(-50%)'
                }
              }}
            >
              Contact <span style={{ color: theme.palette.primary.main }}>Us</span>
            </Typography>
            
            <Box mt={6}>
              <Typography 
                variant="h6" 
                component="p" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.9)',
                  textAlign: 'center',
                  maxWidth: '800px',
                  mx: 'auto',
                  mb: 4,
                  fontWeight: 400,
                  lineHeight: 1.8,
                  fontSize: { xs: '1rem', md: '1.2rem' }
                }}
              >
                Experience the unparalleled service of Legendary Motorsports. Reach out to our dedicated team of luxury automotive experts for inquiries, bookings, or to craft your bespoke exotic car experience.
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>
      
      {/* Contact Section */}
      <Box 
        sx={{ 
          py: { xs: 8, md: 12 }, 
          bgcolor: '#0a0a20',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '40%',
            height: '100%',
            backgroundImage: 'url(https://images.unsplash.com/photo-1614200190252-277941ed11be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=70)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.08,
            zIndex: 0,
            display: { xs: 'none', lg: 'block' }
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Grid container spacing={5} justifyContent="center">
              {/* Contact Information - make it wider and better centered */}
              <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Box sx={{ width: '100%', maxWidth: '550px', mx: 'auto' }}>
                  <motion.div variants={itemVariants}>
                    <Typography 
                      variant="h3" 
                      component="h2" 
                      sx={{ 
                        fontWeight: 800, 
                        color: 'white',
                        mb: 4,
                        position: 'relative',
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        letterSpacing: '0.5px',
                        textAlign: 'center',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: -12,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 120,
                          height: 4,
                          background: 'linear-gradient(90deg, rgba(255, 214, 51, 1) 0%, rgba(255, 214, 51, 0.4) 100%)',
                          borderRadius: 4
                        }
                      }}
                    >
                      How to <span style={{ color: theme.palette.primary.main }}>Reach Us</span>
                    </Typography>
                    
                    <Box sx={{ mb: 6 }}>
                      <Card sx={{ 
                        mb: 3, 
                        background: 'rgba(4, 4, 48, 0.7)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 3,
                        border: '1px solid rgba(255, 214, 51, 0.15)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                        overflow: 'visible',
                        transition: 'all 0.3s ease',
                        width: '100%'
                      }}>
                        <CardContent sx={{ p: 0 }}>
                          <List disablePadding>
                            <ListItem 
                              sx={{ 
                                px: 3, 
                                py: 2.5,
                                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 214, 51, 0.05)',
                                }
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: 80 }}>
                                <Box 
                                  sx={{ 
                                    background: 'linear-gradient(135deg, rgba(255, 214, 51, 0.2) 0%, rgba(255, 214, 51, 0.05) 100%)',
                                    width: 60,
                                    height: 60,
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 12px rgba(255, 214, 51, 0.15)',
                                    border: '1px solid rgba(255, 214, 51, 0.2)'
                                  }}
                                >
                                  <LocationIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                                </Box>
                              </ListItemIcon>
                              <ListItemText 
                                primary="Our Location" 
                                secondary="8800 Beverly Boulevard, Los Angeles, CA 90048" 
                                primaryTypographyProps={{ 
                                  fontWeight: 700,
                                  color: 'white',
                                  fontSize: '1.1rem',
                                  mb: 0.5,
                                  letterSpacing: '0.5px'
                                }}
                                secondaryTypographyProps={{ 
                                  color: 'rgba(255, 255, 255, 0.8)',
                                  fontSize: '1rem',
                                  lineHeight: 1.5
                                }}
                                sx={{ ml: 2 }}
                              />
                            </ListItem>
                            
                            <ListItem 
                              sx={{ 
                                px: 3, 
                                py: 2.5,
                                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 214, 51, 0.05)',
                                }
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: 80 }}>
                                <Box 
                                  sx={{ 
                                    background: 'linear-gradient(135deg, rgba(255, 214, 51, 0.2) 0%, rgba(255, 214, 51, 0.05) 100%)',
                                    width: 60,
                                    height: 60,
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 12px rgba(255, 214, 51, 0.15)',
                                    border: '1px solid rgba(255, 214, 51, 0.2)'
                                  }}
                                >
                                  <PhoneIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                                </Box>
                              </ListItemIcon>
                              <ListItemText 
                                primary="Call Us" 
                                secondary={
                                  <Typography 
                                    component="a" 
                                    href="tel:+13105558888"
                                    sx={{ 
                                      color: 'rgba(255, 255, 255, 0.8)', 
                                      textDecoration: 'none',
                                      transition: 'color 0.2s ease',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      fontWeight: 500,
                                      '&:hover': { color: 'primary.main' }
                                    }}
                                  >
                                    +1 (310) 555-8888
                                  </Typography>
                                } 
                                primaryTypographyProps={{ 
                                  fontWeight: 700,
                                  color: 'white',
                                  fontSize: '1.1rem',
                                  mb: 0.5,
                                  letterSpacing: '0.5px'
                                }}
                                secondaryTypographyProps={{ 
                                  component: 'div',
                                  fontSize: '1rem',
                                  lineHeight: 1.5
                                }}
                                sx={{ ml: 2 }}
                              />
                            </ListItem>
                            
                            <ListItem 
                              sx={{ 
                                px: 3, 
                                py: 2.5,
                                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 214, 51, 0.05)',
                                }
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: 80 }}>
                                <Box 
                                  sx={{ 
                                    background: 'linear-gradient(135deg, rgba(255, 214, 51, 0.2) 0%, rgba(255, 214, 51, 0.05) 100%)',
                                    width: 60,
                                    height: 60,
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 12px rgba(255, 214, 51, 0.15)',
                                    border: '1px solid rgba(255, 214, 51, 0.2)'
                                  }}
                                >
                                  <EmailIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                                </Box>
                              </ListItemIcon>
                              <ListItemText 
                                primary="Email Us" 
                                secondary={
                                  <Typography 
                                    component="a" 
                                    href="mailto:info@legendarymotorsports.com"
                                    sx={{ 
                                      color: 'rgba(255, 255, 255, 0.8)', 
                                      textDecoration: 'none',
                                      transition: 'color 0.2s ease',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      fontWeight: 500,
                                      '&:hover': { color: 'primary.main' }
                                    }}
                                  >
                                    info@legendarymotorsports.com
                                  </Typography>
                                } 
                                primaryTypographyProps={{ 
                                  fontWeight: 700,
                                  color: 'white',
                                  fontSize: '1.1rem',
                                  mb: 0.5,
                                  letterSpacing: '0.5px'
                                }}
                                secondaryTypographyProps={{ 
                                  component: 'div',
                                  fontSize: '1rem',
                                  lineHeight: 1.5
                                }}
                                sx={{ ml: 2 }}
                              />
                            </ListItem>
                            
                            <ListItem 
                              sx={{ 
                                px: 3, 
                                py: 2.5,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 214, 51, 0.05)',
                                }
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: 80 }}>
                                <Box 
                                  sx={{ 
                                    background: 'linear-gradient(135deg, rgba(255, 214, 51, 0.2) 0%, rgba(255, 214, 51, 0.05) 100%)',
                                    width: 60,
                                    height: 60,
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 12px rgba(255, 214, 51, 0.15)',
                                    border: '1px solid rgba(255, 214, 51, 0.2)'
                                  }}
                                >
                                  <AccessTimeIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                                </Box>
                              </ListItemIcon>
                              <ListItemText 
                                primary="Business Hours" 
                                secondary={
                                  <Box sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1rem', lineHeight: 1.8 }}>
                                    <Box sx={{ 
                                      display: 'flex', 
                                      justifyContent: 'space-between', 
                                      mb: 0.5,
                                      '&:hover': { color: 'primary.main' },
                                      transition: 'color 0.2s ease'
                                    }}>
                                      <Typography component="span" sx={{ fontWeight: 500 }}>Monday - Friday:</Typography>
                                      <Typography component="span">9:00 AM - 8:00 PM</Typography>
                                    </Box>
                                    <Box sx={{ 
                                      display: 'flex', 
                                      justifyContent: 'space-between', 
                                      mb: 0.5,
                                      '&:hover': { color: 'primary.main' },
                                      transition: 'color 0.2s ease'
                                    }}>
                                      <Typography component="span" sx={{ fontWeight: 500 }}>Saturday:</Typography>
                                      <Typography component="span">10:00 AM - 6:00 PM</Typography>
                                    </Box>
                                    <Box sx={{ 
                                      display: 'flex', 
                                      justifyContent: 'space-between',
                                      '&:hover': { color: 'primary.main' },
                                      transition: 'color 0.2s ease'
                                    }}>
                                      <Typography component="span" sx={{ fontWeight: 500 }}>Sunday:</Typography>
                                      <Typography component="span">By appointment only</Typography>
                                    </Box>
                                  </Box>
                                } 
                                primaryTypographyProps={{ 
                                  fontWeight: 700,
                                  color: 'white',
                                  fontSize: '1.1rem',
                                  mb: 0.5,
                                  letterSpacing: '0.5px'
                                }}
                                secondaryTypographyProps={{ 
                                  component: 'div'
                                }}
                                sx={{ ml: 2 }}
                              />
                            </ListItem>
                          </List>
                        </CardContent>
                      </Card>
                    </Box>
                    
                    <Divider sx={{ 
                      borderColor: 'rgba(255, 255, 255, 0.1)', 
                      my: 4,
                      width: '100%',
                      '&::before, &::after': {
                        borderColor: 'rgba(255, 255, 255, 0.06)',
                      }
                    }}>
                      <Typography variant="body2" sx={{ px: 2, color: 'rgba(255, 255, 255, 0.5)', fontStyle: 'italic' }}>
                        Connect with us
                      </Typography>
                    </Divider>
                    
                    {/* Social Media Links - improved styling */}
                    <Box sx={{ mb: 6, width: '100%', textAlign: 'center' }}>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 700, 
                          color: 'white',
                          mb: 3,
                          textAlign: 'center'
                        }}
                      >
                        Follow Our <span style={{ color: theme.palette.primary.main }}>Social Media</span>
                      </Typography
                      >
                      
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        {socialLinks.map((social, index) => (
                          <Tooltip title={social.name} key={index}>
                            <IconButton 
                              component="a"
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{ 
                                color: 'white',
                                bgcolor: 'rgba(10, 10, 32, 0.8)',
                                border: '2px solid rgba(255, 214, 51, 0.3)',
                                width: 60,
                                height: 60,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  bgcolor: 'rgba(255, 214, 51, 0.15)',
                                  transform: 'translateY(-5px) scale(1.05)',
                                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                                  border: '2px solid rgba(255, 214, 51, 0.6)'
                                }
                              }}
                            >
                              {social.icon}
                            </IconButton>
                          </Tooltip>
                        ))}
                      </Box>
                    </Box>
                    
                    {/* Map - improved alignment */}
                    <motion.div variants={itemVariants} style={{ width: '100%' }}>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 700, 
                          color: 'white',
                          mb: 3,
                          textAlign: 'center'
                        }}
                      >
                        Visit Our <span style={{ color: theme.palette.primary.main }}>Showroom</span>
                      </Typography>
                      <Paper 
                        elevation={10} 
                        sx={{ 
                          height: 320, 
                          width: '100%', 
                          overflow: 'hidden',
                          border: '2px solid rgba(255, 189, 0, 0.3)',
                          borderRadius: 3,
                          position: 'relative',
                          '&:hover': {
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                            transform: 'scale(1.01)',
                            border: '2px solid rgba(255, 189, 0, 0.5)',
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <Box sx={{ 
                          position: 'absolute',
                          top: 16,
                          left: 16,
                          bgcolor: 'rgba(10, 10, 32, 0.9)',
                          color: 'white',
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          zIndex: 2,
                          border: '1px solid rgba(255, 214, 51, 0.3)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                        }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            Legendary Motorsports
                          </Typography>
                        </Box>
                        <iframe 
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7152203584424!2d-118.38270748478173!3d34.0760245805971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b9334c2d4b59%3A0x24a9f1aafd8da5b7!2s8800%20Beverly%20Blvd%2C%20West%20Hollywood%2C%20CA%2090048%2C%20USA!5e0!3m2!1sen!2sca!4v1620160472261!5m2!1sen!2sca" 
                          width="100%" 
                          height="320" 
                          style={{ border: 0 }} 
                          allowFullScreen="" 
                          loading="lazy" 
                          title="Legendary Motorsports Location"
                        />
                      </Paper>
                    </motion.div>
                  </motion.div>
                </Box>
              </Grid>
              
              {/* Contact Form */}
              <Grid item xs={12} md={7}>
                <motion.div variants={itemVariants}>
                  <Card 
                    sx={{ 
                      backdropFilter: 'blur(10px)',
                      backgroundColor: 'rgba(4, 4, 48, 0.95)',
                      borderRadius: 3,
                      boxShadow: '0 15px 50px rgba(0, 0, 0, 0.5)',
                      border: '1px solid rgba(255, 214, 51, 0.15)',
                      overflow: 'visible',
                      position: 'relative',
                      '&:hover': {
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
                        borderColor: 'rgba(255, 214, 51, 0.25)',
                      },
                      transition: 'all 0.4s ease',
                    }}
                  >
                    {/* Gold accent bar with elegant gradient */}
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: '10%', 
                        width: '80%', 
                        height: 4, 
                        background: 'linear-gradient(90deg, rgba(255, 214, 51, 0.4) 0%, rgba(255, 214, 51, 1) 50%, rgba(255, 214, 51, 0.4) 100%)',
                        borderRadius: '0 0 4px 4px',
                        boxShadow: '0 2px 10px rgba(255, 214, 51, 0.2)'
                      }} 
                    />
                    
                    <CardContent sx={{ p: { xs: 3, md: 5 }, pt: { xs: 4, md: 6 } }}>
                      <Typography 
                        variant="h4" 
                        component="h2" 
                        sx={{ 
                          fontWeight: 800, 
                          color: 'white',
                          mb: 1.5,
                          textAlign: 'center',
                          position: 'relative',
                          fontSize: { xs: '1.8rem', md: '2.25rem' },
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -10,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 60,
                            height: 3,
                            background: 'linear-gradient(90deg, rgba(255, 214, 51, 0.2) 0%, rgba(255, 214, 51, 1) 50%, rgba(255, 214, 51, 0.2) 100%)',
                            borderRadius: 2
                          }
                        }}
                      >
                        Send Us a Message
                      </Typography>
                      
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          mb: 5,
                          mt: 3,
                          textAlign: 'center',
                          maxWidth: '85%',
                          mx: 'auto',
                          fontStyle: 'italic',
                          fontSize: '1.05rem'
                        }}
                      >
                        Complete the form below and our team of experts will respond within 24 hours
                      </Typography>
                      
                      <Box component="form" onSubmit={handleSubmit} noValidate>
                        <Grid container spacing={3.5}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              fullWidth
                              id="name"
                              label="Your Name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              error={!!formErrors.name}
                              helperText={formErrors.name}
                              disabled={loading}
                              sx={{
                                '& .MuiInputLabel-root': { 
                                  color: 'rgba(255, 255, 255, 0.6)', 
                                  fontWeight: 500,
                                  fontSize: '0.95rem',
                                  '&.Mui-focused': { color: theme.palette.primary.main }
                                },
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': { 
                                    borderColor: 'rgba(255, 255, 255, 0.2)', 
                                    borderWidth: 2,
                                    borderRadius: 1.5
                                  },
                                  '&:hover fieldset': { borderColor: 'rgba(255, 214, 51, 0.4)' },
                                  '&.Mui-focused fieldset': { 
                                    borderColor: theme.palette.primary.main,
                                    borderWidth: 2
                                  },
                                },
                                '& input': { 
                                  color: 'white', 
                                  fontSize: '1rem', 
                                  py: 1.5,
                                  '&::placeholder': {
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    opacity: 1
                                  }
                                },
                                '& .MuiFormHelperText-root': {
                                  color: 'error.main',
                                  fontWeight: 500,
                                  fontSize: '0.8rem',
                                  mt: 0.5
                                }
                              }}
                              InputProps={{
                                sx: {
                                  borderRadius: 1.5,
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)'
                                  },
                                  '&.Mui-focused': {
                                    boxShadow: '0 0 0 2px rgba(255, 214, 51, 0.2)'
                                  }
                                }
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              fullWidth
                              id="email"
                              label="Email Address"
                              name="email"
                              autoComplete="email"
                              value={formData.email}
                              onChange={handleChange}
                              error={!!formErrors.email}
                              helperText={formErrors.email}
                              disabled={loading}
                              sx={{
                                '& .MuiInputLabel-root': { 
                                  color: 'rgba(255, 255, 255, 0.6)', 
                                  fontWeight: 500,
                                  fontSize: '0.95rem',
                                  '&.Mui-focused': { color: theme.palette.primary.main }
                                },
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': { 
                                    borderColor: 'rgba(255, 255, 255, 0.2)', 
                                    borderWidth: 2,
                                    borderRadius: 1.5
                                  },
                                  '&:hover fieldset': { borderColor: 'rgba(255, 214, 51, 0.4)' },
                                  '&.Mui-focused fieldset': { 
                                    borderColor: theme.palette.primary.main,
                                    borderWidth: 2
                                  },
                                },
                                '& input': { 
                                  color: 'white', 
                                  fontSize: '1rem', 
                                  py: 1.5,
                                  '&::placeholder': {
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    opacity: 1
                                  }
                                },
                                '& .MuiFormHelperText-root': {
                                  color: 'error.main',
                                  fontWeight: 500,
                                  fontSize: '0.8rem',
                                  mt: 0.5
                                }
                              }}
                              InputProps={{
                                sx: {
                                  borderRadius: 1.5,
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)'
                                  },
                                  '&.Mui-focused': {
                                    boxShadow: '0 0 0 2px rgba(255, 214, 51, 0.2)'
                                  }
                                }
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              id="phone"
                              label="Phone Number (optional)"
                              name="phone"
                              autoComplete="tel"
                              value={formData.phone}
                              onChange={handleChange}
                              disabled={loading}
                              sx={{
                                '& .MuiInputLabel-root': { 
                                  color: 'rgba(255, 255, 255, 0.6)', 
                                  fontWeight: 500,
                                  fontSize: '0.95rem',
                                  '&.Mui-focused': { color: theme.palette.primary.main }
                                },
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': { 
                                    borderColor: 'rgba(255, 255, 255, 0.2)', 
                                    borderWidth: 2,
                                    borderRadius: 1.5
                                  },
                                  '&:hover fieldset': { borderColor: 'rgba(255, 214, 51, 0.4)' },
                                  '&.Mui-focused fieldset': { 
                                    borderColor: theme.palette.primary.main,
                                    borderWidth: 2
                                  },
                                },
                                '& input': { 
                                  color: 'white', 
                                  fontSize: '1rem', 
                                  py: 1.5,
                                  '&::placeholder': {
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    opacity: 1
                                  }
                                }
                              }}
                              InputProps={{
                                sx: {
                                  borderRadius: 1.5,
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)'
                                  },
                                  '&.Mui-focused': {
                                    boxShadow: '0 0 0 2px rgba(255, 214, 51, 0.2)'
                                  }
                                }
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              id="subject"
                              label="Subject"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              error={!!formErrors.subject}
                              helperText={formErrors.subject}
                              disabled={loading}
                              sx={{
                                '& .MuiInputLabel-root': { 
                                  color: 'rgba(255, 255, 255, 0.6)', 
                                  fontWeight: 500,
                                  fontSize: '0.95rem',
                                  '&.Mui-focused': { color: theme.palette.primary.main }
                                },
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': { 
                                    borderColor: 'rgba(255, 255, 255, 0.2)', 
                                    borderWidth: 2,
                                    borderRadius: 1.5
                                  },
                                  '&:hover fieldset': { borderColor: 'rgba(255, 214, 51, 0.4)' },
                                  '&.Mui-focused fieldset': { 
                                    borderColor: theme.palette.primary.main,
                                    borderWidth: 2
                                  },
                                },
                                '& input': { 
                                  color: 'white', 
                                  fontSize: '1rem', 
                                  py: 1.5,
                                  '&::placeholder': {
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    opacity: 1
                                  }
                                },
                                '& .MuiFormHelperText-root': {
                                  color: 'error.main',
                                  fontWeight: 500,
                                  fontSize: '0.8rem',
                                  mt: 0.5
                                }
                              }}
                              InputProps={{
                                sx: {
                                  borderRadius: 1.5,
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)'
                                  },
                                  '&.Mui-focused': {
                                    boxShadow: '0 0 0 2px rgba(255, 214, 51, 0.2)'
                                  }
                                }
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              multiline
                              rows={6}
                              id="message"
                              label="Your Message"
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              error={!!formErrors.message}
                              helperText={formErrors.message}
                              disabled={loading}
                              sx={{
                                width:'450%',
                                '& .MuiInputLabel-root': { 
                                  color: 'rgba(255, 255, 255, 0.6)', 
                                  fontWeight: 500,
                                  fontSize: '0.95rem',
                                  '&.Mui-focused': { color: theme.palette.primary.main }
                                },
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': { 
                                    borderColor: 'rgba(255, 255, 255, 0.2)', 
                                    borderWidth: 2,
                                    borderRadius: 1.5
                                  },
                                  '&:hover fieldset': { borderColor: 'rgba(255, 214, 51, 0.4)' },
                                  '&.Mui-focused fieldset': { 
                                    borderColor: theme.palette.primary.main,
                                    borderWidth: 2
                                  },
                                },
                                '& textarea': { 
                                  color: 'white', 
                                  fontSize: '1rem',
                                  lineHeight: 1.7,
                                  '&::placeholder': {
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    opacity: 1
                                  }
                                },
                                '& .MuiFormHelperText-root': {
                                  color: 'error.main',
                                  fontWeight: 500,
                                  fontSize: '0.8rem',
                                  mt: 0.5
                                }
                              }}
                              InputProps={{
                                sx: {
                                  borderRadius: 1.5,
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)'
                                  },
                                  '&.Mui-focused': {
                                    boxShadow: '0 0 0 2px rgba(255, 214, 51, 0.2)'
                                  }
                                }
                              }}
                            />
                          </Grid>
                        </Grid>
                        
                        <Box sx={{ mt: 6, position: 'relative', display: 'inline-block', width: '100%' }}>
                          {/* Button with enhanced styling */}
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={loading}
                            sx={{ 
                              py: 1.8,
                              fontWeight: 700,
                              letterSpacing: 1.2,
                              fontSize: '1.05rem',
                              borderRadius: 1.5,
                              background: 'linear-gradient(90deg, rgba(255, 189, 0, 0.95) 0%, rgba(255, 214, 51, 0.95) 100%)',
                              boxShadow: '0 8px 25px 0 rgba(255, 189, 0, 0.25)',
                              textTransform: 'uppercase',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-3px)',
                                boxShadow: '0 12px 30px 0 rgba(255, 189, 0, 0.35)',
                                background: 'linear-gradient(90deg, rgba(255, 189, 0, 1) 0%, rgba(255, 214, 51, 1) 100%)',
                              },
                              '&:active': {
                                transform: 'translateY(-1px)',
                              }
                            }}
                          >
                            {loading ? (
                              <CircularProgress size={24} color="inherit" />
                            ) : (
                              'Send Message'
                            )}
                          </Button>
                          
                          {/* Enhanced decorative element */}
                          <Box 
                            sx={{ 
                              position: 'absolute', 
                              bottom: -4, 
                              left: '50%', 
                              transform: 'translateX(-50%)', 
                              width: '100%', 
                              height: '100%', 
                              border: '2px solid rgba(255, 214, 51, 0.2)',
                              borderTop: 'none',
                              borderRadius: '0 0 8px 8px',
                              zIndex: -1,
                              '&::after': {
                                content: '""',
                                position: 'absolute',
                                top: 15,
                                left: '5%',
                                width: '90%',
                                height: '100%',
                                border: '1px solid rgba(255, 214, 51, 0.1)',
                                borderTop: 'none',
                                borderRadius: '0 0 8px 8px',
                              }
                            }} 
                          />
                        </Box>
                        
                        {/* Required fields note */}
                        <Box sx={{ mt: 3, mb: 2, textAlign: 'center' }}>
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', fontStyle: 'italic' }}>
                            <span style={{ color: 'rgba(255, 109, 109, 0.7)' }}>*</span> Required fields
                          </Typography>
                        </Box>
                      </Box>
                      
                      {/* Professional privacy statement */}
                      <Box sx={{ mt: 4, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box 
                          component="span" 
                          sx={{ 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            width: 24, 
                            height: 24, 
                            borderRadius: '50%', 
                            bgcolor: 'rgba(255, 214, 51, 0.1)',
                            border: '1px solid rgba(255, 214, 51, 0.3)',
                            mr: 1.5
                          }}
                        >
                          <Box 
                            component="span" 
                            sx={{ 
                              fontSize: '12px', 
                              fontWeight: 'bold', 
                              color: 'rgba(255, 214, 51, 0.9)'
                            }}
                          >
                            ✓
                          </Box>
                        </Box>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: '0.85rem',
                            letterSpacing: 0.2
                          }}
                        >
                          Your privacy is important to us. We'll never share your information with third parties.
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
      
      {/* FAQ Section with improved styling */}
      <Box 
        sx={{ 
          py: { xs: 8, md: 12 }, 
          bgcolor: '#050515',
          background: 'linear-gradient(180deg, #050515 0%, #0b0b25 100%)'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
              <Typography 
                variant="h2" 
                component="h2"
                align="center" 
                sx={{ 
                  fontWeight: 700,
                  color: 'white',
                  mb: 2,
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  fontSize: { xs: '2rem', md: '2.75rem' }
                }}
              >
                Frequently Asked <span style={{ color: theme.palette.primary.main }}>Questions</span>
              </Typography>
              
              <Box 
                sx={{ 
                  width: 80, 
                  height: 4, 
                  bgcolor: 'primary.main', 
                  mx: 'auto',
                  mt: 2,
                  mb: 4
                }} 
              />
              
              <Typography 
                variant="subtitle1"
                align="center" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  mb: 6,
                  maxWidth: 700,
                  mx: 'auto',
                  fontSize: '1.1rem',
                  lineHeight: 1.8
                }}
              >
                Find answers to common questions about our luxury rental services and experiences.
                Can't find what you're looking for? Contact our concierge team directly.
              </Typography>
            </Box>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <motion.div variants={itemVariants}>
                  <Paper 
                    sx={{ 
                      p: 4, 
                      mb: 3, 
                      bgcolor: 'rgba(10, 10, 32, 0.7)',
                      borderRadius: 2,
                      border: '1px solid rgba(255, 214, 51, 0.1)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                        borderColor: 'rgba(255, 214, 51, 0.3)'
                      }
                    }}
                    elevation={4}
                  >
                    <Typography 
                      variant="h5" 
                      component="h3"
                      sx={{ 
                        fontWeight: 700, 
                        color: 'primary.main',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        '&::before': {
                          content: '""',
                          display: 'inline-block',
                          width: 10,
                          height: 10,
                          bgcolor: 'primary.main',
                          borderRadius: '50%',
                          mr: 2
                        }
                      }}
                    >
                      What are your rental requirements?
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.7 }}>
                      Renters must be at least 25 years old with a valid driver's license, a clean driving record, and provide proof of full-coverage insurance. International clients need an international driver's permit. A security deposit is required for all rentals, which is fully refundable upon undamaged return of the vehicle.
                    </Typography>
                  </Paper>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Paper 
                    sx={{ 
                      p: 4, 
                      mb: 3, 
                      bgcolor: 'rgba(10, 10, 32, 0.7)',
                      borderRadius: 2,
                      border: '1px solid rgba(255, 214, 51, 0.1)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                        borderColor: 'rgba(255, 214, 51, 0.3)'
                      }
                    }}
                    elevation={4}
                  >
                    <Typography 
                      variant="h5" 
                      component="h3"
                      sx={{ 
                        fontWeight: 700, 
                        color: 'primary.main',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        '&::before': {
                          content: '""',
                          display: 'inline-block',
                          width: 10,
                          height: 10,
                          bgcolor: 'primary.main',
                          borderRadius: '50%',
                          mr: 2
                        }
                      }}
                    >
                      How far in advance should I book?
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.7 }}>
                      We recommend booking at least 2-3 weeks in advance for standard reservations. For special events or peak seasons (holidays, major events), booking 1-2 months ahead is advisable to secure your preferred vehicle. Last-minute bookings are sometimes possible based on availability.
                    </Typography>
                  </Paper>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Paper 
                    sx={{ 
                      p: 4,
                      bgcolor: 'rgba(10, 10, 32, 0.7)',
                      borderRadius: 2,
                      border: '1px solid rgba(255, 214, 51, 0.1)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                        borderColor: 'rgba(255, 214, 51, 0.3)'
                      }
                    }}
                    elevation={4}
                  >
                    <Typography 
                      variant="h5" 
                      component="h3"
                      sx={{ 
                        fontWeight: 700, 
                        color: 'primary.main',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        '&::before': {
                          content: '""',
                          display: 'inline-block',
                          width: 10,
                          height: 10,
                          bgcolor: 'primary.main',
                          borderRadius: '50%',
                          mr: 2
                        }
                      }}
                    >
                      Do you offer delivery services?
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.7 }}>
                      Yes, we offer premium vehicle delivery and pickup services to locations within a 50-mile radius of our showroom, including luxury hotels, private residences, and airports. Our concierge delivery includes a detailed vehicle orientation. Additional fees apply based on distance and location.
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <motion.div variants={itemVariants}>
                  <Paper 
                    sx={{ 
                      p: 4, 
                      mb: 3, 
                      bgcolor: 'rgba(10, 10, 32, 0.7)',
                      borderRadius: 2,
                      border: '1px solid rgba(255, 214, 51, 0.1)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                        borderColor: 'rgba(255, 214, 51, 0.3)'
                      }
                    }}
                    elevation={4}
                  >
                    <Typography 
                      variant="h5" 
                      component="h3"
                      sx={{ 
                        fontWeight: 700, 
                        color: 'primary.main',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        '&::before': {
                          content: '""',
                          display: 'inline-block',
                          width: 10,
                          height: 10,
                          bgcolor: 'primary.main',
                          borderRadius: '50%',
                          mr: 2
                        }
                      }}
                    >
                      What happens if I need to cancel my reservation?
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.7 }}>
                      Cancellations made 72+ hours before scheduled pickup receive a full refund. Cancellations within 48-72 hours receive a 50% refund. Cancellations less than 48 hours before scheduled pickup are non-refundable. We offer flexible rescheduling options for unexpected circumstances.
                    </Typography>
                  </Paper>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Paper 
                    sx={{ 
                      p: 4, 
                      mb: 3, 
                      bgcolor: 'rgba(10, 10, 32, 0.7)',
                      borderRadius: 2,
                      border: '1px solid rgba(255, 214, 51, 0.1)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                        borderColor: 'rgba(255, 214, 51, 0.3)'
                      }
                    }}
                    elevation={4}
                  >
                    <Typography 
                      variant="h5" 
                      component="h3"
                      sx={{ 
                        fontWeight: 700, 
                        color: 'primary.main',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        '&::before': {
                          content: '""',
                          display: 'inline-block',
                          width: 10,
                          height: 10,
                          bgcolor: 'primary.main',
                          borderRadius: '50%',
                          mr: 2
                        }
                      }}
                    >
                      Is insurance included in the rental price?
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.7 }}>
                      Basic insurance is included in all rentals, covering liability requirements. We offer premium coverage options for additional protection. Renters must provide proof of personal auto insurance that extends to rental vehicles. Our concierge team can help you understand all insurance options.
                    </Typography>
                  </Paper>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Paper 
                    sx={{ 
                      p: 4,
                      bgcolor: 'rgba(10, 10, 32, 0.7)',
                      borderRadius: 2,
                      border: '1px solid rgba(255, 214, 51, 0.1)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                        borderColor: 'rgba(255, 214, 51, 0.3)'
                      }
                    }}
                    elevation={4}
                  >
                    <Typography 
                      variant="h5" 
                      component="h3"
                      sx={{ 
                        fontWeight: 700, 
                        color: 'primary.main',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        '&::before': {
                          content: '""',
                          display: 'inline-block',
                          width: 10,
                          height: 10,
                          bgcolor: 'primary.main',
                          borderRadius: '50%',
                          mr: 2
                        }
                      }}
                    >
                      Can I extend my rental period?
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.7 }}>
                      Yes, extensions are possible subject to availability. Please contact us at least 24 hours before your scheduled return time. Extended rental periods are charged at our standard daily rates, with possible discounts for longer durations. Our customer service team is available 24/7 to assist with extensions.
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
            
            <Box 
              sx={{ 
                mt: 8, 
                textAlign: 'center',
                py: 5,
                px: { xs: 3, md: 8 },
                borderRadius: 3,
                background: 'linear-gradient(90deg, rgba(57, 0, 153, 0.4) 0%, rgba(57, 0, 153, 0.6) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
              }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Typography 
                  variant="h4" 
                  sx={{ 
                    color: 'white',
                    fontWeight: 600,
                    mb: 3,
                    fontSize: { xs: '1.5rem', md: '2rem' }
                  }}
                >
                  Have more questions? Contact our concierge team directly
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ 
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: '1rem',
                      boxShadow: '0 8px 25px 0 rgba(255, 189, 0, 0.25)',
                      letterSpacing: 1,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 12px 30px 0 rgba(255, 189, 0, 0.35)'
                      }
                    }}
                    href="tel:+13105558888"
                    startIcon={<PhoneIcon />}
                  >
                    Call Us Now
                  </Button>
                  
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    sx={{ 
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: '1rem',
                      borderWidth: 2,
                      letterSpacing: 1,
                      '&:hover': {
                        borderWidth: 2,
                        backgroundColor: 'rgba(255, 214, 51, 0.08)'
                      }
                    }}
                    href="mailto:info@legendarymotorsports.com"
                    startIcon={<EmailIcon />}
                  >
                    Email Us
                  </Button>
                </Box>
              </motion.div>
            </Box>
          </motion.div>
        </Container>
      </Box>
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ 
            width: '100%',
            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)',
            fontWeight: 500
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      
      <Footer />
    </>
  );
};

export default ContactUs;