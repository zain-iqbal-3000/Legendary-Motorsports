import { useState, useEffect } from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography, Chip, Button } from '@mui/material';
import { Speed, DirectionsCar, AttachMoney } from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CarInventory() {
  const [cars, setCars] = useState([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    // Fetch car data from the backend
    const fetchCars = async () => {
      try {
        const response = await axios.get('/api/cars'); // Adjust the endpoint if necessary
        console.log('Fetched cars:', response.data); // Log the fetched data
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    fetchCars();
  }, []);

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 4, bgcolor: 'secondary.main',height:'90vh' }}>
      <Typography variant="h4" fontWeight={700} mb={3} color="primary.main">
        Our Hypercar Inventory
      </Typography>
      <Grid container spacing={4}>
        {cars.map((car) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={car._id}>
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(57,0,153,0.18)' }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: 6,
                  position: 'relative',
                  background: '#fff',
                  transition: 'box-shadow 0.3s',
                  maxWidth: 320,
                  maxHeight: 470,
                }}
                onMouseEnter={() => setHovered(car._id)}
                onMouseLeave={() => setHovered(null)}
              >
                <CardMedia
                  component="img"
                  height="210"
                  image={car.images?.[0] || 'https://via.placeholder.com/300'} // Fallback to placeholder image
                  alt={`${car.make || 'Unknown'} ${car.model || 'Car'}`}
                  sx={{
                    objectFit: 'cover',
                    transition: 'transform 0.3s',
                    transform: hovered === car._id ? 'scale(1.04)' : 'scale(1)',
                  }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {car.make || 'Unknown'} {car.model || 'Car'}
                  </Typography>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Chip
                      icon={<Speed fontSize="small" />}
                      label={`0-60 mph: ${car.specifications?.performance?.zeroToSixty || 'N/A'}s`}
                      sx={{ mr: 1, bgcolor: 'primary.main', color: 'primary.blue' }}
                      size="small"
                    />
                    <Chip
                      icon={<DirectionsCar fontSize="small" />}
                      label={`Top Speed: ${car.specifications?.performance?.topSpeed || 'N/A'} mph`}
                      sx={{ mr: 1, bgcolor: 'primary.main', color: 'primary.blue' }}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Engine: {car.specifications?.engine?.type || 'N/A'}
                  </Typography>
                  <Box display="flex" alignItems="center" mb={1 }>
                    <AttachMoney sx={{ color: 'green', mr: 0.5 }} />
                    <Typography variant="subtitle1" fontWeight={600} color="green">
                      ${car.availability?.rentalPrice?.daily || 'N/A'} / day
                    </Typography>
                  </Box>
                  <Chip
                    label={car.availability?.isAvailable ? 'Available' : 'Unavailable'}
                    color={car.availability?.isAvailable ? 'success' : 'default'}
                    sx={{ fontWeight: 500, mb: 1 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2, fontWeight: 600 }}
                    disabled={!car.availability?.isAvailable}
                  >
                    {car.availability?.isAvailable ? 'Book Now' : 'Unavailable'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}