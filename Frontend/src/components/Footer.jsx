import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Link,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  YouTube as YouTubeIcon,
} from '@mui/icons-material';

// Dark theme colors - consistent with other pages
const darkBg = "#111517"; // Dark background
const accentPrimary = "#3498db"; // Blue accent
const accentSecondary = "#f1c40f"; // Yellow accent
const darkPanel = "rgba(25, 28, 32, 0.85)";
const textPrimary = "#ffffff";
const textSecondary = "#a0a9b6";

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: darkBg, 
        color: textPrimary, 
        pt: 8, 
        pb: 4,
        borderTop: `1px solid ${accentPrimary}40`,
        backgroundImage: `linear-gradient(180deg, ${darkBg} 0%, rgba(10, 12, 14, 1) 100%)`,
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
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" fontWeight={700} mb={3} color={textPrimary}>
              Legendary Motorsports
            </Typography>
            <Typography variant="body2" mb={3} color={textSecondary}>
              The premier luxury car rental service offering the most exclusive hypercars worldwide. Experience automotive perfection with our curated fleet of the world's finest vehicles.
            </Typography>
            <Stack direction="row" spacing={2}>
              <IconButton 
                aria-label="Facebook" 
                href="#" 
                sx={{ 
                  color: textSecondary,
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    color: accentPrimary,
                    transform: 'translateY(-3px)' 
                  } 
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                aria-label="Instagram" 
                href="#" 
                sx={{ 
                  color: textSecondary,
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    color: accentPrimary,
                    transform: 'translateY(-3px)' 
                  } 
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                aria-label="Twitter" 
                href="#" 
                sx={{ 
                  color: textSecondary,
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    color: accentPrimary,
                    transform: 'translateY(-3px)' 
                  } 
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton 
                aria-label="YouTube" 
                href="#" 
                sx={{ 
                  color: textSecondary,
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    color: accentSecondary,
                    transform: 'translateY(-3px)' 
                  } 
                }}
              >
                <YouTubeIcon />
              </IconButton>
            </Stack>
          </Grid>
          
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" fontWeight={700} mb={3} color={textPrimary}>
              Quick Links
            </Typography>
            <Stack spacing={2}>
              {['Home', 'Our Fleet', 'About Us', 'Book Now', 'Contact'].map((link) => (
                <Link
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s/g, '-')}`}
                  underline="hover"
                  color={textSecondary}
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      color: accentPrimary,
                      transform: 'translateX(3px)',
                      display: 'inline-block'
                    } 
                  }}
                >
                  {link}
                </Link>
              ))}
            </Stack>
          </Grid>
          
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" fontWeight={700} mb={3} color={textPrimary}>
              Services
            </Typography>
            <Stack spacing={2}>
              {[
                'Hypercar Rentals',
                'Chauffeur Services',
                'Track Experiences',
                'Custom Road Trips',
                'Corporate Events',
              ].map((service) => (
                <Link 
                  key={service} 
                  href="#" 
                  underline="hover" 
                  color={textSecondary}
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      color: accentPrimary,
                      transform: 'translateX(3px)',
                      display: 'inline-block'
                    } 
                  }}
                >
                  {service}
                </Link>
              ))}
            </Stack>
          </Grid>
          
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" fontWeight={700} mb={3} color={textPrimary}>
              Legal
            </Typography>
            <Stack spacing={2}>
              {[
                'Terms & Conditions',
                'Privacy Policy',
                'Rental Agreement',
                'Insurance Policy',
                'FAQs',
              ].map((item) => (
                <Link 
                  key={item} 
                  href="#" 
                  underline="hover" 
                  color={textSecondary}
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      color: accentPrimary,
                      transform: 'translateX(3px)',
                      display: 'inline-block'
                    } 
                  }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Grid>
          
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" fontWeight={700} mb={3} color={textPrimary}>
              Contact
            </Typography>
            <Stack spacing={2}>
              <Typography variant="body2" color={textSecondary}>
                123 Luxury Lane
                <br />
                Beverly Hills, CA 90210
              </Typography>
              <Link 
                href="mailto:info@legendarymotorsports.com" 
                underline="hover" 
                color={textSecondary}
                sx={{ 
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    color: accentSecondary
                  } 
                }}
              >
                info@legendarymotorsports.com
              </Link>
              <Link 
                href="tel:+18005552277" 
                underline="hover" 
                color={textSecondary}
                sx={{ 
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    color: accentSecondary
                  } 
                }}
              >
                +1 (800) 555-CARS
              </Link>
            </Stack>
          </Grid>
        </Grid>
        
        <Divider sx={{ borderColor: `${accentPrimary}20`, my: 4 }} />
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', sm: 'flex-start' },
          textAlign: { xs: 'center', sm: 'left' }
        }}>
          <Typography variant="body2" color={textSecondary}>
            &copy; {new Date().getFullYear()} Legendary Motorsports. All rights reserved.
          </Typography>
          <Box sx={{ mt: { xs: 2, sm: 0 } }}>
            <Stack direction="row" spacing={3}>
              <Link 
                href="#" 
                underline="hover" 
                color={textSecondary}
                sx={{ 
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease',
                  '&:hover': { color: accentPrimary } 
                }}
              >
                Privacy Policy
              </Link>
              <Link 
                href="#" 
                underline="hover" 
                color={textSecondary}
                sx={{ 
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease',
                  '&:hover': { color: accentPrimary } 
                }}
              >
                Terms of Service
              </Link>
              <Link 
                href="#" 
                underline="hover" 
                color={textSecondary}
                sx={{ 
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease',
                  '&:hover': { color: accentPrimary } 
                }}
              >
                Sitemap
              </Link>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;