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

const Footer = ({ primaryColour = '#ffd633' }) => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: '#040430', 
        color: 'white', 
        pt: 8, 
        pb: 4,
        borderTop: `1px solid ${primaryColour}40`
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" fontWeight={700} mb={3} color="white">
              Legendary Motorsports
            </Typography>
            <Typography variant="body2" mb={3} color="text.secondary">
              The premier luxury car rental service offering the most exclusive hypercars worldwide. Experience automotive perfection with our curated fleet of the world's finest vehicles.
            </Typography>
            <Stack direction="row" spacing={2}>
              <IconButton 
                aria-label="Facebook" 
                href="#" 
                sx={{ 
                  color: 'white',
                  '&:hover': { color: primaryColour } 
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                aria-label="Instagram" 
                href="#" 
                sx={{ 
                  color: 'white',
                  '&:hover': { color: primaryColour } 
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                aria-label="Twitter" 
                href="#" 
                sx={{ 
                  color: 'white',
                  '&:hover': { color: primaryColour } 
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton 
                aria-label="YouTube" 
                href="#" 
                sx={{ 
                  color: 'white',
                  '&:hover': { color: primaryColour } 
                }}
              >
                <YouTubeIcon />
              </IconButton>
            </Stack>
          </Grid>
          
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" fontWeight={700} mb={3} color="white">
              Quick Links
            </Typography>
            <Stack spacing={2}>
              {['Home', 'Our Fleet', 'About Us', 'Book Now', 'Contact'].map((link) => (
                <Link
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s/g, '-')}`}
                  underline="hover"
                  color="text.secondary"
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': { color: primaryColour } 
                  }}
                >
                  {link}
                </Link>
              ))}
            </Stack>
          </Grid>
          
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" fontWeight={700} mb={3} color="white">
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
                  color="text.secondary" 
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': { color: primaryColour } 
                  }}
                >
                  {service}
                </Link>
              ))}
            </Stack>
          </Grid>
          
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" fontWeight={700} mb={3} color="white">
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
                  color="text.secondary" 
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': { color: primaryColour } 
                  }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Grid>
          
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" fontWeight={700} mb={3} color="white">
              Contact
            </Typography>
            <Stack spacing={2}>
              <Typography variant="body2" color="text.secondary">
                123 Luxury Lane
                <br />
                Beverly Hills, CA 90210
              </Typography>
              <Link 
                href="mailto:info@legendarymotorsports.com" 
                underline="hover" 
                color="text.secondary"
                sx={{ '&:hover': { color: primaryColour } }}
              >
                info@legendarymotorsports.com
              </Link>
              <Link 
                href="tel:+18005552277" 
                underline="hover" 
                color="text.secondary"
                sx={{ '&:hover': { color: primaryColour } }}
              >
                +1 (800) 555-CARS
              </Link>
            </Stack>
          </Grid>
        </Grid>
        
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 4 }} />
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', sm: 'flex-start' },
          textAlign: { xs: 'center', sm: 'left' }
        }}>
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} Legendary Motorsports. All rights reserved.
          </Typography>
          <Box sx={{ mt: { xs: 2, sm: 0 } }}>
            <Stack direction="row" spacing={3}>
              <Link 
                href="#" 
                underline="hover" 
                color="text.secondary"
                sx={{ fontSize: '0.875rem', '&:hover': { color: primaryColour } }}
              >
                Privacy Policy
              </Link>
              <Link 
                href="#" 
                underline="hover" 
                color="text.secondary"
                sx={{ fontSize: '0.875rem', '&:hover': { color: primaryColour } }}
              >
                Terms of Service
              </Link>
              <Link 
                href="#" 
                underline="hover" 
                color="text.secondary"
                sx={{ fontSize: '0.875rem', '&:hover': { color: primaryColour } }}
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