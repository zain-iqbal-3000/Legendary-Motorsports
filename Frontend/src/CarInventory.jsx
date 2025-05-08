// CarInventory.jsx
import { useState } from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography, Chip, Button } from '@mui/material';
import { Speed, DirectionsCar, AttachMoney } from '@mui/icons-material';
import { motion } from 'framer-motion';

// Inventory data (from Dashboard/Home)
const cars = [
  {
    id: 1,
    name: 'Lamborghini Aventador',
    image: 'https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    specs: { acceleration: '0-60 mph: 2.8s', topSpeed: '217 mph', engine: '6.5L V12' },
    price: '$2,500 / day',
    status: 'Available',
  },
  {
    id: 2,
    name: 'Ferrari SF90 Stradale',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    specs: { acceleration: '0-60 mph: 2.5s', topSpeed: '211 mph', engine: '4.0L V8 Hybrid' },
    price: '$3,000 / day',
    status: 'Rented',
  },
  {
    id: 3,
    name: 'McLaren 720S',
    image: 'https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    specs: { acceleration: '0-60 mph: 2.7s', topSpeed: '212 mph', engine: '4.0L V8 Twin-Turbo' },
    price: '$2,800 / day',
    status: 'Maintenance',
  },
  {
    id: 4,
    name: 'Bugatti Chiron',
    image: 'https://images.unsplash.com/photo-1546544336-7e8dde09e523?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    specs: { acceleration: '0-60 mph: 2.4s', topSpeed: '261 mph', engine: '8.0L W16 Quad-Turbo' },
    price: '$4,500 / day',
    status: 'Available',
  },
  {
    id: 5,
    name: 'Porsche 911 GT2 RS',
    image: 'https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    specs: { acceleration: '0-60 mph: 2.7s', topSpeed: '211 mph', engine: '3.8L Twin-Turbo Flat-6' },
    price: '$2,200 / day',
    status: 'Available',
  },
  {
    id: 6,
    name: 'Aston Martin DBS Superleggera',
    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    specs: { acceleration: '0-60 mph: 3.2s', topSpeed: '211 mph', engine: '5.2L Twin-Turbo V12' },
    price: '$2,700 / day',
    status: 'Available',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CarInventory() {
  const [hovered, setHovered] = useState(null);

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 4, bgcolor: 'secondary.main' }}>
      <Typography variant="h4" fontWeight={700} mb={3} color="primary.main">
        Our Hypercar Inventory
      </Typography>
      <Grid container spacing={4}>
        {cars.map((car, idx) => (
          <Grid size={{ xs:12, sm:6,  md:4}} key={car.id}>
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(57,0,153,0.18)" }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: 6,
                  position: 'relative',
                  background: '#fff',
                  transition: 'box-shadow 0.3s',
                }}
                onMouseEnter={() => setHovered(car.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <CardMedia
                  component="img"
                  height="210"
                  image={car.image}
                  alt={car.name}
                  sx={{ objectFit: 'cover', transition: 'transform 0.3s', transform: hovered === car.id ? 'scale(1.04)' : 'scale(1)' }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {car.name}
                  </Typography>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Chip
                      icon={<Speed fontSize="small" />}
                      label={car.specs.acceleration}
                      sx={{ mr: 1, bgcolor: 'primary.main', color: 'primary.blue' }}
                      size="small"
                    />
                    <Chip
                      icon={<DirectionsCar fontSize="small" />}
                      label={car.specs.topSpeed}
                      sx={{ mr: 1, bgcolor: 'primary.main', color: 'primary.blue' }}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Engine: {car.specs.engine}
                  </Typography>
                  <Box display="flex" alignItems="center" mb={2}>
                    <AttachMoney sx={{ color: 'primary.main', mr: 0.5 }} />
                    <Typography variant="subtitle1" fontWeight={600} color="primary.main">
                      {car.price}
                    </Typography>
                  </Box>
                  <Chip
                    label={car.status}
                    color={
                      car.status === 'Available'
                        ? 'success'
                        : car.status === 'Rented'
                        ? 'warning'
                        : 'default'
                    }
                    sx={{ fontWeight: 500, mb: 1 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2, fontWeight: 600 }}
                    disabled={car.status !== 'Available'}
                  >
                    {car.status === 'Available' ? 'Book Now' : 'Unavailable'}
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
