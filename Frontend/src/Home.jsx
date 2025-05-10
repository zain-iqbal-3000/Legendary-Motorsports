import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Divider,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  IconButton,
  Link,
  Paper,
  useTheme,
  createTheme,
  ThemeProvider,
  Skeleton,
  Alert,
} from '@mui/material';
import {
  Speed as SpeedIcon,
  ShutterSpeed as ShutterSpeedIcon,
  Build as BuildIcon,
  Support as SupportIcon,
  Security as SecurityIcon,
  LocationOn as LocationIcon,
  Search as SearchIcon,
  CalendarToday as CalendarTodayIcon,
  VerifiedUser as VerifiedUserIcon,
  DriveEta as DriveEtaIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  YouTube as YouTubeIcon,
  EmojiEvents as TrophyIcon,
  DirectionsCar as DirectionsCarIcon,
  LocalGasStation as FuelIcon,
  AttachMoney as MoneyIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  ArrowRightAlt as ArrowRightIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';

// Create dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffd633',
      blue: '#1a237e'
    },
    secondary: {
      main: '#390099',
    },
    background: {
      default: '#111',
      paper: '#1a1a1a',
      darker: '#0a0a0a',
      card: '#222',
      accent: '#1e1e2f'
    },
    text: {
      primary: '#f5f5f5',
      secondary: '#b0b0b0',
    }
  },
  typography: {
    fontFamily: "'Montserrat', 'Roboto', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    body1: {
      fontFamily: "'Open Sans', 'Roboto', sans-serif",
    }
  }
});

