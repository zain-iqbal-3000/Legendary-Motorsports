import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Chip, Button, CardMedia } from '@mui/material';
import { motion } from 'framer-motion';

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

const FleetStatus = ({ cars = [], onManageCar }) => {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#FFD700' }}>
        Fleet Status
      </Typography>
      <Grid container spacing={3}>
        {cars.slice(0, 4).map((car, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={car._id || index}>
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
                    }}
                  />
                  <Chip
                    label={car.availability?.isAvailable ? 'Available' : 'Unavailable'}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      fontWeight: 600,
                      bgcolor: car.availability?.isAvailable ? '#FFD700' : '#FF9800',
                      color: car.availability?.isAvailable ? '#1C1C1C' : '#fff',
                    }}
                  />
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
                    sx={{ color: '#B0B0B0', mb: 2 }}
                  >
                    {car.year} • ${car.availability?.rentalPrice?.daily || 'N/A'}/day
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    fullWidth
                    onClick={() => onManageCar && onManageCar(car)}
                    sx={{
                      mt: 'auto',
                      bgcolor: '#3D007A',
                      color: '#fff',
                      fontWeight: 600,
                      borderRadius: 1.5,
                      textTransform: 'none',
                      boxShadow: 'none',
                      '&:hover': {
                        bgcolor: '#2a0054',
                      },
                    }}
                  >
                    Manage
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FleetStatus;
