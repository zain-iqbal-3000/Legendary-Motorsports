import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Stack,
  Grid,
  Tabs,
  Tab,
  Card,
  CardContent,
  Avatar,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  Speed,
  AttachMoney,
  FlashOn,
  TrackChanges,
  LocationOn,
} from '@mui/icons-material';
import { motion, useAnimation } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';

// Mock car data
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

// Mock testimonials for this car
const testimonials = [
  {
    id: 1,
    content: "Driving the Aventador SVJ was pure adrenaline. The acceleration is insane and the car is a showstopper everywhere.",
    author: { name: "James Wilson", location: "Los Angeles, CA", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" }
  },
  {
    id: 2,
    content: "Impeccable service and a stunning car. Legendary Motorsports made my weekend unforgettable.",
    author: { name: "Sophia Chen", location: "Miami, FL", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" }
  }
];

const AnimatedCard = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.div>
);

const FeatureChip = ({ icon: Icon, label }) => (
  <Chip
    icon={<Icon sx={{ color: '#390099' }} />}
    label={label}
    sx={{
      m: 0.5,
      px: 2,
      py: 1,
      borderRadius: 2,
      bgcolor: '#ffd63322',
      color: '#390099',
      fontWeight: 700,
      fontSize: '1rem',
      border: '2px solid #ffd633'
    }}
  />
);

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const controls = useAnimation();
  const car = mockCarData;

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  const handleBack = () => {
    navigate('/carinventory');
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: '#390099',
      color: 'white',
      pt: 4,
      pb: 8,
    }}>
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{
            mb: 3,
            color: '#ffd633',
            fontWeight: 700,
            '&:hover': { bgcolor: '#ffd63322' }
          }}
        >
          Back to Fleet
        </Button>

        {/* Hero Section */}
        <Grid container spacing={4} alignItems="center" sx={{ mb: 6 }}>
          <Grid size={{xs:12, md:6}}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={controls}
              transition={{ delay: 0.15 }}
            >
              <Typography variant="h2" sx={{
                fontWeight: 900,
                fontSize: { xs: '2.2rem', md: '3.2rem' },
                background: 'linear-gradient(90deg, #ffd633 30%, #fff7b2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                letterSpacing: 1
              }}>
                {car.make} {car.model}
              </Typography>
              <Typography variant="h6" sx={{
                color: '#ffd633',
                fontWeight: 600,
                mb: 2
              }}>
                {car.year} &bull; {car.availability.location}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                <FeatureChip icon={FlashOn} label={`${car.specifications.engine.horsepower} HP`} />
                <FeatureChip icon={Speed} label={`${car.specifications.performance.topSpeed} km/h`} />
                <FeatureChip icon={TrackChanges} label={`0-100km/h ${car.specifications.performance.zeroToSixty}s`} />
              </Stack>
              <Typography variant="body1" sx={{
                fontSize: '1.15rem',
                lineHeight: 1.7,
                opacity: 0.92,
                mb: 3
              }}>
                {car.description}
              </Typography>
              <Chip
                icon={<LocationOn sx={{ color: '#390099' }} />}
                label={`Available in ${car.availability.location}`}
                sx={{
                  bgcolor: '#ffd633',
                  color: '#390099',
                  fontWeight: 600,
                  fontSize: '0.95rem'
                }}
              />
            </motion.div>
          </Grid>
          <Grid item size={{xs:12, md:6}}>
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <Card
                sx={{
                  borderRadius: 5,
                  boxShadow: '0 12px 40px #ffd63344',
                  border: '3px solid #ffd633',
                  overflow: 'hidden',
                  bgcolor: '#fff',
                  p: 0,
                  mb: 1
                }}
              >
                <Box
                  sx={{
                    height: { xs: 220, md: 340 },
                    backgroundImage: `url(${car.images[0]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Specifications and Pricing */}
        <Grid container spacing={4}>
          <Grid size={{xs:12, md:8}}>
            <AnimatedCard>
              <Card
                sx={{
                  bgcolor: '#2a005f',
                  borderRadius: 4,
                  boxShadow: '0 4px 24px #00000033',
                  border: '2px solid #ffd63344',
                  mb: 3
                }}
              >
                <CardContent>
                  <Tabs
                    value={tabValue}
                    onChange={(e, newVal) => setTabValue(newVal)}
                    sx={{
                      mb: 3,
                      '& .MuiTabs-indicator': { bgcolor: '#ffd633' },
                      '& .MuiTab-root': { color: '#ffd63399', fontWeight: 700, fontSize: '1.1rem' },
                      '& .Mui-selected': { color: '#ffd633' }
                    }}
                  >
                    <Tab label="Engine" />
                    <Tab label="Performance" />
                    <Tab label="Dimensions" />
                  </Tabs>
                  <Divider sx={{ mb: 2, borderColor: '#ffd63333' }} />
                  {tabValue === 0 && (
                    <Grid container spacing={2}>
                      {Object.entries(car.specifications.engine).map(([key, value]) => (
                        <Grid size={{xs:12, sm:6}} key={key}>
                          <Box sx={{
                            p: 2,
                            borderRadius: 2,
                            bgcolor: '#ffd63311',
                            border: '1.5px solid #ffd63333',
                            mb: 1
                          }}>
                            <Typography variant="overline" sx={{ color: '#ffd633cc', fontWeight: 700 }}>
                              {key.replace(/([A-Z])/g, ' $1')}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff' }}>
                              {value}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                  {tabValue === 1 && (
                    <Grid container spacing={2}>
                      {Object.entries(car.specifications.performance).map(([key, value]) => (
                        <Grid size={{xs:12, sm:6}} key={key}>
                          <Box sx={{
                            p: 2,
                            borderRadius: 2,
                            bgcolor: '#ffd63311',
                            border: '1.5px solid #ffd63333',
                            mb: 1
                          }}>
                            <Typography variant="overline" sx={{ color: '#ffd633cc', fontWeight: 700 }}>
                              {key.replace(/([A-Z])/g, ' $1')}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff' }}>
                              {value}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                  {tabValue === 2 && (
                    <Grid container spacing={2}>
                      {Object.entries(car.specifications.dimensions).map(([key, value]) => (
                        <Grid size={{xs:12, sm:6}} key={key}>
                          <Box sx={{
                            p: 2,
                            borderRadius: 2,
                            bgcolor: '#ffd63311',
                            border: '1.5px solid #ffd63333',
                            mb: 1
                          }}>
                            <Typography variant="overline" sx={{ color: '#ffd633cc', fontWeight: 700 }}>
                              {key.replace(/([A-Z])/g, ' $1')}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff' }}>
                              {value}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </CardContent>
              </Card>
            </AnimatedCard>
          </Grid>
          <Grid size={{xs:12, md:4}}>
            <AnimatedCard>
              <Card
                sx={{
                  bgcolor: '#ffd633',
                  color: '#390099',
                  borderRadius: 4,
                  boxShadow: '0 2px 24px #ffd63355',
                  border: '2px solid #39009933',
                  mb: 3
                }}
              >
                <CardContent>
                  <Typography variant="h5" sx={{
                    fontWeight: 800,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <AttachMoney sx={{ color: '#390099' }} /> Rental Rates
                  </Typography>
                  <Stack spacing={2} sx={{ mb: 3 }}>
                    {Object.entries(car.availability.rentalPrice).map(([period, price]) => (
                      <Box key={period} sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: '#fffde4',
                        border: '1px solid #39009922'
                      }}>
                        <Typography variant="body1" sx={{ textTransform: 'capitalize', fontWeight: 700 }}>
                          {period}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 900 }}>
                          ${price.toLocaleString()}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                  <Button
                    component={Link}
                    to={`/booking/${car.id}`}
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      bgcolor: '#390099',
                      color: '#ffd633',
                      fontWeight: 800,
                      fontSize: '1.1rem',
                      '&:hover': {
                        bgcolor: '#2a005f'
                      },
                      boxShadow: '0 4px 16px #39009922',
                      transition: 'all 0.2s'
                    }}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </AnimatedCard>
          </Grid>
        </Grid>

        {/* Testimonials */}
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 8 }}>
          <Typography variant="h4" sx={{
            fontWeight: 800,
            mb: 3,
            color: '#ffd633',
            letterSpacing: 1
          }}>
            What Our Customers Say
          </Typography>
          <Stack spacing={3}>
            {testimonials.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card sx={{
                  bgcolor: '#fff',
                  color: '#390099',
                  borderRadius: 3,
                  boxShadow: '0 2px 12px #ffd63333',
                  borderLeft: '6px solid #ffd633',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  p: 2
                }}>
                  <Avatar
                    src={review.author.image}
                    alt={review.author.name}
                    sx={{ width: 56, height: 56, border: '2px solid #ffd633' }}
                  />
                  <Box>
                    <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 1, color: '#390099' }}>
                      "{review.content}"
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {review.author.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#390099' }}>
                      {review.author.location}
                    </Typography>
                  </Box>
                </Card>
              </motion.div>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default CarDetail;