const Home = () => {
  const theme = darkTheme;
  const navigate = useNavigate();
  const primaryColour = theme.palette.primary.main; // #ffd633
  const secondaryColour = theme.palette.secondary.main; // #390099
  const darkBg = theme.palette.background.darker;
  const cardBg = theme.palette.background.card;

  // ===== HERO SECTION =====
  const [activeImage, setActiveImage] = useState(0);
  const heroImages = [
    'https://images.unsplash.com/photo-1592198084033-aade902d1aae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  ];

  // ===== CARS SECTION =====
  const [hoveredCard, setHoveredCard] = useState(null);
  const [carsData, setCarsData] = useState([]);
  const [carsLoading, setCarsLoading] = useState(true);
  const [carsError, setCarsError] = useState(null);

  // ===== BOOKING SECTION =====
  const [bookingFormData, setBookingFormData] = useState({
    selectedCar: '',
    pickupDate: '',
    returnDate: '',
    fullName: '',
    email: '',
    phone: '',
  });

  // ===== TESTIMONIALS SECTION =====
  const testimonials = [
    {
      id: 1,
      content:
        'Renting the Lamborghini Aventador from Legendary Motorsports was the highlight of my year. The car was immaculate, and the service was beyond exceptional. The team went out of their way to ensure I had an unforgettable experience.',
      author: {
        name: 'James Wilson',
        location: 'Los Angeles, CA',
        image:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      },
    },
    {
      id: 2,
      content:
        "As a car enthusiast, I've rented from many luxury car services, but Legendary Motorsports stands apart. The Ferrari SF90 was delivered in pristine condition, and the staff's knowledge and passion for hypercars added to the overall experience.",
      author: {
        name: 'Sophia Chen',
        location: 'Miami, FL',
        image:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      },
    },
    {
      id: 3,
      content:
        "Legendary Motorsports made my 40th birthday truly special. Driving the McLaren 720S along the coast was a dream come true. The booking process was seamless, and the concierge service was top-notch. I'll definitely be returning for more experiences!",
      author: {
        name: 'Michael Johnson',
        location: 'New York, NY',
        image:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      },
    },
    {
      id: 4,
      content:
        "The Bugatti Chiron I rented exceeded all expectations. Not only was the car itself a marvel of engineering, but the attention to detail from the Legendary Motorsports team made the entire experience unforgettable. Their personalized service is unmatched.",
      author: {
        name: 'Emma Rodriguez',
        location: 'Dubai, UAE',
        image:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      },
    },
  ];
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef(null);

  // ===== ANIMATION VARIANTS =====
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25, delayChildren: 0.3 },
    },
  };
  const heroItemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };
  const backgroundVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 1.2, ease: 'easeOut' } },
    exit: { opacity: 0, transition: { duration: 1, ease: 'easeIn' } },
  };
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };
  const aboutItemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };
  const imageVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };
  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0, transition: { duration: 0.5, ease: 'easeIn' } }),
  };

  // ===== BENEFITS SECTION =====
  const benefitsData = [
    {
      icon: <SpeedIcon sx={{ fontSize: 48, color: primaryColour }} />,
      title: 'Unlimited Mileage',
      description: 'Drive as far as your adventure takes you with our no-limit mileage policy on select rentals.',
    },
    {
      icon: <LocationIcon sx={{ fontSize: 48, color: primaryColour }} />,
      title: 'Door-to-Door Delivery',
      description: 'We deliver your dream car directly to your hotel, home, or airport for maximum convenience.',
    },
    {
      icon: <SupportIcon sx={{ fontSize: 48, color: primaryColour }} />,
      title: '24/7 Concierge',
      description: 'Our dedicated support team is available around the clock to ensure a flawless experience.',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 48, color: primaryColour }} />,
      title: 'Premium Insurance',
      description: "Drive with complete peace of mind knowing you're covered by our comprehensive insurance.",
    },
    {
      icon: <FuelIcon sx={{ fontSize: 48, color: primaryColour }} />,
      title: 'Fuel Included',
      description: 'All our rentals come with a full tank of premium fuel, ready for your adventure.',
    },
    {
      icon: <TrophyIcon sx={{ fontSize: 48, color: primaryColour }} />,
      title: 'VIP Experiences',
      description: 'Access to exclusive events, tracks, and routes normally closed to the public.',
    },
  ];

  // ===== HOW IT WORKS SECTION =====
  const processSteps = [
    {
      number: '01',
      title: 'Browse & Select',
      description:
        'Explore our curated collection of luxury and exotic vehicles. Filter by make, model, or performance specs to find your perfect match.',
      icon: <SearchIcon sx={{ fontSize: 36, color: primaryColour }} />,
    },
    {
      number: '02',
      title: 'Reserve Online',
      description: 'Choose your rental dates and complete our streamlined booking process. Secure your dream car with just a few clicks.',
      icon: <CalendarTodayIcon sx={{ fontSize: 36, color: primaryColour }} />,
    },
    {
      number: '03',
      title: 'Verification',
      description: 'Our team will verify your driving credentials and process your reservation within minutes.',
      icon: <VerifiedUserIcon sx={{ fontSize: 36, color: primaryColour }} />,
    },
    {
      number: '04',
      title: 'Enjoy the Ride',
      description: 'Your dream car will be delivered to your doorstep, ready for you to experience the ultimate in luxury performance.',
      icon: <DriveEtaIcon sx={{ fontSize: 36, color: primaryColour }} />,
    },
  ];

  // ===== STATS SECTION =====
  const statsData = [
    { value: '25+', label: 'Luxury Models', icon: <DirectionsCarIcon sx={{ fontSize: 36, color: primaryColour }} /> },
    { value: '98%', label: 'Client Satisfaction', icon: <TrophyIcon sx={{ fontSize: 36, color: primaryColour }} /> },
    { value: '15+', label: 'Years of Excellence', icon: <VerifiedUserIcon sx={{ fontSize: 36, color: primaryColour }} /> },
    { value: '24/7', label: 'Customer Support', icon: <SupportIcon sx={{ fontSize: 36, color: primaryColour }} /> },
  ];

  // ===== FEATURED LOCATIONS =====
  const locationData = [
    {
      name: 'Dubai',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      description: 'Cruise along the iconic Palm Jumeirah in a Ferrari or Lamborghini.'
    },
    {
      name: 'Monaco',
      image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      description: 'Follow in the tracks of F1 legends on the streets of Monte Carlo.'
    },
    {
      name: 'Miami',
      image: 'https://images.unsplash.com/photo-1503891617560-5b8c2523e905?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80', 
      description: 'Drive down Ocean Drive in style with our luxury convertibles.'
    },
    {
      name: 'Los Angeles',
      image: 'https://images.unsplash.com/photo-1515896769750-31548aa180ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      description: 'Experience the Sunset Strip in a supercar worthy of Hollywood.'
    }
  ];

  // ===== COMBINED useEffect =====
  useEffect(() => {
    // Preload hero images
    heroImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    // Hero image rotation timer
    const heroInterval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    // Testimonials auto-advance timer
    timerRef.current = setTimeout(() => {
      setDirection(1);
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    // Fetch cars from backend API
    setCarsLoading(true);
    setCarsError(null);
    axios.get('/api/cars')
      .then((res) => {
        setCarsData(res.data);
        setCarsLoading(false);
      })
      .catch((err) => {
        setCarsError('Failed to load car inventory. Please try again later.');
        setCarsLoading(false);
      });

    // Cleanup
    return () => {
      clearInterval(heroInterval);
      clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line
  }, [currentTestimonial]);

  // Booking form handlers
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your booking request! Our team will contact you shortly to confirm details.');
    setBookingFormData({
      selectedCar: '',
      pickupDate: '',
      returnDate: '',
      fullName: '',
      email: '',
      phone: '',
    });
  };

  // Testimonials navigation
  const handlePrev = () => {
    clearTimeout(timerRef.current);
    setDirection(-1);
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  const handleNext = () => {
    clearTimeout(timerRef.current);
    setDirection(1);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ overflowX: 'hidden', bgcolor: darkBg }}>
        <Header />

        {/* HERO SECTION */}
        <Box
          id="hero"
          sx={{
            position: 'relative',
            height: '100vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <AnimatePresence initial={false} custom={1}>
            <motion.img
              key={activeImage}
              src={heroImages[activeImage]}
              alt="Hero Background"
              variants={backgroundVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 1, ease: 'easeInOut' }}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1503376780353-7e2a2a228406?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: -1,
              }}
            />
          </AnimatePresence>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.8) 100%)',
              zIndex: -1,
            }}
          />
          <Container maxWidth="md" sx={{ textAlign: 'center', color: 'white', position: 'relative', zIndex: 1 }}>
            <motion.div variants={heroContainerVariants} initial="hidden" animate="visible">
              <motion.h1
                variants={heroItemVariants}
                style={{
                  fontSize: '3.5rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  letterSpacing: '0.1em',
                  textShadow: '2px 2px 6px rgba(0,0,0,0.7)',
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Experience the Ultimate in Luxury Car Rentals
              </motion.h1>
              <motion.p
                variants={heroItemVariants}
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  marginBottom: '2rem',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
                  fontFamily: "'Open Sans', sans-serif",
                }}
              >
                Unleash your dreams with our exclusive collection of hypercars.
              </motion.p>
              <motion.div variants={heroItemVariants}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => navigate("/booking")}
                  sx={{
                    padding: '1rem 3rem',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    borderRadius: '12px',
                    boxShadow: `0 0 12px ${primaryColour}`,
                    transition: 'box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: `0 0 20px ${primaryColour}`,
                      backgroundColor: primaryColour,
                      color: '#040430',
                    },
                  }}
                >
                  Book Your Dream Car
                </Button>
              </motion.div>
            </motion.div>
          </Container>
        </Box>

        {/* STATS SECTION */}
        <Box sx={{ py: 5, bgcolor: theme.palette.background.accent }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              {statsData.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Box sx={{ 
                    textAlign: 'center', 
                    p: 3, 
                    height: '100%',
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'translateY(-5px)' } 
                  }}>
                    <Box sx={{ mb: 2 }}>{stat.icon}</Box>
                    <Typography variant="h3" fontWeight="bold" color="primary" sx={{ mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* CARS SECTION */}
        <Box id="cars" sx={{ py: 10, bgcolor: theme.palette.background.default }}>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 1,
                textAlign: 'center',
              }}
            >
              Our Fleet of Luxury Hypercars
            </Typography>
            <Divider
              sx={{
                width: '50%',
                mx: 'auto',
                borderColor: primaryColour,
                borderWidth: '2px',
                mb: 4,
              }}
            />

            {carsLoading && (
              <Grid container spacing={4} justifyContent="center">
                {[...Array(6)].map((_, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Skeleton variant="rectangular" height={440} sx={{ bgcolor: '#222', borderRadius: 2 }} />
                  </Grid>
                ))}
              </Grid>
            )}
            {carsError && (
              <Alert severity="error" sx={{ mb: 4 }}>
                {carsError}
              </Alert>
            )}
            {!carsLoading && !carsError && (
              <Grid container spacing={4} justifyContent="center">
                {carsData.slice(0, 6).map((car) => (
                  <Grid item xs={12} sm={6} md={4} key={car._id || car.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Card
                      sx={{
                        width: 320,
                        height: 440,
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '12px',
                        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.4)',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                          transform: 'scale(1.04)',
                          boxShadow: '0px 8px 24px rgba(255, 214, 51, 0.2)',
                        },
                        bgcolor: cardBg,
                      }}
                      onMouseEnter={() => setHoveredCard(car._id || car.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <CardMedia
                        component="img"
                        image={car.images?.[0] || car.image || 'https://via.placeholder.com/320x180?text=No+Image'}
                        alt={car.name || `${car.make} ${car.model}`}
                        sx={{
                          height: 180,
                          width: '100%',
                          objectFit: 'cover',
                          borderTopLeftRadius: '12px',
                          borderTopRightRadius: '12px',
                        }}
                      />
                      <CardContent
                        sx={{
                          flex: '1 1 0',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          p: 2,
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                              fontWeight: 600,
                              color: theme.palette.text.primary,
                              mb: 1,
                              minHeight: 32,
                            }}
                          >
                            {car.name || `${car.make} ${car.model}`}
                          </Typography>
                          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                            <SpeedIcon sx={{ color: primaryColour }} />
                            <Typography variant="body2" color="text.secondary">
                              {car.specifications?.performance?.zeroToSixty
                                ? `0-60 mph: ${car.specifications.performance.zeroToSixty}s`
                                : car.specs?.acceleration || 'N/A'}
                            </Typography>
                          </Stack>
                          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                            <ShutterSpeedIcon sx={{ color: primaryColour }} />
                            <Typography variant="body2" color="text.secondary">
                              {car.specifications?.performance?.topSpeed
                                ? `Top Speed: ${car.specifications.performance.topSpeed} mph`
                                : car.specs?.topSpeed || 'N/A'}
                            </Typography>
                          </Stack>
                          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                            <BuildIcon sx={{ color: primaryColour }} />
                            <Typography variant="body2" color="text.secondary">
                              {car.specifications?.engine?.type
                                ? car.specifications.engine.type
                                : car.specs?.engine || 'N/A'}
                            </Typography>
                          </Stack>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <Typography
                            variant="h6"
                            component="p"
                            sx={{
                              fontWeight: 600,
                              color: primaryColour,
                            }}
                          >
                            {car.availability?.rentalPrice?.daily
                              ? `$${car.availability.rentalPrice.daily.toLocaleString()} / day`
                              : car.price || 'Contact for Price'}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}

            {/* View More Button */}
            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowRightIcon />}
                onClick={() => navigate("/carinventory")}
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: '30px',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: `0 7px 14px rgba(255, 214, 51, 0.25)`,
                    backgroundColor: primaryColour,
                    color: '#040430',
                  },
                }}
              >
                View Our Complete Collection
              </Button>
            </Box>
          </Container>
        </Box>

        {/* FEATURED LOCATIONS */}
        <Box sx={{ py: 10, bgcolor: theme.palette.background.accent }}>
          <Container maxWidth="lg">
            <Typography variant="h3" fontWeight={700} mb={2} align="center" color="text.primary">
              Drive in Style at Premier Destinations
            </Typography>
            <Typography variant="h6" mb={5} align="center" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
              Experience the thrill of driving our hypercars at the world's most prestigious locations
            </Typography>
            <Grid container spacing={4}>
              {locationData.map((location, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper 
                    elevation={3} 
                    sx={{ 
                      borderRadius: 3, 
                      overflow: 'hidden', 
                      height: '100%',
                      bgcolor: theme.palette.background.paper,
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'translateY(-8px)' }
                    }}
                  >
                    <Box sx={{ position: 'relative', height: 200 }}>
                      <img 
                        src={location.image} 
                        alt={location.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <Box sx={{ 
                        position: 'absolute', 
                        bottom: 0, 
                        left: 0, 
                        width: '100%',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))',
                        p: 2
                      }}>
                        <Typography variant="h5" fontWeight={600} color="white">
                          {location.name}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ p: 3 }}>
                      <Typography variant="body1" color="text.secondary">
                        {location.description}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ABOUT SECTION */}
        <Box id="about" sx={{ py: 10, bgcolor: theme.palette.background.default }}>
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div variants={aboutItemVariants} initial="hidden" animate="visible">
                  <Typography variant="h3" fontWeight={700} mb={3} color="text.primary" letterSpacing="0.05em">
                    About Legendary Motorsports
                  </Typography>
                  <Typography variant="body1" color="text.secondary" mb={3} sx={{ lineHeight: 1.7, fontSize: '1.1rem' }}>
                    Legendary Motorsports is your premier destination for luxury car rentals. We offer an unparalleled selection
                    of hypercars, combined with bespoke concierge services to elevate your driving experience.
                  </Typography>
                  <Typography variant="body1" color="text.secondary" mb={4} sx={{ lineHeight: 1.7, fontSize: '1.1rem' }}>
                    Founded by automotive enthusiasts with a passion for exceptional driving experiences, our mission is to make the world's most exclusive vehicles accessible to discerning clients. With over 15 years in the industry, we've built a reputation for excellence, attention to detail, and unmatched customer service.
                  </Typography>
                  <Button
                    component={Link}
                    href="/aboutus"
                    variant="outlined"
                    color="primary"
                    size="large"
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      borderRadius: 3,
                      borderColor: primaryColour,
                      color: primaryColour,
                      '&:hover': {
                        backgroundColor: primaryColour,
                        color: '#040430',
                        borderColor: primaryColour,
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    borderRadius: 16,
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1503376780353-7e2a2a228406?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="About Legendary Motorsports"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* BENEFITS SECTION */}
        <Box sx={{ py: 10, bgcolor: theme.palette.background.accent }}>
          <Container maxWidth="lg">
            <Typography variant="h3" fontWeight={700} mb={2} align="center" color="text.primary">
              The Legendary Motorsports Experience
            </Typography>
            <Typography variant="h6" mb={6} align="center" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
              We go beyond simply renting cars - we create memorable automotive experiences
            </Typography>
            <Grid container spacing={4}>
              {benefitsData.map((benefit, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper 
                    elevation={4} 
                    sx={{ 
                      p: 4, 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      borderRadius: 3,
                      bgcolor: theme.palette.background.paper,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: `0 12px 20px rgba(0,0,0,0.3), 0 0 10px ${primaryColour}40`
                      }
                    }}
                  >
                    <Box sx={{ mb: 2 }}>{benefit.icon}</Box>
                    <Typography variant="h5" fontWeight={600} mb={2} align="center" color="text.primary">
                      {benefit.title}
                    </Typography>
                    <Typography variant="body1" align="center" color="text.secondary">
                      {benefit.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* BOOKING SECTION */}
        <Box id="booking" sx={{ py: 10, bgcolor: theme.palette.background.default }}>
          <Container maxWidth="md">
            <Typography variant="h3" fontWeight={700} mb={3} align="center" color="text.primary" letterSpacing="0.05em">
              Book Your Dream Car
            </Typography>
            <Divider
              sx={{
                width: 80,
                height: 4,
                backgroundColor: primaryColour,
                mx: 'auto',
                mb: 6,
                borderRadius: 2,
              }}
            />
            <Box
              component="form"
              onSubmit={handleBookingSubmit}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 3,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <FormControl fullWidth sx={{ minWidth: 220 }}>
                <InputLabel id="select-car-label">Select Car</InputLabel>
                <Select
                  labelId="select-car-label"
                  id="selectedCar"
                  name="selectedCar"
                  value={bookingFormData.selectedCar}
                  label="Select Car"
                  onChange={handleBookingChange}
                  required
                >
                  {carsData.map((car) => (
                    <MenuItem key={car._id || car.id} value={car.name || `${car.make} ${car.model}`}>
                      {car.name || `${car.make} ${car.model}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="pickupDate"
                name="pickupDate"
                label="Pickup Date"
                type="date"
                value={bookingFormData.pickupDate}
                onChange={handleBookingChange}
                InputLabelProps={{ shrink: true }}
                required
                sx={{ minWidth: 160 }}
              />
              <TextField
                id="returnDate"
                name="returnDate"
                label="Return Date"
                type="date"
                value={bookingFormData.returnDate}
                onChange={handleBookingChange}
                InputLabelProps={{ shrink: true }}
                required
                sx={{ minWidth: 160 }}
              />
              <TextField
                id="fullName"
                name="fullName"
                label="Full Name"
                value={bookingFormData.fullName}
                onChange={handleBookingChange}
                required
                sx={{ minWidth: 220 }}
              />
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                value={bookingFormData.email}
                onChange={handleBookingChange}
                required
                sx={{ minWidth: 220 }}
              />
              <TextField
                id="phone"
                name="phone"
                label="Phone Number"
                type="tel"
                value={bookingFormData.phone}
                onChange={handleBookingChange}
                required
                sx={{ minWidth: 220 }}
              />
              <Box sx={{ width: '100%', textAlign: 'center', mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    px: 6,
                    py: 1.5,
                    fontWeight: 700,
                    borderRadius: 3,
                    boxShadow: `0 0 12px ${primaryColour}`,
                    '&:hover': {
                      boxShadow: `0 0 20px ${primaryColour}`,
                      backgroundColor: primaryColour,
                      color: '#040430',
                    },
                  }}
                >
                  Submit Booking
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* HOW IT WORKS SECTION */}
        <Box id="how-it-works" sx={{ py: 10, bgcolor: theme.palette.background.accent }}>
          <Container maxWidth="md">
            <Typography
              variant="h3"
              fontWeight={700}
              mb={6}
              align="center"
              color="text.primary"
              letterSpacing="0.05em"
            >
              How It Works
            </Typography>
            <Stack spacing={4}>
              {processSteps.map(({ number, title, description, icon }) => (
                <Box
                  key={number}
                  sx={{
                    width: '100%',
                    minHeight: 180,
                    maxWidth: 700,
                    mx: 'auto',
                    bgcolor: theme.palette.background.paper,
                    borderRadius: 3,
                    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                    p: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    transition: 'transform 0.3s',
                    '&:hover': { 
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 20px rgba(0,0,0,0.3), 0 0 10px ${primaryColour}40`
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 72 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        backgroundColor: primaryColour,
                        color: '#040430',
                        fontWeight: 700,
                        fontSize: '1.15rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 1,
                        boxShadow: `0 0 8px ${primaryColour}`,
                      }}
                    >
                      {number}
                    </Box>
                    <Box>{icon}</Box>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 1, color: theme.palette.text.primary }}>
                      {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Container>
        </Box>

        {/* TESTIMONIALS SECTION */}
        <Box id="testimonials" sx={{ py: 10, bgcolor: theme.palette.background.default }}>
          <Container maxWidth="md" sx={{ position: 'relative', minHeight: 280 }}>
            <Typography variant="h3" fontWeight={700} mb={6} align="center" color="text.primary" letterSpacing="0.05em">
              What Our Clients Say
            </Typography>
            <Box sx={{ position: 'relative', minHeight: 220 }}>
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={testimonials[currentTestimonial].id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    left: 0,
                    top: 0,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontStyle: 'italic',
                      fontSize: '1.2rem',
                      color: theme.palette.text.secondary,
                      mb: 4,
                      minHeight: 120,
                    }}
                  >
                    "{testimonials[currentTestimonial].content}"
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                    <Avatar
                      src={testimonials[currentTestimonial].author.image}
                      alt={testimonials[currentTestimonial].author.name}
                      sx={{ width: 64, height: 64, border: `2px solid ${primaryColour}` }}
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700} color="text.primary">
                        {testimonials[currentTestimonial].author.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {testimonials[currentTestimonial].author.location}
                      </Typography>
                    </Box>
                  </Stack>
                </motion.div>
              </AnimatePresence>
              <IconButton
                onClick={handlePrev}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  transform: 'translateY(-50%)',
                  color: primaryColour,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                  zIndex: 2,
                }}
                aria-label="Previous testimonial"
              >
                <ArrowBackIcon />
              </IconButton>
              <IconButton
                onClick={handleNext}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: 0,
                  transform: 'translateY(-50%)',
                  color: primaryColour,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                  zIndex: 2,
                }}
                aria-label="Next testimonial"
              >
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          </Container>
        </Box>

        {/* CONTACT SECTION */}
        <Box sx={{ py: 10, bgcolor: theme.palette.background.accent }}>
          <Container maxWidth="lg">
            <Grid container spacing={5} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h3" fontWeight={700} mb={3} color="text.primary">
                  Ready to Experience Luxury?
                </Typography>
                <Typography variant="body1" mb={4} color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                  Contact us today to discuss your dream car rental or to learn more about our exclusive membership options.
                </Typography>
                <Stack spacing={3} sx={{ mb: 4 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <EmailIcon sx={{ color: primaryColour, fontSize: 28 }} />
                    <Typography variant="body1" color="text.primary">
                      info@legendarymotorsports.com
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <PhoneIcon sx={{ color: primaryColour, fontSize: 28 }} />
                    <Typography variant="body1" color="text.primary">
                      +1 (800) 555-CARS
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <LocationIcon sx={{ color: primaryColour, fontSize: 28 }} />
                    <Typography variant="body1" color="text.primary">
                      123 Luxury Lane, Beverly Hills, CA 90210
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <IconButton aria-label="Facebook" href="#" sx={{ color: primaryColour }}>
                    <FacebookIcon />
                  </IconButton>
                  <IconButton aria-label="Instagram" href="#" sx={{ color: primaryColour }}>
                    <InstagramIcon />
                  </IconButton>
                  <IconButton aria-label="Twitter" href="#" sx={{ color: primaryColour }}>
                    <TwitterIcon />
                  </IconButton>
                  <IconButton aria-label="YouTube" href="#" sx={{ color: primaryColour }}>
                    <YouTubeIcon />
                  </IconButton>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper 
                  elevation={4} 
                  sx={{ 
                    p: 4, 
                    borderRadius: 3, 
                    bgcolor: theme.palette.background.paper,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
                  }}
                >
                  <Typography variant="h5" fontWeight={600} mb={3} color="text.primary">
                    Send Us a Message
                  </Typography>
                  <Stack spacing={3} component="form">
                    <TextField label="Full Name" variant="outlined" fullWidth required />
                    <TextField label="Email Address" type="email" variant="outlined" fullWidth required />
                    <TextField label="Phone Number" variant="outlined" fullWidth />
                    <TextField
                      label="Message"
                      multiline
                      rows={4}
                      variant="outlined"
                      fullWidth
                      required
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{
                        fontWeight: 600,
                        py: 1.5,
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: primaryColour,
                          color: '#040430',
                        },
                      }}
                    >
                      Send Message
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* FOOTER */}
        <Footer primaryColour={primaryColour} />
      </Box>
    </ThemeProvider>
  );
};

export default Home;