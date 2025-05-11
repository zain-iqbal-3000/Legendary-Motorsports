import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Card, CardMedia, CardContent, Typography, Chip, Button, Container, Skeleton, Alert } from '@mui/material';
import { Speed, DirectionsCar, AttachMoney, ElectricBolt, AltRoute, Engineering } from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';

// Dark theme colors
const darkBg = "#111517"; // Dark background
const accentPrimary = "#3498db"; // Blue accent
const accentSecondary = "#f1c40f"; // Yellow accent (formerly teal)
const darkPanel = "rgba(25, 28, 32, 0.85)";
const cardBg = "rgba(21, 24, 28, 0.95)";
const textPrimary = "#ffffff";
const textSecondary = "#a0a9b6";
const border = `1px solid ${accentPrimary}33`;

// Clean subtle effects
const glowEffect = `0 0 15px ${accentPrimary}40`;
const subtleShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
  hover: {
    y: -8,
    boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

export default function CarInventory() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/cars');
        setCars(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching car data:', error);
        setError('Failed to load car inventory. Please try again later.');
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <Box 
      sx={{
        bgcolor: darkBg,
        py: 4,
        minHeight: '90vh',
        position: 'relative',
        background: `linear-gradient(180deg, ${darkBg} 0%, rgba(10, 12, 14, 1) 100%)`,
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
      
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 5, textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            fontWeight={700} 
            mb={1.5} 
            color={textPrimary}
          >
            Our Hypercar Inventory
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              maxWidth: 700, 
              mx: 'auto',
              color: textSecondary,
            }}
          >
            Explore our exclusive collection of the world's most prestigious hypercars
          </Typography>
        </Box>
        
        {loading && (
          <Grid container spacing={3}>
            {[...Array(8)].map((_, index) => (
              <Grid size={{xs:12, sm:6, md:4, lg:3}}  key={index}>
                <Skeleton 
                  variant="rectangular" 
                  height={300} 
                  sx={{ 
                    bgcolor: 'rgba(30, 30, 30, 0.5)',
                    borderRadius: 2,
                  }} 
                />
              </Grid>
            ))}
          </Grid>
        )}
        
        {error && (
          <Alert 
            severity="error" 
            sx={{
              bgcolor: 'rgba(211, 47, 47, 0.15)',
              color: '#ff8a80',
              '& .MuiAlert-icon': {
                color: '#ff8a80',
              }
            }}
          >
            {error}
          </Alert>
        )}
        
        {!loading && !error && (
          <Grid container spacing={3}>
            {cars.map((car, index) => (
              <Grid size={{xs:12, sm:6, md:4, lg:3}}  key={car._id || index}>
                <motion.div
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  layout
                  onMouseEnter={() => setHovered(car._id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Card
                    sx={{
                      borderRadius: 3,
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: cardBg,
                      boxShadow: subtleShadow,
                      border: border,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: glowEffect,
                        border: `1px solid ${accentPrimary}60`,
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative', pt: '62.5%' }}>
                      <CardMedia
                        component="img"
                        image={car.images?.[0] || 'https://via.placeholder.com/300'}
                        alt={`${car.make || 'Unknown'} ${car.model || 'Car'}`}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                          transform: hovered === car._id ? 'scale(1.05)' : 'scale(1)',
                        }}
                      />
                      {car.availability?.isAvailable && (
                        <Chip
                          label="Available"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            fontWeight: 600,
                            bgcolor: accentSecondary,
                            color: '#1C1C1C',
                          }}
                        />
                      )}
                      
                      {/* Add a small stats overlay */}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          p: 1,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Chip
                          size="small"
                          avatar={<ElectricBolt sx={{ color: accentPrimary, fontSize: 16 }} />}
                          label={`${car.specifications?.engine?.horsepower || 'N/A'} HP`}
                          sx={{
                            bgcolor: 'rgba(0,0,0,0.7)',
                            color: accentPrimary,
                            border: `1px solid ${accentPrimary}50`,
                            '& .MuiChip-avatar': { 
                              color: accentPrimary,
                              bgcolor: 'transparent'
                            },
                          }}
                        />
                        <Chip
                          size="small"
                          avatar={<AltRoute sx={{ color: accentSecondary, fontSize: 16 }} />}
                          label={`${car.specifications?.performance?.zeroToSixty || 'N/A'}s`}
                          sx={{
                            bgcolor: 'rgba(0,0,0,0.7)',
                            color: accentSecondary,
                            border: `1px solid ${accentSecondary}50`,
                            '& .MuiChip-avatar': { 
                              color: accentSecondary,
                              bgcolor: 'transparent'
                            },
                          }}
                        />
                      </Box>
                    </Box>
                    
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        p: 2.5,
                        bgcolor: darkPanel,
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="h2"
                        fontWeight={700}
                        gutterBottom
                        sx={{
                          lineHeight: 1.3,
                          color: textPrimary,
                        }}
                      >
                        {car.make || 'Unknown'} {car.model || 'Car'}
                      </Typography>
                      
                      <Typography
                        variant="body2"
                        color={textSecondary}
                        sx={{ mb: 2 }}
                      >
                        {car.year} • {car.specifications?.engine?.type || 'N/A'}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        <Chip
                          size="small"
                          avatar={<Speed fontSize="small" />}
                          label={`${car.specifications?.performance?.topSpeed || 'N/A'} km/h`}
                          sx={{
                            bgcolor: `${accentPrimary}15`,
                            color: accentPrimary,
                            borderRadius: 1.5,
                            border: `1px solid ${accentPrimary}30`,
                            '& .MuiChip-avatar': { 
                              color: accentPrimary,
                              bgcolor: 'transparent'
                            },
                          }}
                        />
                        <Chip
                          size="small"
                          avatar={<Engineering fontSize="small" />}
                          label={car.specifications?.engine?.transmission || 'Auto'}
                          sx={{
                            bgcolor: `${accentSecondary}15`,
                            color: accentSecondary,
                            borderRadius: 1.5,
                            border: `1px solid ${accentSecondary}30`,
                            '& .MuiChip-avatar': { 
                              color: accentSecondary,
                              bgcolor: 'transparent'
                            },
                          }}
                        />
                      </Box>
                      
                      <Box
                        sx={{
                          mt: 'auto',
                          pt: 1.5,
                          borderTop: '1px solid',
                          borderColor: `${accentPrimary}20`,
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 2,
                            justifyContent: 'center',
                          }}
                        >
                          <AttachMoney sx={{ color: accentSecondary, fontSize: 28 }} />
                          <Typography
                            variant="h5"
                            fontWeight={700}
                            color={accentSecondary}
                            sx={{ lineHeight: 1 }}
                          >
                            ${car.availability?.rentalPrice?.daily?.toLocaleString() || 'N/A'}
                          </Typography>
                          <Typography
                            variant="body2"
                            color={textSecondary}
                            sx={{ ml: 0.5, mt: 0.5 }}
                          >
                            / day
                          </Typography>
                        </Box>
                        
                        <Button
                          component={Link}
                          to={`/cardetail/${car._id}`}
                          variant="contained"
                          fullWidth
                          size="large"
                          sx={{
                            fontWeight: 600,
                            textTransform: 'none',
                            borderRadius: 2,
                            bgcolor: car.availability?.isAvailable ? '#673AB7' : '#FF4500',
                            color: textPrimary,
                            py: 1,
                            transition: 'all 0.3s',
                            '&:hover': { 
                              bgcolor: car.availability?.isAvailable ? accentSecondary : '#FF6347',
                              transform: 'translateY(-3px)',
                              boxShadow: car.availability?.isAvailable ? glowEffect : 'none'
                            }
                          }}
                          disabled={!car.availability?.isAvailable}
                        >
                          {car.availability?.isAvailable ? 'View Details' : 'Unavailable'}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}