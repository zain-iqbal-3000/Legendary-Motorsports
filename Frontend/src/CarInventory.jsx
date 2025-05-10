import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Card, CardMedia, CardContent, Typography, Chip, Button, Container, Skeleton, Alert } from '@mui/material';
import { Speed, DirectionsCar, AttachMoney } from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';

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
    <Box sx={{ bgcolor: '#121212', py: 4, minHeight: '90vh' }}>
      <Container maxWidth="xl">
        <Typography variant="h4" fontWeight={700} mb={4} color="#FFD700">
          Our Hypercar Inventory
        </Typography>
        {loading && (
          <Grid container spacing={3}>
            {[...Array(8)].map((_, index) => (
              <Grid size={{xs:12, sm:6, md:4, lg:3}} key={index}>
                <Skeleton variant="rectangular" height={300} sx={{ bgcolor: '#1E1E1E' }} />
              </Grid>
            ))}
          </Grid>
        )}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && (
          <Grid container spacing={3}>
            {cars.map((car, index) => (
              <Grid size={{xs:12, sm:6, md:4, lg:3}} key={car._id || index}>
                <motion.div
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  layout
                >
                  <Card
                    sx={{
                      borderRadius: 2,
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: '#1E1E1E',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
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
                            bgcolor: '#FFD700',
                            color: '#1C1C1C',
                          }}
                        />
                      )}
                    </Box>
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        p: 2.5,
                        bgcolor: '#1E1E1E',
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="h2"
                        fontWeight={700}
                        gutterBottom
                        sx={{
                          lineHeight: 1.3,
                          color: '#FFD700',
                        }}
                      >
                        {car.make || 'Unknown'} {car.model || 'Car'}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="#B0B0B0"
                        sx={{ mb: 2 }}
                      >
                        Engine: {car.specifications?.engine?.type || 'N/A'}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        <Chip
                          size="small"
                          icon={<Speed fontSize="small" />}
                          label={`${car.specifications?.performance?.zeroToSixty || 'N/A'}s`}
                          sx={{
                            bgcolor: '#007BFF',
                            color: '#FFFFFF',
                            '& .MuiChip-icon': { color: 'inherit' },
                          }}
                        />
                        <Chip
                          size="small"
                          icon={<DirectionsCar fontSize="small" />}
                          label={`${car.specifications?.performance?.topSpeed || 'N/A'} mph`}
                          sx={{
                            bgcolor: '#007BFF',
                            color: '#FFFFFF',
                            '& .MuiChip-icon': { color: 'inherit' },
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          mt: 'auto',
                          pt: 1,
                          borderTop: '1px solid',
                          borderColor: '#B0B0B0',
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
                          <AttachMoney sx={{ color: '#FFD700', fontSize: 28 }} />
                          <Typography
                            variant="h5"
                            fontWeight={700}
                            color="#FFD700"
                            sx={{ lineHeight: 1 }}
                          >
                            ${car.availability?.rentalPrice?.daily || 'N/A'}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="#B0B0B0"
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
                            borderRadius: 1.5,
                            bgcolor: car.availability?.isAvailable ? '#3D007A' : '#FF4500',
                            color: '#FFFFFF',
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