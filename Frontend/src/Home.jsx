import { useState, useEffect, useRef } from 'react';
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
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';

const Home = () => {
  const primaryColour = '#ffd633'; // from theme primary.main
  const secondaryColour = '#390099'; // from theme secondary.main

  // ===== HERO SECTION =====
  const [activeImage, setActiveImage] = useState(0);
  const heroImages = [
    'https://images.unsplash.com/photo-1549399542-7e8f2e928464?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1592198084033-aade902d1aae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

  // ===== CARS SECTION =====
  const [hoveredCard, setHoveredCard] = useState(null);
  const carsData = [
    {
      id: 1,
      name: 'Lamborghini Aventador',
      image:
        'https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      specs: { acceleration: '0-60 mph: 2.8s', topSpeed: '217 mph', engine: '6.5L V12' },
      price: '$2,500 / day',
    },
    {
      id: 2,
      name: 'Ferrari SF90 Stradale',
      image:
        'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      specs: { acceleration: '0-60 mph: 2.5s', topSpeed: '211 mph', engine: '4.0L V8 Hybrid' },
      price: '$3,000 / day',
    },
    {
      id: 3,
      name: 'McLaren 720S',
      image:
        'https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      specs: { acceleration: '0-60 mph: 2.7s', topSpeed: '212 mph', engine: '4.0L V8 Twin-Turbo' },
      price: '$2,800 / day',
    },
    {
      id: 4,
      name: 'Bugatti Chiron',
      image:
        'https://images.unsplash.com/photo-1546544336-7e8dde09e523?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      specs: { acceleration: '0-60 mph: 2.4s', topSpeed: '261 mph', engine: '8.0L W16 Quad-Turbo' },
      price: '$4,500 / day',
    },
    {
      id: 5,
      name: 'Porsche 911 GT2 RS',
      image:
        'https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      specs: { acceleration: '0-60 mph: 2.7s', topSpeed: '211 mph', engine: '3.8L Twin-Turbo Flat-6' },
      price: '$2,200 / day',
    },
    {
      id: 6,
      name: 'Aston Martin DBS Superleggera',
      image:
        'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      specs: { acceleration: '0-60 mph: 3.2s', topSpeed: '211 mph', engine: '5.2L Twin-Turbo V12' },
      price: '$2,700 / day',
    },
  ];

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  // ===== ABOUT SECTION =====
  const aboutItemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };
  const imageVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  // ===== BOOKING SECTION =====
  const [bookingFormData, setBookingFormData] = useState({
    selectedCar: '',
    pickupDate: '',
    returnDate: '',
    fullName: '',
    email: '',
    phone: '',
  });
  const availableCars = carsData.map(({ id, name }) => ({ id, name }));

  const bookingSteps = [
    {
      number: 1,
      title: 'Choose Your Hypercar',
      description: 'Browse our exclusive collection and select the vehicle that matches your style.',
    },
    {
      number: 2,
      title: 'Set Your Schedule',
      description: 'Select your preferred dates and duration for the rental period.',
    },
    {
      number: 3,
      title: 'Confirm Details',
      description: 'Complete your booking with payment and verification details.',
    },
    {
      number: 4,
      title: 'Drive & Enjoy',
      description: 'Receive your vehicle and experience the thrill of hypercar performance.',
    },
  ];

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    console.log('Booking form submitted:', bookingFormData);
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
  ];
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDirection(1);
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearTimeout(timerRef.current);
  }, [currentTestimonial]);

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

  return (
    <Box sx={{ overflowX: 'hidden' }}>
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
              'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.7) 100%)',
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

      {/* CARS SECTION */}
      <Box id="cars" sx={{ py: 8, bgcolor: '#f4f4f4' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              color: '#333',
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

          <Grid container spacing={4} justifyContent="center">
            {carsData.map((car) => (
              <Grid item xs={12} sm={6} md={4} key={car.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card
                  sx={{
                    width: 320, // Fixed width for all cards
                    height: 440, // Fixed height for all cards
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '12px',
                    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.04)',
                      boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.18)',
                    },
                    bgcolor: 'background.paper',
                  }}
                  onMouseEnter={() => setHoveredCard(car.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardMedia
                    component="img"
                    image={car.image}
                    alt={car.name}
                    sx={{
                      height: 180, // Fixed image height for all cards
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
                          color: '#222',
                          mb: 1,
                          minHeight: 32, // Ensures consistent name area
                        }}
                      >
                        {car.name}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <SpeedIcon sx={{ color: primaryColour }} />
                        <Typography variant="body2" color="textSecondary">
                          {car.specs.acceleration}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <ShutterSpeedIcon sx={{ color: primaryColour }} />
                        <Typography variant="body2" color="textSecondary">
                          {car.specs.topSpeed}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <BuildIcon sx={{ color: primaryColour }} />
                        <Typography variant="body2" color="textSecondary">
                          {car.specs.engine}
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
                        {car.price}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>


      {/* ABOUT SECTION */}
      <Box id="about" sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div variants={aboutItemVariants} initial="hidden" animate="visible">
                <Typography variant="h4" fontWeight={700} mb={3} color="#222" letterSpacing="0.05em">
                  About Legendary Motorsports
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={3} sx={{ lineHeight: 1.7, fontSize: '1.1rem' }}>
                  Legendary Motorsports is your premier destination for luxury car rentals. We offer an unparalleled selection
                  of hypercars, combined with bespoke concierge services to elevate your driving experience.
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={4} sx={{ lineHeight: 1.7, fontSize: '1.1rem' }}>
                  Whether you're seeking the thrill of a high-performance vehicle for a weekend getaway or require a sophisticated
                  ride for a special event, we're here to fulfill your automotive desires.
                </Typography>
                <Button
                  component={Link}
                  href="/aboutus"
                  variant="outlined"
                  color="secondary"
                  size="large"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    borderRadius: 3,
                    borderColor: secondaryColour,
                    color: secondaryColour,
                    '&:hover': {
                      backgroundColor: secondaryColour,
                      color: '#fff',
                      borderColor: secondaryColour,
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
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1503376780353-727e2fca6a27?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                  alt="About Legendary Motorsports"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* BOOKING SECTION */}
      <Box id="booking" sx={{ py: 10, bgcolor: '#f9f9f9' }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight={700} mb={3} align="center" color="#222" letterSpacing="0.05em">
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
                  <MenuItem key={car.id} value={car.name}>
                    {car.name}
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

      {/* TESTIMONIALS SECTION */}
      <Box id="testimonials" sx={{ py: 10 }}>
        <Container maxWidth="md" sx={{ position: 'relative', minHeight: 280 }}>
          <Typography variant="h4" fontWeight={700} mb={6} align="center" color="#222" letterSpacing="0.05em">
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
                    color: '#555',
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
                    <Typography variant="subtitle1" fontWeight={700} color="#222">
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
                backgroundColor: 'rgba(0,0,0,0.1)',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.2)' },
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
                backgroundColor: 'rgba(0,0,0,0.1)',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.2)' },
                zIndex: 2,
              }}
              aria-label="Next testimonial"
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>


      {/* HOW IT WORKS SECTION */}
      <Box id="how-it-works" sx={{ py: 10, bgcolor: '#fff' }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            fontWeight={700}
            mb={6}
            align="center"
            color="#222"
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
                  bgcolor: '#f9f9f9',
                  borderRadius: 3,
                  boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                  p: 4,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 72 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      backgroundColor: primaryColour,
                      color: '#fff',
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
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
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


      {/* FOOTER */}
      <Footer
        sx={{
          backgroundColor: '#040430',
          color: '#fff',
          mt: 10,
          pt: 6,
          pb: 4,
        }}
      >
        <Container maxWidth="lg" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Box sx={{ mb: 3, minWidth: 200 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Legendary Motorsports
            </Typography>
            <Typography variant="body2" sx={{ maxWidth: 280, mb: 2 }}>
              The premier luxury car rental service offering the most exclusive hypercars worldwide.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton aria-label="Facebook" href="#" sx={{ color: '#ffd633' }}>
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Instagram" href="#" sx={{ color: '#ffd633' }}>
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="Twitter" href="#" sx={{ color: '#ffd633' }}>
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="YouTube" href="#" sx={{ color: '#ffd633' }}>
                <YouTubeIcon />
              </IconButton>
            </Stack>
          </Box>

          <Box sx={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Box>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                {['Home', 'Our Fleet', 'About Us', 'Book Now', 'Testimonials', 'Contact'].map((link) => (
                  <Link
                    key={link}
                    href={`#${link.toLowerCase().replace(/\s/g, '-')}`}
                    underline="hover"
                    color="inherit"
                    sx={{ cursor: 'pointer' }}
                  >
                    {link}
                  </Link>
                ))}
              </Stack>
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                Services
              </Typography>
              <Stack spacing={1}>
                {[
                  'Hypercar Rentals',
                  'Chauffeur Services',
                  'Track Day Experiences',
                  'Custom Road Trips',
                  'Special Event Rentals',
                  'Corporate Packages',
                ].map((service) => (
                  <Link key={service} href="#" underline="hover" color="inherit" sx={{ cursor: 'pointer' }}>
                    {service}
                  </Link>
                ))}
              </Stack>
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                Legal
              </Typography>
              <Stack spacing={1}>
                {[
                  'Terms & Conditions',
                  'Privacy Policy',
                  'Rental Agreement',
                  'Insurance Policy',
                  'Cancellation Policy',
                  'FAQ',
                ].map((legal) => (
                  <Link key={legal} href="#" underline="hover" color="inherit" sx={{ cursor: 'pointer' }}>
                    {legal}
                  </Link>
                ))}
              </Stack>
            </Box>
          </Box>
        </Container>
        <Box sx={{ textAlign: 'center', mt: 4, fontSize: 14, color: '#bbb' }}>
          &copy; {new Date().getFullYear()} Legendary Motorsports. All rights reserved.
        </Box>
      </Footer>
    </Box>
  );
};

export default Home;
