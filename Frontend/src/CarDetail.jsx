import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  IconButton, 
  Chip, 
  Stack, 
  Grid, 
  Tabs, 
  Tab, 
  Divider,
  Card,
  CardContent,
  LinearProgress,
  useScrollTrigger
} from '@mui/material';
import { 
  ArrowBack, 
  Speed, 
  DirectionsCar, 
  AttachMoney, 
  CalendarToday, 
  LocationOn,
  Info,
  FlashOn,
  Palette,
  TrackChanges
} from '@mui/icons-material';
import { motion, useAnimation } from 'framer-motion';

const mockCarData = {
  make: "Lamborghini",
  model: "Aventador SVJ",
  year: 2022,
  description: "The pinnacle of automotive engineering, combining breathtaking performance with cutting-edge technology.",
  images: [
    "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  ],
  specifications: {
    engine: {
      type: "V12 Naturally Aspirated",
      displacement: "6.5L",
      horsepower: 770,
      torque: 720,
      transmission: "7-Speed ISR Automated Manual",
      drivetrain: "All-Wheel Drive"
    },
    performance: {
      topSpeed: 350,
      zeroToSixty: 2.8,
      quarterMile: 10.4,
      nürburgringTime: 6.8
    },
    dimensions: {
      length: 4943,
      width: 2098,
      height: 1136,
      wheelbase: 2700,
      curbWeight: 1525
    }
  },
  availability: {
    isAvailable: true,
    location: "Los Angeles",
    rentalPrice: {
      daily: 2999,
      weekly: 19999,
      monthly: 69999
    }
  }
};

const AnimatedCard = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.div>
);

const FeatureChip = ({ icon: Icon, label }) => (
  <motion.div whileHover={{ scale: 1.05 }}>
    <Chip
      icon={<Icon color="primary" />}
      label={label}
      sx={{
        m: 1,
        px: 2,
        py: 1,
        borderRadius: 2,
        bgcolor: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.2)'
      }}
    />
  </motion.div>
);

const CarDetail = ({ onBack }) => {
  const [tabValue, setTabValue] = useState(0);
  const controls = useAnimation();
  const car = mockCarData;

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: '#390099',
      color: 'white',
      pt: 4,
      pb: 10,
    }}>
      <Container>
        <Button
          startIcon={<ArrowBack />}
          onClick={onBack}
          sx={{ 
            mb: 2, 
            color: 'white',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
          }}
        >
          Back to Fleet
        </Button>

        {/* Hero Section */}
        <Grid container spacing={6} sx={{ mb: 8 }}>
          <Grid size={{ xs:12, md:6 }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={controls}
              transition={{ delay: 0.2 }}
            >
              <Typography variant="h1" sx={{ 
                fontWeight: 900,
                fontSize: { xs: '3rem', md: '4rem' },
                lineHeight: 1.2,
                mb: 3,
                background: 'linear-gradient(45deg, #ffbd00 30%, #ff9100 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {car.make} {car.model}
              </Typography>
              
              <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                <FeatureChip icon={FlashOn} label={`${car.specifications.engine.horsepower} HP`} />
                <FeatureChip icon={Speed} label={`${car.specifications.performance.topSpeed} km/h`} />
                <FeatureChip icon={TrackChanges} label={`0-100km/h ${car.specifications.performance.zeroToSixty}s`} />
              </Stack>

              <Typography variant="body1" sx={{ 
                fontSize: '1.1rem',
                lineHeight: 1.8,
                mb: 4,
                opacity: 0.9
              }}>
                {car.description}
              </Typography>
            </motion.div>
          </Grid>

          <Grid size={{ xs:12, md:6 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Box
                sx={{
                  height: { xs: 300, md: 400 },
                  borderRadius: 4,
                  backgroundImage: `url(${car.images[0]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(57,0,153,0.3) 0%, rgba(255,189,0,0.1) 100%)',
                    borderRadius: 4
                  }
                }}
              />
            </motion.div>
          </Grid>
        </Grid>

        {/* Specifications */}
        <Grid container spacing={6} sx={{ mb: 8 }}>
          <Grid size={{ xs:12, md:8 }}>
            <AnimatedCard>
              <Box sx={{ 
                bgcolor: 'rgba(255,255,255,0.05)',
                borderRadius: 4,
                p: 4,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
              }}>
                <Tabs
                  value={tabValue}
                  onChange={(e, newVal) => setTabValue(newVal)}
                  sx={{
                    mb: 4,
                    '& .MuiTabs-indicator': { bgcolor: 'primary.main' },
                    '& .MuiTab-root': { color: 'rgba(255,255,255,0.7)' },
                    '& .Mui-selected': { color: 'primary.main' }
                  }}
                >
                  <Tab label="Engine Specs" />
                  <Tab label="Performance" />
                  <Tab label="Dimensions" />
                </Tabs>

                {tabValue === 0 && (
                  <Grid container spacing={3}>
                    {Object.entries(car.specifications.engine).map(([key, value]) => (
                      <Grid size={{ xs:12, sm:6 }} key={key}>
                        <Box sx={{ 
                          p: 3,
                          borderRadius: 2,
                          bgcolor: 'rgba(255,255,255,0.03)',
                          height: '100%'
                        }}>
                          <Typography variant="overline" color="textSecondary">
                            {key.replace(/([A-Z])/g, ' $1')}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {value}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}

                {tabValue === 1 && (
                  <Grid container spacing={3}>
                    {Object.entries(car.specifications.performance).map(([key, value]) => (
                      <Grid size={{ xs:12, sm:6 }} key={key}>
                        <Box sx={{ 
                          p: 3,
                          borderRadius: 2,
                          bgcolor: 'rgba(255,255,255,0.03)',
                          height: '100%'
                        }}>
                          <Typography variant="overline" color="textSecondary">
                            {key.replace(/([A-Z])/g, ' $1')}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {value}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}

                {tabValue === 2 && (
                  <Grid container spacing={3}>
                    {Object.entries(car.specifications.dimensions).map(([key, value]) => (
                      <Grid size={{ xs:12, sm:6 }} key={key}>
                        <Box sx={{ 
                          p: 3,
                          borderRadius: 2,
                          bgcolor: 'rgba(255,255,255,0.03)',
                          height: '100%'
                        }}>
                          <Typography variant="overline" color="textSecondary">
                            {key.replace(/([A-Z])/g, ' $1')}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {value}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            </AnimatedCard>
          </Grid>

          {/* Pricing Card */}
          <Grid size={{ xs:12, md:4 }}>
            <AnimatedCard>
              <Box
                sx={{
                  position: 'sticky',
                  top: 100,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  p: 4,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}
              >
                <Typography variant="h4" sx={{ 
                  fontWeight: 700,
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <AttachMoney fontSize="large" /> Rental Rates
                </Typography>

                <Stack spacing={3} sx={{ mb: 4 }}>
                  {Object.entries(car.availability.rentalPrice).map(([period, price]) => (
                    <motion.div key={period} whileHover={{ x: 5 }}>
                      <Box sx={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'rgba(255,255,255,0.05)'
                      }}>
                        <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                          {period}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          ${price.toLocaleString()}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Stack>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    py: 2,
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    color: '#212121',
                    fontWeight: 700,
                    '&:hover': {
                      bgcolor: 'primary.dark',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Book Now
                </Button>
              </Box>
            </AnimatedCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CarDetail;