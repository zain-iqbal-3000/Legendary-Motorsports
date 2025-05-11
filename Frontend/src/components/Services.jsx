import { useState } from 'react';
import { 
  Box, Container, Typography, Button, Card, CardContent, CardMedia,
  Grid, Stack, Link
} from '@mui/material';
import { 
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

// Dark theme colors - consistent with other pages
const darkBg = "#111517"; // Dark background
const accentPrimary = "#3498db"; // Blue accent
const accentSecondary = "#f1c40f"; // Yellow accent
const darkPanel = "rgba(25, 28, 32, 0.85)";
const cardBg = "rgba(21, 24, 28, 0.95)";
const textPrimary = "#ffffff";
const textSecondary = "#a0a9b6";
const border = `1px solid ${accentPrimary}33`;

// Clean subtle effects
const glowEffect = `0 0 15px ${accentPrimary}40`;
const subtleShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';

const Services = () => {
  const navigate = useNavigate();
  
  // Enhanced services data with more details
  const services = [
    {
      title: 'Elite Chauffeur Service',
      description:
        'Experience luxury at its finest with our professional chauffeur service. Our highly trained drivers ensure your journey is comfortable, punctual, and seamless, allowing you to relax or focus on business matters.',
      features: [
        'Professionally trained and certified drivers',
        'Luxury vehicle selection',
        'Airport transfers and city tours',
        'Corporate event transportation'
      ],
      image:
        'https://images.unsplash.com/photo-1521334884684-d80222895322?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      color: accentSecondary, // Yellow accent
    },
    {
      title: 'Track Day Experiences',
      description:
        'Push our hypercars to their limits in a controlled environment with our exclusive track day experiences. Feel the adrenaline as you master high-performance driving under the guidance of professional racing instructors.',
      features: [
        'Professional racing instruction',
        'Full-day track access',
        'Vehicle selection from our hypercar fleet',
        'High-performance driving techniques'
      ],
      image:
        'https://images.unsplash.com/photo-1518544884360-7f7c8d5a1d2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      color: '#FF4500', // Red-orange
    },
    {
      title: 'Corporate Packages',
      description:
        'Elevate your corporate events with our bespoke packages designed to impress clients and reward employees. From team-building track days to executive transportation for important meetings, we create memorable experiences.',
      features: [
        'Customized event planning',
        'Executive fleet management',
        'Team-building driving experiences',
        'Client entertainment solutions'
      ],
      image:
        'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      color: accentPrimary, // Blue accent
    },
    {
      title: 'Luxury Wedding Transportation',
      description:
        'Make your special day even more memorable with our luxury wedding transportation services. Arrive in style and create stunning photo opportunities with our collection of elegant hypercars.',
      features: [
        'Decorated vehicles with your choice of accents',
        'Professional chauffeurs in formal attire',
        'Photography session with the vehicle',
        'Red carpet service on request'
      ],
      image:
        'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      color: accentSecondary, // Yellow accent
    },
    {
      title: 'Scenic Road Trip Experiences',
      description:
        'Discover breathtaking routes and hidden gems with our curated road trip experiences. Enjoy the perfect combination of stunning landscapes and exceptional driving pleasure in your choice of hypercar.',
      features: [
        'Customized route planning',
        'Luxury accommodation arrangements',
        'Gourmet dining reservations',
        'Premium roadside assistance'
      ],
      image:
        'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      color: accentPrimary, // Blue accent
    },
    {
      title: 'Film & Photoshoot Rentals',
      description:
        'Add authenticity and luxury to your productions with our fleet of hypercars available for film, television, and photography projects. Our team ensures your creative vision is perfectly executed.',
      features: [
        'Flexible hourly or daily rental options',
        'Technical support and transportation',
        'Multiple vehicle selections',
        'On-set vehicle coordinator'
      ],
      image:
        'https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      color: accentSecondary, // Yellow accent
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <>
      <Header />

      {/* Add spacing to account for fixed header */}
      <Box sx={{ height: { xs: 70, sm: 90 } }} />

      {/* =============== HERO SECTION =============== */}
      <Box
        component="section"
        sx={{
          height: '60vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          backgroundImage: 'url(https://images.unsplash.com/photo-1592840062661-a5a7f78e2056?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(to right, ${darkBg}F0, ${darkBg}CC)`,
            zIndex: 1
          }}
        />
        
        {/* Subtle grid overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `
              linear-gradient(to right, ${accentPrimary}08 1px, transparent 1px),
              linear-gradient(to bottom, ${accentPrimary}08 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            zIndex: 1,
            opacity: 0.4
          }}
        />

        {/* Content */}
        <Container sx={{ position: 'relative', zIndex: 2, mt: 8, textAlign: 'center' }}>
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={textVariants}>
              <Typography 
                variant="h1" 
                component="h1" 
                sx={{ 
                  fontWeight: 700,
                  mb: 3,
                  textShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
                  '& .highlight': { color: accentPrimary },
                  lineHeight: 1.2,
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                  color: textPrimary
                }}
              >
                PREMIUM <span className="highlight">SERVICES</span>
              </Typography>
            </motion.div>

            <motion.div variants={textVariants}>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 5, 
                  maxWidth: 700,
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontWeight: 400,
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  color: textSecondary
                }}
              >
                Discover our exclusive range of services tailored for automotive enthusiasts and luxury seekers.
                From track days to chauffeur services, we've crafted experiences that match the excellence of our fleet.
              </Typography>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* =============== SERVICES SECTION =============== */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: darkBg,
          background: `linear-gradient(180deg, ${darkBg} 0%, rgba(10, 12, 14, 1) 100%)`,
          position: 'relative',
        }}
      >
        {/* Subtle grid overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `
              linear-gradient(to right, ${accentPrimary}08 1px, transparent 1px),
              linear-gradient(to bottom, ${accentPrimary}08 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            zIndex: 0,
            opacity: 0.4
          }}
        />
        
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Section Header */}
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  '& .highlight': { color: accentPrimary },
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  color: textPrimary
                }}
              >
                OUR <span className="highlight">SERVICES</span>
              </Typography>
              <Box
                sx={{
                  width: 100,
                  height: 4,
                  bgcolor: accentPrimary,
                  mx: 'auto',
                  mt: 2,
                  mb: 4
                }}
              />
              <Typography 
                variant="h6" 
                sx={{ 
                  maxWidth: 800,
                  mx: 'auto',
                  color: textSecondary,
                  mb: 2
                }}
              >
                Experience luxury and performance beyond ordinary with our premium automotive services
              </Typography>
            </Box>

            {/* Services Grid */}
            <Grid container spacing={6}>
              {services.map((service, index) => (
                <Grid size={{xs:12, sm:6, md:4}} key={index}>
                  <motion.div 
                    variants={cardVariants}
                    whileHover={{ y: -15 }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: subtleShadow,
                        borderRadius: 3,
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        bgcolor: cardBg,
                        border: border,
                        '&:hover': {
                          boxShadow: glowEffect,
                          border: `1px solid ${accentPrimary}60`,
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '5px',
                          backgroundColor: service.color,
                        }
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="220"
                        image={service.image}
                        alt={service.title}
                        sx={{
                          objectFit: 'cover',
                          filter: 'brightness(0.9)',
                          transition: 'filter 0.3s ease',
                          '&:hover': {
                            filter: 'brightness(1)',
                          },
                        }}
                      />
                      <CardContent 
                        sx={{ 
                          flexGrow: 1, 
                          p: 4, 
                          bgcolor: darkPanel
                        }}
                      >
                        <Typography
                          variant="h5"
                          component="h3"
                          gutterBottom
                          sx={{
                            fontWeight: 600,
                            color: textPrimary,
                            textAlign: 'center',
                            position: 'relative',
                            pb: 2,
                            mb: 3,
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              bottom: 0,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              width: '40px',
                              height: '3px',
                              backgroundColor: service.color,
                            }
                          }}
                        >
                          {service.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: textSecondary,
                            mb: 3,
                            lineHeight: 1.6,
                          }}
                        >
                          {service.description}
                        </Typography>
                        
                        {/* Feature list */}
                        <Box sx={{ mb: 2 }}>
                          {service.features.map((feature, i) => (
                            <Box 
                              key={i} 
                              sx={{ 
                                display: 'flex',
                                alignItems: 'center',
                                mb: 1
                              }}
                            >
                              <Box 
                                sx={{ 
                                  width: 6,
                                  height: 6,
                                  borderRadius: '50%',
                                  backgroundColor: service.color,
                                  mr: 1.5,
                                  flexShrink: 0
                                }}
                              />
                              <Typography 
                                variant="body2" 
                                sx={{ color: textSecondary, fontSize: '0.9rem' }}
                              >
                                {feature}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                        
                        {/* Learn More link */}
                        <Box 
                          sx={{ 
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            mt: 2
                          }}
                        >
                          <Typography 
                            component={Link}
                            href="#"
                            sx={{ 
                              color: service.color,
                              textDecoration: 'none',
                              fontWeight: 500,
                              display: 'flex',
                              alignItems: 'center',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                textDecoration: 'none',
                                '& .arrow': {
                                  transform: 'translateX(4px)'
                                }
                              }
                            }}
                          >
                            Learn More 
                            <ArrowForwardIcon 
                              className="arrow"
                              sx={{ 
                                ml: 0.5, 
                                fontSize: 18,
                                transition: 'transform 0.3s ease'
                              }} 
                            />
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* =============== CTA SECTION =============== */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 10 },
          bgcolor: darkPanel,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(https://images.unsplash.com/photo-1621789097639-28494e1bd66b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
            zIndex: 0
          }
        }}
      >
        {/* Subtle grid overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `
              linear-gradient(to right, ${accentPrimary}08 1px, transparent 1px),
              linear-gradient(to bottom, ${accentPrimary}08 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            zIndex: 0,
            opacity: 0.3
          }}
        />
        
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  '& .highlight': { color: accentPrimary },
                  color: textPrimary
                }}
              >
                READY FOR AN <span className="highlight">UNFORGETTABLE</span> EXPERIENCE?
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: textSecondary,
                  mb: 5,
                  lineHeight: 1.6,
                }}
              >
                Contact our concierge team to customize a service package that perfectly matches your desires and needs.
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={3}
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/#booking')}
                  sx={{ 
                    px: 4, 
                    py: 1.5, 
                    fontSize: '1rem',
                    bgcolor: accentPrimary,
                    color: textPrimary,
                    fontWeight: 600,
                    borderRadius: 2,
                    boxShadow: subtleShadow,
                    transition: 'all 0.3s',
                    '&:hover': {
                      bgcolor: accentSecondary,
                      transform: 'translateY(-3px)',
                      boxShadow: glowEffect,
                    }
                  }}
                >
                  Book a Service
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/#contact')}
                  sx={{ 
                    px: 4, 
                    py: 1.5, 
                    fontSize: '1rem',
                    borderWidth: 2,
                    borderRadius: 2,
                    borderColor: accentPrimary,
                    color: accentPrimary,
                    '&:hover': {
                      borderColor: accentSecondary,
                      color: accentSecondary,
                      bgcolor: `${accentSecondary}10`,
                    }
                  }}
                >
                  Contact Us
                </Button>
              </Stack>
            </motion.div>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default Services;