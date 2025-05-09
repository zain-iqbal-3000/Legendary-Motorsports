import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';

const FleetStatus = ({ cars, onManageCar }) => {
  return (
    <Box sx={{ py: 4}}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Fleet Status
      </Typography>
      <Grid container spacing={3}>
        {cars.slice(0, 4).map((car) => (
          <Grid size={{xs:12,sm:6, md:3}} key={car._id}>
            <Card
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  height: 160,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  src={car.images?.[0] || 'https://via.placeholder.com/300'} // Fallback to placeholder image
                  alt={`${car.make} ${car.model}`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                  }}
                >
                  <Chip
                    label={car.availability?.isAvailable ? 'Available' : 'Unavailable'}
                    size="small"
                    sx={{
                      bgcolor: car.availability?.isAvailable
                        ? 'rgba(76, 175, 80, 0.8)'
                        : 'rgba(255, 189, 0, 0.8)',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </Box>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {car.make} {car.model}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {car.year} • ${car.availability?.rentalPrice?.daily || 'N/A'}/day
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  fullWidth
                  onClick={() => onManageCar(car)}
                >
                  Manage
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FleetStatus;