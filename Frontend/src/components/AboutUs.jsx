import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Avatar,
  Stack,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SpeedIcon from '@mui/icons-material/Speed';
import StarsIcon from '@mui/icons-material/Stars';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import Header from './Header';
import Footer from './Footer';

// Dark theme colors - consistent with Car Detail and Booking pages
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

const AboutUs = () => {
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Alexander Reynolds',
      role: 'Founder & CEO',
      bio: 'Former Formula 1 engineer with a passion for hypercar innovation. Founded Legendary Motorsports to share his love for automotive excellence with enthusiasts worldwide.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      name: 'Sophia Chen',
      role: 'Chief Operating Officer',
      bio: 'With a background in luxury hospitality and automotive business management, Sophia ensures our clients receive an unparalleled level of service and attention.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      name: 'Marcus Johnson',
      role: 'Head of Engineering',
      bio: 'Former supercar manufacturer technical director who oversees our fleet maintenance, ensuring every vehicle performs at its absolute peak potential.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      name: 'Elena Rodriguez',
      role: 'Experience Director',
      bio: 'Elena designs our custom driving experiences and routes, combining her background in event planning with her passion for unforgettable journeys.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: {
      y: -15,
      boxShadow: glowEffect,
      transition: { duration: 0.3 }
    }
  };

  const valueBoxVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -10,
      boxShadow: glowEffect,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      <Header />

      {/* Adding top spacing to compensate for fixed header */}
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
          backgroundImage: 'url(https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
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

        <Container sx={{ position: 'relative', zIndex: 2, maxWidth: 'lg' }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
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
                  textAlign: { xs: 'center', md: 'left' },
                  color: textPrimary
                }}
              >
                OUR <span className="highlight">STORY</span>
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 5, 
                  maxWidth: 700,
                  lineHeight: 1.6,
                  fontWeight: 400,
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                  fontSize: {xs: '1rem', md: '1.2rem' },
                  textAlign: { xs: 'center', md: 'left' },
                  color: textSecondary
                }}
              >
                The journey that turned a passion for hypercars into the premier exotic car rental experience
              </Typography>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* =============== OUR STORY SECTION =============== */}
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
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid size={{xs:12, md:6}}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                style={{ height: '100%' }}
              >
                <Box sx={{ mb: 4 }}>
                  <Typography 
                    variant="h2" 
                    component="h2"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      '& .highlight': { color: accentPrimary },
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                      textAlign: { xs: 'center', md: 'left' },
                      color: textPrimary
                    }}
                  >
                    THE <span className="highlight">BEGINNING</span>
                  </Typography>
                  <Box 
                    sx={{ 
                      width: 80, 
                      height: 4, 
                      bgcolor: accentPrimary,
                      mt: 2,
                      mb: 4,
                      mx: { xs: 'auto', md: 0 }
                    }} 
                  />
                </Box>

                <Typography 
                  variant="body1" 
                  paragraph
                  sx={{
                    textAlign: { xs: 'center', md: 'left' },
                    fontSize: '1.05rem',
                    lineHeight: 1.8,
                    color: textSecondary
                  }}
                >
                  Founded in 2012 by former Formula 1 engineer Alexander Reynolds, Legendary Motorsports began with a simple vision: 
                  to make the extraordinary accessible. Alexander's deep technical knowledge of high-performance vehicles combined with 
                  his entrepreneurial spirit led to the creation of what would become the premier hypercar rental experience in America.
                </Typography>

                <Typography 
                  variant="body1" 
                  paragraph
                  sx={{
                    textAlign: { xs: 'center', md: 'left' },
                    fontSize: '1.05rem',
                    lineHeight: 1.8,
                    color: textSecondary
                  }}
                >
                  What started with just three vehicles – a Lamborghini Gallardo, Ferrari 458 Italia, and a McLaren MP4-12C – has grown 
                  into an impressive collection of over 40 of the world's most exclusive hypercars and luxury vehicles, each maintained 
                  to perfection by our team of specialist engineers.
                </Typography>

                <Typography 
                  variant="body1" 
                  paragraph 
                  sx={{ 
                    mb: 4,
                    textAlign: { xs: 'center', md: 'left' },
                    fontSize: '1.05rem',
                    lineHeight: 1.8,
                    color: textSecondary
                  }}
                >
                  Our headquarters in Los Angeles quickly expanded to additional locations in Miami, Las Vegas, and New York, 
                  allowing us to serve hypercar enthusiasts across the country.
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Button 
                    variant="contained" 
                    endIcon={<ArrowForwardIcon />}
                    component={Link}
                    to="/#cars"
                    sx={{ 
                      mt: 2,
                      py: 1.2,
                      px: 3,
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
                    Explore Our Fleet
                  </Button>
                </Box>
              </motion.div>
            </Grid>

            <Grid size={{xs:12, md:6}}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    height: { xs: 350, md: 500 },
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: subtleShadow,
                    position: 'relative',
                    mx: { xs: 'auto', md: 0 },
                    maxWidth: { xs: 500, md: '100%' },
                    border: border,
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1514316703755-dca7d7d9d882?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Legendary Motorsports Beginning"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* =============== MISSION AND VALUES SECTION =============== */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: darkPanel,
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
            opacity: 0.3
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
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
                OUR <span className="highlight">MISSION</span> & VALUES
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
                  mt: 4,
                  color: textSecondary,
                  lineHeight: 1.8,
                  px: { xs: 2, md: 0 }
                }}
              >
                We're driven by a passion for automotive excellence and a commitment to creating unforgettable experiences 
                for our clients. Our mission is to provide unparalleled access to the world's most exclusive vehicles 
                through exceptional service and attention to detail.
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={{ xs: 3, md: 4 }} alignItems="stretch" justifyContent="center">
            {/* Value 1: Performance */}
            <Grid size={{xs:12, sm:6, md:3}}>
              <motion.div
                variants={valueBoxVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, amount: 0.3 }}
                style={{ height: '100%', display: 'flex' }}
              >
                <Box 
                  sx={{ 
                    bgcolor: cardBg, 
                    borderRadius: 3, 
                    p: { xs: 4, md: 5 },
                    width: '100%',
                    height: '100%',
                    border: `1px solid ${accentPrimary}30`,
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    boxSizing: 'border-box',
                    boxShadow: subtleShadow,
                    '&:hover': {
                      border: `1px solid ${accentPrimary}60`,
                      boxShadow: glowEffect,
                    }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      mb: 3,
                      bgcolor: `${accentPrimary}20`, 
                      width: 70, 
                      height: 70 
                    }}
                  >
                    <SpeedIcon sx={{ fontSize: 35, color: accentPrimary }} />
                  </Avatar>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    sx={{ 
                      mb: 2, 
                      textAlign: 'center',
                      fontSize: { xs: '1.4rem', sm: '1.5rem' },
                      fontWeight: 600,
                      color: textPrimary
                    }}
                  >
                    Performance
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      textAlign: 'center', 
                      color: textSecondary,
                      fontSize: '0.95rem',
                      lineHeight: 1.6
                    }}
                  >
                    We strive for excellence in every aspect of our business, from the vehicles we select to 
                    the experiences we create for our clients.
                  </Typography>
                </Box>
              </motion.div>
            </Grid>

            {/* Value 2: Excellence */}
            <Grid  size={{xs:12, sm:6, md:3}}>
              <motion.div
                variants={valueBoxVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.1 }}
                style={{ height: '100%', display: 'flex' }}
              >
                <Box 
                  sx={{ 
                    bgcolor: cardBg, 
                    borderRadius: 3, 
                    p: { xs: 4, md: 5 },
                    width: '100%',
                    height: '100%',
                    border: `1px solid ${accentSecondary}30`,
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    boxSizing: 'border-box',
                    boxShadow: subtleShadow,
                    '&:hover': {
                      border: `1px solid ${accentSecondary}60`,
                      boxShadow: glowEffect,
                    }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      mb: 3,
                      bgcolor: `${accentSecondary}20`, 
                      width: 70, 
                      height: 70 
                    }}
                  >
                    <StarsIcon sx={{ fontSize: 35, color: accentSecondary }} />
                  </Avatar>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    sx={{ 
                      mb: 2, 
                      textAlign: 'center',
                      fontSize: { xs: '1.4rem', sm: '1.5rem' },
                      fontWeight: 600,
                      color: textPrimary
                    }}
                  >
                    Excellence
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      textAlign: 'center', 
                      color: textSecondary,
                      fontSize: '0.95rem',
                      lineHeight: 1.6
                    }}
                  >
                    We maintain the highest standards in vehicle maintenance, customer service, 
                    and attention to detail at every touchpoint.
                  </Typography>
                </Box>
              </motion.div>
            </Grid>

            {/* Value 3: Passion */}
            <Grid  size={{xs:12, sm:6, md:3}}>
              <motion.div
                variants={valueBoxVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.2 }}
                style={{ height: '100%', display: 'flex' }}
              >
                <Box 
                  sx={{ 
                    bgcolor: cardBg, 
                    borderRadius: 3, 
                    p: { xs: 4, md: 5 },
                    width: '100%',
                    height: '100%',
                    border: `1px solid ${accentPrimary}30`,
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    boxSizing: 'border-box',
                    boxShadow: subtleShadow,
                    '&:hover': {
                      border: `1px solid ${accentPrimary}60`,
                      boxShadow: glowEffect,
                    }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      mb: 3,
                      bgcolor: `${accentPrimary}20`, 
                      width: 70, 
                      height: 70 
                    }}
                  >
                    <LocalGasStationIcon sx={{ fontSize: 35, color: accentPrimary }} />
                  </Avatar>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    sx={{ 
                      mb: 2, 
                      textAlign: 'center',
                      fontSize: { xs: '1.4rem', sm: '1.5rem' },
                      fontWeight: 600,
                      color: textPrimary
                    }}
                  >
                    Passion
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      textAlign: 'center', 
                      color: textSecondary,
                      fontSize: '0.95rem',
                      lineHeight: 1.6
                    }}
                  >
                    Our love for hypercars drives everything we do. We're enthusiasts first, 
                    business people second, sharing our passion with each client.
                  </Typography>
                </Box>
              </motion.div>
            </Grid>

            {/* Value 4: Innovation */}
            <Grid  size={{xs:12, sm:6, md:3}}>
              <motion.div
                variants={valueBoxVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.3 }}
                style={{ height: '100%', display: 'flex' }}
              >
                <Box 
                  sx={{ 
                    bgcolor: cardBg, 
                    borderRadius: 3, 
                    p: { xs: 4, md: 5 },
                    width: '100%',
                    height: '100%',
                    border: `1px solid ${accentSecondary}30`,
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    boxSizing: 'border-box',
                    boxShadow: subtleShadow,
                    '&:hover': {
                      border: `1px solid ${accentSecondary}60`,
                      boxShadow: glowEffect,
                    }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      mb: 3,
                      bgcolor: `${accentSecondary}20`, 
                      width: 70, 
                      height: 70 
                    }}
                  >
                    <EngineeringIcon sx={{ fontSize: 35, color: accentSecondary }} />
                  </Avatar>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    sx={{ 
                      mb: 2, 
                      textAlign: 'center',
                      fontSize: { xs: '1.4rem', sm: '1.5rem' },
                      fontWeight: 600,
                      color: textPrimary
                    }}
                  >
                    Innovation
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      textAlign: 'center', 
                      color: textSecondary,
                      fontSize: '0.95rem',
                      lineHeight: 1.6
                    }}
                  >
                    We constantly evolve our fleet and services to incorporate the latest automotive 
                    technology and create unique experiences for our clients.
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* =============== TEAM SECTION =============== */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          background: `linear-gradient(180deg, ${darkBg} 0%, rgba(10, 12, 14, 1) 100%)`,
          position: 'relative'
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
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
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
                MEET THE <span className="highlight">TEAM</span>
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
                  mt: 4,
                  color: textSecondary,
                  lineHeight: 1.8,
                  px: { xs: 2, md: 0 }
                }}
              >
                Our team of automotive experts and luxury service professionals is dedicated to providing
                an exceptional experience for every client who walks through our doors.
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={{ xs: 3, md: 4 }}>
            {teamMembers.map((member, index) => (
              <Grid  size={{xs:12, sm:6, md:3}} key={member.id}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ height: '100%' }}
                >
                  <Card 
                    sx={{ 
                      bgcolor: cardBg,
                      borderRadius: 3,
                      overflow: 'hidden',
                      boxShadow: subtleShadow,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      border: border,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: glowEffect,
                        border: `1px solid ${accentPrimary}60`,
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={member.image}
                      alt={member.name}
                      height="240"
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 3, bgcolor: darkPanel }}>
                      <Typography 
                        variant="h5" 
                        component="h3" 
                        gutterBottom 
                        sx={{ 
                          fontWeight: 600,
                          color: textPrimary
                        }}
                      >
                        {member.name}
                      </Typography>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          color: accentPrimary,
                          fontWeight: 500,
                          mb: 2
                        }}
                      >
                        {member.role}
                      </Typography>
                      <Divider sx={{ my: 2, borderColor: `${accentPrimary}30` }} />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: textSecondary,
                          lineHeight: 1.7
                        }}
                      >
                        {member.bio}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* =============== CTA SECTION =============== */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: darkPanel,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(https://images.unsplash.com/photo-1518987048-93e29699e79a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
            zIndex: 0
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Stack 
              direction={{ xs: 'column', md: 'row' }} 
              spacing={{ xs: 4, md: 6 }} 
              alignItems="center"
              justifyContent="space-between"
              sx={{ px: { xs: 2, md: 0 } }}
            >
              <Box sx={{ maxWidth: 700, textAlign: { xs: 'center', md: 'left' } }}>
                <Typography 
                  variant="h2" 
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: accentPrimary,
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                  }}
                >
                  READY TO EXPERIENCE LEGENDARY?
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 4, 
                    color: textSecondary,
                    lineHeight: 1.6
                  }}
                >
                  Join us on the road and discover what makes Legendary Motorsports the premier hypercar rental experience.
                </Typography>
              </Box>
              <Box>
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2}
                  justifyContent="center"
                >
                  <Button 
                    variant="contained"
                    component={Link}
                    to="/#booking"
                    sx={{ 
                      px: 4, 
                      py: 1.5, 
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      borderRadius: 2,
                      bgcolor: accentPrimary,
                      color: textPrimary,
                      transition: 'all 0.3s',
                      boxShadow: subtleShadow,
                      '&:hover': {
                        bgcolor: accentSecondary,
                        transform: 'translateY(-3px)',
                        boxShadow: glowEffect,
                      }
                    }}
                  >
                    Book Now
                  </Button>
                  <Button 
                    variant="outlined"
                    component={Link}
                    to="/#contact"
                    sx={{ 
                      px: 4, 
                      py: 1.5, 
                      fontWeight: 600,
                      fontSize: '1.1rem',
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
              </Box>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default AboutUs;