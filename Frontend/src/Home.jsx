import { useState, useEffect, useRef } from 'react';
import { 
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
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
  Link
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Close as CloseIcon,
  Speed as SpeedIcon, 
  ShutterSpeed as ShutterSpeedIcon, 
  Build as BuildIcon,
  CheckCircle as CheckCircleIcon,
  Support as SupportIcon,
  Security as SecurityIcon,
  ArrowBack as ArrowBackIcon, 
  ArrowForward as ArrowForwardIcon,
  LocationOn as LocationIcon, 
  Phone as PhoneIcon, 
  Email as EmailIcon,
  Facebook as FacebookIcon, 
  Instagram as InstagramIcon, 
  Twitter as TwitterIcon, 
  YouTube as YouTubeIcon
} from '@mui/icons-material';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

const Home = () => {
    const primaryColour = '#ffbd00';
    const secondaryColour = '#390099';
  // =============== HEADER SECTION ===============
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const isMobile = useMediaQuery('(max-width:768px)');
  const headerControls = useAnimation();

  // Navigation links
  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'Cars', id: 'cars' },
    { name: 'About', path: '/aboutus' }, // Changed to use path instead of id
    { name: 'Book Now', id: 'booking' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Contact', id: 'contact' }
  ];

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 100);

      // Update active section based on scroll position
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation for header
  useEffect(() => {
    headerControls.start({
      backgroundColor: scrolled ? 'rgba(57, 0, 153, 0.95)' : 'rgba(57, 0, 153, 0)',
      boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.15)' : 'none',
      height: scrolled ? 70 : 90,
      transition: { duration: 0.3 }
    });
  }, [scrolled, headerControls]);

  const scrollToSection = (sectionId, path) => {
    setDrawerOpen(false);
    
    if (path) {
      window.location.href = path;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetPosition = element.offsetTop - 80;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // =============== HERO SECTION ===============
  const [activeImage, setActiveImage] = useState(0);

  // Hero section background images
  const heroImages = [
    'https://images.unsplash.com/photo-1549399542-7e8f2e928464?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1592198084033-aade902d1aae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  ];

  // Auto rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Hero Animation variants
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const heroItemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const backgroundVariants = {
    enter: { opacity: 0 },
    center: { 
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 1, ease: "easeIn" }
    }
  };

  // =============== CARS SECTION ===============
  const [hoveredCard, setHoveredCard] = useState(null);

  // Luxury cars data
  const carsData = [
    {
      id: 1,
      name: 'Lamborghini Aventador',
      image: 'https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      specs: {
        acceleration: '0-60 mph: 2.8s',
        topSpeed: '217 mph',
        engine: '6.5L V12'
      },
      price: '$2,500 / day'
    },
    {
      id: 2,
      name: 'Ferrari SF90 Stradale',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      specs: {
        acceleration: '0-60 mph: 2.5s',
        topSpeed: '211 mph',
        engine: '4.0L V8 Hybrid'
      },
      price: '$3,000 / day'
    },
    {
      id: 3,
      name: 'McLaren 720S',
      image: 'https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      specs: {
        acceleration: '0-60 mph: 2.7s',
        topSpeed: '212 mph',
        engine: '4.0L V8 Twin-Turbo'
      },
      price: '$2,800 / day'
    },
    {
      id: 4,
      name: 'Bugatti Chiron',
      image: 'https://images.unsplash.com/photo-1546544336-7e8dde09e523?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      specs: {
        acceleration: '0-60 mph: 2.4s',
        topSpeed: '261 mph',
        engine: '8.0L W16 Quad-Turbo'
      },
      price: '$4,500 / day'
    },
    {
      id: 5,
      name: 'Porsche 911 GT2 RS',
      image: 'https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      specs: {
        acceleration: '0-60 mph: 2.7s',
        topSpeed: '211 mph',
        engine: '3.8L Twin-Turbo Flat-6'
      },
      price: '$2,200 / day'
    },
    {
      id: 6,
      name: 'Aston Martin DBS Superleggera',
      image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      specs: {
        acceleration: '0-60 mph: 3.2s',
        topSpeed: '211 mph',
        engine: '5.2L Twin-Turbo V12'
      },
      price: '$2,700 / day'
    }
  ];

  const carsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // =============== ABOUT SECTION ===============
  const aboutContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const aboutItemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // =============== BOOKING SECTION ===============
  const [bookingFormData, setBookingFormData] = useState({
    selectedCar: '',
    pickupDate: '',
    returnDate: '',
    fullName: '',
    email: '',
    phone: ''
  });

  // Data for car selection dropdown
  const availableCars = [
    { id: 'lamborghini-aventador', name: 'Lamborghini Aventador' },
    { id: 'ferrari-sf90', name: 'Ferrari SF90 Stradale' },
    { id: 'mclaren-720s', name: 'McLaren 720S' },
    { id: 'bugatti-chiron', name: 'Bugatti Chiron' },
    { id: 'porsche-911gt2rs', name: 'Porsche 911 GT2 RS' },
    { id: 'aston-martin-dbs', name: 'Aston Martin DBS Superleggera' }
  ];

  // Booking process steps
  const bookingSteps = [
    {
      number: 1,
      title: 'Choose Your Hypercar',
      description: 'Browse our exclusive collection and select the vehicle that matches your style.'
    },
    {
      number: 2,
      title: 'Set Your Schedule',
      description: 'Select your preferred dates and duration for the rental period.'
    },
    {
      number: 3,
      title: 'Confirm Details',
      description: 'Complete your booking with payment and verification details.'
    },
    {
      number: 4,
      title: 'Drive & Enjoy',
      description: 'Receive your vehicle and experience the thrill of hypercar performance.'
    }
  ];

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would submit the form data to the backend
    console.log('Booking form submitted:', bookingFormData);
    
    // Reset form (for demo purposes)
    setBookingFormData({
      selectedCar: '',
      pickupDate: '',
      returnDate: '',
      fullName: '',
      email: '',
      phone: ''
    });
    
    // Show success message or redirect
    alert('Thank you for your booking request! Our team will contact you shortly to confirm details.');
  };

  const bookingContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const bookingItemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // =============== TESTIMONIALS SECTION ===============
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const timerRef = useRef(null);

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      content: "Renting the Lamborghini Aventador from Legendary Motorsports was the highlight of my year. The car was immaculate, and the service was beyond exceptional. The team went out of their way to ensure I had an unforgettable experience.",
      author: {
        name: "James Wilson",
        location: "Los Angeles, CA",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
      }
    },
    {
      id: 2,
      content: "As a car enthusiast, I've rented from many luxury car services, but Legendary Motorsports stands apart. The Ferrari SF90 was delivered in pristine condition, and the staff's knowledge and passion for hypercars added to the overall experience.",
      author: {
        name: "Sophia Chen",
        location: "Miami, FL",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
      }
    },
    {
      id: 3,
      content: "Legendary Motorsports made my 40th birthday truly special. Driving the McLaren 720S along the coast was a dream come true. The booking process was seamless, and the concierge service was top-notch. I'll definitely be returning for more experiences!",
      author: {
        name: "Michael Johnson",
        location: "New York, NY",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
      }
    }
  ];

  // Auto-rotate testimonials
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
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.5, ease: "easeIn" }
    })
  };

  // =============== CONTACT SECTION ===============
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would submit the form data to the backend
    console.log('Contact form submitted:', contactFormData);
    
    // Reset form (for demo purposes)
    setContactFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Show success message
    alert('Thank you for your message! We will get back to you as soon as possible.');
  };

  const contactContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const contactItemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // =============== FOOTER SECTION ===============
  // Footer links data
  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Our Fleet', href: '#cars' },
    { name: 'About Us', href: '#about' },
    { name: 'Book Now', href: '#booking' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' }
  ];

  const serviceLinks = [
    { name: 'Hypercar Rentals', href: '#' },
    { name: 'Chauffeur Services', href: '#' },
    { name: 'Track Day Experiences', href: '#' },
    { name: 'Custom Road Trips', href: '#' },
    { name: 'Special Event Rentals', href: '#' },
    { name: 'Corporate Packages', href: '#' }
  ];

  const legalLinks = [
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Rental Agreement', href: '#' },
    { name: 'Insurance Policy', href: '#' },
    { name: 'Cancellation Policy', href: '#' },
    { name: 'FAQ', href: '#' }
  ];

  const footerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const footerItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <>
      {/* =============== HEADER =============== */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <AppBar 
          position="fixed" 
          component={motion.div}
          animate={headerControls}
          elevation={0}
          sx={{ 
            bgcolor: 'transparent',
            zIndex: 1100
          }}
        >
          <Container>
            <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0, sm: 2 } }}>
              <Typography 
                variant="h4" 
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                sx={{ 
                  fontWeight: 800, 
                  letterSpacing: 1,
                  color: 'primary.main',
                  cursor: 'pointer'
                }}
                onClick={() => scrollToSection('hero')}
              >
                LEGENDARY MOTORSPORTS
              </Typography>

              {/* Desktop Navigation */}
              {!isMobile && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {navLinks.map((link) => (
                    <Button
                      key={link.id || link.path}
                      onClick={() => scrollToSection(link.id, link.path)}
                      sx={{
                        mx: 2,
                        position: 'relative',
                        color: 'text.primary',
                        fontWeight: 500,
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: -5,
                          left: 0,
                          width: activeSection === link.id ? '100%' : 0,
                          height: 2,
                          bgcolor: 'primary.main',
                          transition: 'all 0.3s ease'
                        },
                        '&:hover::after': {
                          width: '100%'
                        }
                      }}
                    >
                      {link.name}
                    </Button>
                  ))}
                </Box>
              )}

              {/* Mobile Menu Toggle */}
              {isMobile && (
                <IconButton 
                  edge="end" 
                  color="inherit" 
                  aria-label="menu"
                  onClick={() => setDrawerOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </motion.div>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '70%',
            maxWidth: 300,
            backgroundColor: 'background.default',
            boxShadow: '-5px 0 30px rgba(0, 0, 0, 0.3)'
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navLinks.map((link) => (
            <ListItem 
              button 
              key={link.id} 
              onClick={() => scrollToSection(link.id)}
              sx={{
                py: 2,
                borderLeft: activeSection === link.id ? '3px solid' : 'none',
                borderColor: 'primary.main',
                bgcolor: activeSection === link.id ? 'rgba(255, 189, 0, 0.08)' : 'transparent'
              }}
            >
              <ListItemText 
                primary={link.name} 
                sx={{ 
                  textAlign: 'center',
                  '& .MuiTypography-root': {
                    fontFamily: 'Orbitron, sans-serif',
                    fontWeight: 500
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* =============== HERO SECTION =============== */}
      <Box
        id="hero"
        component="section"
        sx={{
          height: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Background Image Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            variants={backgroundVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${heroImages[activeImage]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0
            }}
          />
        </AnimatePresence>

        {/* Dark Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, rgba(57, 0, 153, 0.8), rgba(57, 0, 153, 0.4))',
            zIndex: 1
          }}
        />

        {/* Content */}
        <Container sx={{ position: 'relative', zIndex: 2, maxWidth: 'lg' }}>
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={heroItemVariants}>
              <Typography 
                variant="h1" 
                component="h1" 
                sx={{ 
                  fontWeight: 700,
                  mb: 4,
                  textShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
                  '& .highlight': { color: 'primary.main' },
                  lineHeight: 1.2,
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' }
                }}
              >
                DRIVE <span className="highlight">BEYOND</span> LIMITS
              </Typography>
            </motion.div>

            <motion.div variants={heroItemVariants}>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 5, 
                  maxWidth: 700,
                  lineHeight: 1.6,
                  fontWeight: 400,
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                  fontSize: {xs: '1rem', md: '1.2rem' }
                }}
              >
                Experience the thrill of driving the world's most exclusive hypercars with Legendary Motorsports. 
                Our premium collection offers unmatched performance and luxury for those who demand the extraordinary.
              </Typography>
            </motion.div>

            <motion.div variants={heroItemVariants}>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={{ xs: 2, sm: 3 }}
                sx={{ mt: 2 }}
              >
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => document.getElementById('cars').scrollIntoView({ behavior: 'smooth' })}
                  sx={{ fontWeight: 600, px: 4, py: 1.5 }}
                >
                  Explore Fleet
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  size="large"
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })}
                  sx={{ fontWeight: 600, px: 4, py: 1.5 }}
                >
                  Book Now
                </Button>
              </Stack>
            </motion.div>
          </motion.div>
        </Container>

        {/* Slide Indicators */}
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: 40, 
            left: 0, 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center',
            zIndex: 3
          }}
        >
          <Stack direction="row" spacing={1}>
            {heroImages.map((_, index) => (
              <Box
                key={index}
                component={motion.div}
                whileHover={{ scale: 1.2 }}
                onClick={() => setActiveImage(index)}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  bgcolor: index === activeImage ? 'primary.main' : 'rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </Stack>
        </Box>
      </Box>

      {/* =============== CARS SECTION =============== */}
      <Box
        id="cars"
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'primary.red',
        //   bgcolor: 'linear-gradient(to right, rgba(57, 0, 153, 1), rgba(33, 33, 33, 0.9))'
        }}
      >
        <Container>
          <motion.div
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Box sx={{ textAlign: 'center', mb: 8, position: 'relative' }}>
              <Typography 
                variant="h2" 
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  '& .highlight': { color: 'primary.main' }
                }}
              >
                OUR <span className="highlight">HYPERCAR</span> COLLECTION
              </Typography>
              <Box 
                sx={{ 
                  width: 100, 
                  height: 4, 
                  bgcolor: 'primary.main', 
                  mx: 'auto',
                  mt: 2,
                }} 
              />
            </Box>
          </motion.div>

          <motion.div
            variants={carsContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <Grid container spacing={3}>
              {carsData.map((car) => (
                <Grid  size = {{xs:12, sm:6, md:4}} key={car.id}>
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -15 }}
                    onHoverStart={() => setHoveredCard(car.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease',
                        boxShadow: hoveredCard === car.id 
                          ? '0 20px 40px rgba(0, 0, 0, 0.4)' 
                          : '0 10px 30px rgba(0, 0, 0, 0.3)',
                        bgcolor: "primary.blue",
                        
                        borderRadius: 2,
                        color: "primary.main"
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="220"
                        image={car.image}
                        alt={car.name}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Typography 
                          variant="h5" 
                          component="h3"
                          gutterBottom
                          sx={{ fontWeight: 600 }}
                        >
                          {car.name}
                        </Typography>
                        
                        <Stack spacing={1.5} sx={{ my: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <SpeedIcon sx={{ color: 'primary.main', mr: 1.5 }} />
                            <Typography variant="body2">{car.specs.acceleration}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ShutterSpeedIcon sx={{ color: 'primary.main', mr: 1.5 }} />
                            <Typography variant="body2">{car.specs.topSpeed}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <BuildIcon sx={{ color: 'primary.main', mr: 1.5 }} />
                            <Typography variant="body2">{car.specs.engine}</Typography>
                          </Box>
                        </Stack>
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <Typography 
                          variant="h6" 
                          component="p"
                          sx={{ 
                            color: 'primary.main', 
                            fontWeight: 700,
                            my: 2
                          }}
                        >
                          {car.price}
                        </Typography>
                        
                        <Button 
                          variant="contained" 
                          
                          fullWidth
                          onClick={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })}
                          sx={{ mt: 1, bgcolor:'primary.main', color: 'primary.blue' }}
                        >
                          Reserve Now
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* =============== ABOUT SECTION =============== */}
      <Box
        id="about"
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(to right, rgba(57, 0, 153, 1), rgba(33, 33, 33, 0.9))'
        }}
      >
        <Container>
          <Grid container spacing={6} alignItems="center">
            {/* Image Column */}
            <Grid  xs={12} md={6}>
              <motion.div
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <Box
                  sx={{
                    height: { xs: 300, sm: 400, md: 500 },
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="About Legendary Motorsports"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>

            {/* Content Column */}
            <Grid  xs={12} md={6}>
              <motion.div
                variants={aboutContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div variants={aboutItemVariants}>
                  <Box sx={{ mb: 4, position: 'relative' }}>
                    <Typography 
                      variant="h2" 
                      component="h2"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        '& .highlight': { color: 'primary.main' }
                      }}
                    >
                      THE <span className="highlight">LEGENDARY</span> EXPERIENCE
                    </Typography>
                    <Box 
                      sx={{ 
                        width: 80, 
                        height: 4, 
                        bgcolor: 'primary.main',
                        mt: 2,
                        mb: 4
                      }} 
                    />
                  </Box>
                </motion.div>

                <motion.div variants={aboutItemVariants}>
                  <Typography variant="body1" paragraph>
                    At Legendary Motorsports, we're passionate about hypercars and believe that everyone deserves to experience 
                    the thrill of driving these engineering marvels. Our mission is to provide unparalleled access 
                    to the world's most exclusive vehicles through our premium rental service.
                  </Typography>
                </motion.div>

                <motion.div variants={aboutItemVariants}>
                  <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                    Founded by automotive enthusiasts, we've curated a collection of the finest hypercars, 
                    each maintained to perfection and ready to deliver an unforgettable driving experience.
                  </Typography>
                </motion.div>

                <List sx={{ mt: 4 }}>
                  <motion.div variants={aboutItemVariants}>
                    <ListItem 
                      sx={{ 
                        px: 0, 
                        py: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateX(10px)'
                        }
                      }}
                    >
                      <ListItemIcon>
                        <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 30 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Typography variant="h6" component="h4" sx={{ mb: 0.5 }}>
                            Premium Selection
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Meticulously curated fleet of the latest and most exclusive hypercars.
                          </Typography>
                        }
                      />
                    </ListItem>
                  </motion.div>

                  <motion.div variants={aboutItemVariants}>
                    <ListItem 
                      sx={{ 
                        px: 0, 
                        py: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateX(10px)'
                        }
                      }}
                    >
                      <ListItemIcon>
                        <SupportIcon sx={{ color: 'primary.main', fontSize: 30 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Typography variant="h6" component="h4" sx={{ mb: 0.5 }}>
                            Concierge Service
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            24/7 personalized support and vehicle delivery to your location.
                          </Typography>
                        }
                      />
                    </ListItem>
                  </motion.div>

                  <motion.div variants={aboutItemVariants}>
                    <ListItem 
                      sx={{ 
                        px: 0, 
                        py: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateX(10px)'
                        }
                      }}
                    >
                      <ListItemIcon>
                        <SecurityIcon sx={{ color: 'primary.main', fontSize: 30 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Typography variant="h6" component="h4" sx={{ mb: 0.5 }}>
                            Comprehensive Insurance
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Drive with confidence knowing you're fully covered by our premium insurance.
                          </Typography>
                        }
                      />
                    </ListItem>
                  </motion.div>
                </List>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* =============== BOOKING SECTION =============== */}
      <Box
        id="booking"
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          backgroundColor: 'rgba(33, 33, 33, 0.95)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
            zIndex: 0
          }
        }}
      >
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6}>
            {/* Booking Info Column */}
            <Grid  xs={12} md={6}>
              <motion.div
                variants={bookingContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div variants={bookingItemVariants}>
                  <Typography 
                    variant="h2" 
                    component="h2"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      '& .highlight': { color: 'primary.main' },
                      textAlign: { xs: 'center', md: 'left' }
                    }}
                  >
                    BOOK YOUR <span className="highlight">DREAM</span> CAR
                  </Typography>
                  <Box 
                    sx={{ 
                      width: 80, 
                      height: 4, 
                      bgcolor: 'primary.main',
                      mt: 2,
                      mb: 4,
                      mx: { xs: 'auto', md: 0 }
                    }} 
                  />
                </motion.div>

                <motion.div variants={bookingItemVariants}>
                  <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                    Experience the extraordinary with our simple booking process. Select your desired hypercar, 
                    choose your dates, and we'll handle the rest to ensure a seamless and memorable driving experience.
                  </Typography>
                </motion.div>

                <Box sx={{ mt: 6 }}>
                  {bookingSteps.map((step) => (
                    <motion.div 
                      key={step.number}
                      variants={bookingItemVariants}
                      whileHover={{ x: 10 }}
                    >
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          mb: 4,
                          alignItems: 'flex-start'
                        }}
                      >
                        <Box 
                          sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 40,
                            height: 40,
                            bgcolor: 'primary.blue',
                            color: 'background.dark',
                            borderRadius: '50%',
                            fontWeight: 700,
                            mr: 2,
                            flexShrink: 0
                          }}
                        >
                          {step.number}
                        </Box>
                        <Box>
                          <Typography variant="h6" component="h4" sx={{ mb: 0.5 }}>
                            {step.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {step.description}
                          </Typography>
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </Grid>
            
            {/* Booking Form Column */}
            <Grid  xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Card 
                  sx={{ 
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                    bgcolor: 'background.paper',
                    borderRadius: 2
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      sx={{ mb: 3, fontWeight: 600 }}
                    >
                      Book Your Experience
                    </Typography>
                    
                    <form onSubmit={handleBookingSubmit}>
                      <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel id="car-select-label">Select Car</InputLabel>
                        <Select
                          labelId="car-select-label"
                          id="selectedCar"
                          name="selectedCar"
                          value={bookingFormData.selectedCar}
                          onChange={handleBookingChange}
                          label="Select Car"
                          required
                        >
                          <MenuItem value="" disabled>Choose a hypercar</MenuItem>
                          {availableCars.map((car) => (
                            <MenuItem key={car.id} value={car.id}>{car.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      
                      <TextField
                        fullWidth
                        label="Pickup Date"
                        type="date"
                        name="pickupDate"
                        value={bookingFormData.pickupDate}
                        onChange={handleBookingChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{ mb: 3 }}
                        required
                      />
                      
                      <TextField
                        fullWidth
                        label="Return Date"
                        type="date"
                        name="returnDate"
                        value={bookingFormData.returnDate}
                        onChange={handleBookingChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{ mb: 3 }}
                        required
                      />
                      
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="fullName"
                        value={bookingFormData.fullName}
                        onChange={handleBookingChange}
                        placeholder="Enter your full name"
                        sx={{ mb: 3 }}
                        required
                      />
                      
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        name="email"
                        value={bookingFormData.email}
                        onChange={handleBookingChange}
                        placeholder="Enter your email"
                        sx={{ mb: 3 }}
                        required
                      />
                      
                      <TextField
                        fullWidth
                        label="Phone"
                        type="tel"
                        name="phone"
                        value={bookingFormData.phone}
                        onChange={handleBookingChange}
                        placeholder="Enter your phone number"
                        sx={{ mb: 4 }}
                        required
                      />
                      
                      <Button 
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        sx={{ py: 1.5 }}
                      >
                        Complete Reservation
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* =============== TESTIMONIALS SECTION =============== */}
      <Box
        id="testimonials"
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          backgroundColor: 'background.default'
        }}
      >
        <Container>
          <motion.div
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Box sx={{ textAlign: 'center', mb: 8, position: 'relative' }}>
              <Typography 
                variant="h2" 
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  '& .highlight': { color: 'primary.main' }
                }}
              >
                CLIENT <span className="highlight">EXPERIENCES</span>
              </Typography>
              <Box 
                sx={{ 
                  width: 80, 
                  height: 4, 
                  bgcolor: 'primary.main', 
                  mx: 'auto',
                  mt: 2
                }} 
              />
            </Box>
          </motion.div>
          
          <Box 
            sx={{ 
              maxWidth: 900, 
              mx: 'auto', 
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentTestimonial}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <Box sx={{ px: { xs: 2, md: 4 }, textAlign: 'center' }}>
                  <Card 
                    sx={{ 
                      bgcolor: 'background.paper',
                      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
                      mb: 4,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -20,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '20px solid transparent',
                        borderRight: '20px solid transparent',
                        borderTop: '20px solid',
                        borderTopColor: 'background.paper'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
                        "{testimonials[currentTestimonial].content}"
                      </Typography>
                    </CardContent>
                  </Card>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar
                      src={testimonials[currentTestimonial].author.image}
                      alt={testimonials[currentTestimonial].author.name}
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        mb: 2,
                        border: 3,
                        borderColor: 'primary.main'
                      }}
                    />
                    <Typography variant="h6" component="h4" sx={{ fontWeight: 600 }}>
                      {testimonials[currentTestimonial].author.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                      {testimonials[currentTestimonial].author.location}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </AnimatePresence>
            
            <Stack 
              direction="row" 
              spacing={2} 
              justifyContent="center"
              sx={{ mt: 4 }}
            >
              <IconButton 
                onClick={handlePrev}
                sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'background.dark'
                  }
                }}
              >
                <ArrowBackIcon />
              </IconButton>
              <IconButton 
                onClick={handleNext}
                sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'background.dark'
                  }
                }}
              >
                <ArrowForwardIcon />
              </IconButton>
            </Stack>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              {testimonials.map((_, index) => (
                <Box
                  key={index}
                  component={motion.div}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => {
                    clearTimeout(timerRef.current);
                    setDirection(index > currentTestimonial ? 1 : -1);
                    setCurrentTestimonial(index);
                  }}
                  sx={{
                    width: 12,
                    height: 12,
                    mx: 0.5,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    bgcolor: index === currentTestimonial ? 'primary.main' : 'rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* =============== CONTACT SECTION =============== */}
      <Box
        id="contact"
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(to left, rgba(57, 0, 153, 1), rgba(33, 33, 33, 0.9))'
        }}
      >
        <Container>
          <motion.div
            variants={contactContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={contactItemVariants}>
              <Box sx={{ textAlign: 'center', mb: 8, position: 'relative' }}>
                <Typography 
                  variant="h2" 
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    '& .highlight': { color: 'primary.main' }
                  }}
                >
                  GET IN <span className="highlight">TOUCH</span>
                </Typography>
                <Box 
                  sx={{ 
                    width: 80, 
                    height: 4, 
                    bgcolor: 'primary.main', 
                    mx: 'auto',
                    mt: 2
                  }} 
                />
              </Box>
            </motion.div>
            
            <Grid container spacing={6}>
              {/* Contact Info Column */}
              <Grid  xs={12} md={6}>
                <motion.div variants={contactItemVariants}>
                  <Typography variant="body1" paragraph>
                    Have questions about our hypercar collection or booking process? Our team of automotive experts 
                    is here to assist you and ensure your experience exceeds expectations.
                  </Typography>
                </motion.div>
                
                <Stack spacing={4} sx={{ mt: 6 }}>
                  <motion.div variants={contactItemVariants}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Box 
                        sx={{ 
                          mr: 2,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          bgcolor: 'rgba(255, 189, 0, 0.1)',
                          flexShrink: 0
                        }}
                      >
                        <LocationIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                      </Box>
                      <Box>
                        <Typography variant="h6" component="h4" sx={{ mb: 1 }}>
                          Our Location
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          8800 Sunset Boulevard, West Hollywood, CA 90069
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                  
                  <motion.div variants={contactItemVariants}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Box 
                        sx={{ 
                          mr: 2,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          bgcolor: 'rgba(255, 189, 0, 0.1)',
                          flexShrink: 0
                        }}
                      >
                        <PhoneIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                      </Box>
                      <Box>
                        <Typography variant="h6" component="h4" sx={{ mb: 1 }}>
                          Phone
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          +1 (800) LEGENDARY
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          +1 (800) 534-3633
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                  
                  <motion.div variants={contactItemVariants}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Box 
                        sx={{ 
                          mr: 2,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          bgcolor: 'rgba(255, 189, 0, 0.1)',
                          flexShrink: 0
                        }}
                      >
                        <EmailIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                      </Box>
                      <Box>
                        <Typography variant="h6" component="h4" sx={{ mb: 1 }}>
                          Email
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          info@legendarymotorsports.com
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          bookings@legendarymotorsports.com
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </Stack>
                
                <motion.div variants={contactItemVariants} whileHover={{ scale: 1.02 }}>
                  <Box 
                    sx={{ 
                      mt: 6, 
                      height: 300,
                      borderRadius: 2,
                      overflow: 'hidden',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {/* This would be a Google Maps embed in a real app */}
                    <Typography variant="body1">Google Maps Integration</Typography>
                  </Box>
                </motion.div>
              </Grid>
              
              {/* Contact Form Column */}
              <Grid  xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Card 
                    sx={{ 
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                      bgcolor: 'background.paper',
                      borderRadius: 2
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Typography 
                        variant="h5" 
                        component="h3" 
                        sx={{ mb: 3, fontWeight: 600 }}
                      >
                        Send Us a Message
                      </Typography>
                      
                      <form onSubmit={handleContactSubmit}>
                        <TextField
                          fullWidth
                          label="Name"
                          name="name"
                          value={contactFormData.name}
                          onChange={handleContactChange}
                          placeholder="Your name"
                          sx={{ mb: 3 }}
                          required
                        />
                        
                        <TextField
                          fullWidth
                          label="Email"
                          type="email"
                          name="email"
                          value={contactFormData.email}
                          onChange={handleContactChange}
                          placeholder="Your email"
                          sx={{ mb: 3 }}
                          required
                        />
                        
                        <TextField
                          fullWidth
                          label="Subject"
                          name="subject"
                          value={contactFormData.subject}
                          onChange={handleContactChange}
                          placeholder="Message subject"
                          sx={{ mb: 3 }}
                          required
                        />
                        
                        <TextField
                          fullWidth
                          label="Message"
                          name="message"
                          value={contactFormData.message}
                          onChange={handleContactChange}
                          placeholder="Your message"
                          multiline
                          rows={5}
                          sx={{ mb: 4 }}
                          required
                        />
                        
                        <Button 
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          size="large"
                          sx={{ py: 1.5 }}
                        >
                          Send Message
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* =============== FOOTER SECTION =============== */}
      <Box
        component="footer"
        sx={{
          bgcolor: '#212121',
          pt: { xs: 8, md: 10 },
          pb: 4
        }}
      >
        <Container>
          <motion.div
            variants={footerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <Grid container spacing={4} sx={{ mb: 6 }}>
              {/* Company Information */}
              <Grid  xs={12} sm={6} md={3}>
                <motion.div variants={footerItemVariants}>
                  <Typography 
                    variant="h4" 
                    component={motion.div}
                    whileHover={{ scale: 1.05 }}
                    sx={{ 
                      fontWeight: 800, 
                      letterSpacing: 1,
                      color: 'primary.main',
                      mb: 2,
                      cursor: 'pointer'
                    }}
                    onClick={() => scrollToSection('hero')}
                  >
                    LEGENDARY MOTORSPORTS
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                    Experience the pinnacle of automotive engineering with our exclusive hypercar rental service, 
                    designed for those who demand nothing less than extraordinary.
                  </Typography>
                  <Box sx={{ display: 'flex', mt: 2 }}>
                    <IconButton 
                      component={motion.button}
                      whileHover={{ y: -5, color: '#FFBD00' }}
                      transition={{ duration: 0.2 }}
                      sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.1)', 
                        mr: 1,
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.15)' }
                      }}
                    >
                      <FacebookIcon />
                    </IconButton>
                    <IconButton 
                      component={motion.button}
                      whileHover={{ y: -5, color: '#FFBD00' }}
                      transition={{ duration: 0.2 }}
                      sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.1)', 
                        mr: 1,
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.15)' }
                      }}
                    >
                      <InstagramIcon />
                    </IconButton>
                    <IconButton 
                      component={motion.button}
                      whileHover={{ y: -5, color: '#FFBD00' }}
                      transition={{ duration: 0.2 }}
                      sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.1)', 
                        mr: 1,
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.15)' }
                      }}
                    >
                      <TwitterIcon />
                    </IconButton>
                    <IconButton 
                      component={motion.button}
                      whileHover={{ y: -5, color: '#FFBD00' }}
                      transition={{ duration: 0.2 }}
                      sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.15)' }
                      }}
                    >
                      <YouTubeIcon />
                    </IconButton>
                  </Box>
                </motion.div>
              </Grid>
              
              {/* Quick Links */}
              <Grid  xs={12} sm={6} md={3}>
                <motion.div variants={footerItemVariants}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 3, 
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -10,
                        left: 0,
                        width: 50,
                        height: 3,
                        bgcolor: 'primary.main'
                      }
                    }}
                  >
                    Quick Links
                  </Typography>
                  <List disablePadding>
                    {quickLinks.map((link) => (
                      <ListItem 
                        key={link.name} 
                        disablePadding 
                        sx={{ mb: 1 }}
                        component={motion.li}
                        whileHover={{ x: 10 }}
                      >
                        <ListItemText>
                          <Link 
                            href={link.href}
                            onClick={(e) => {
                              e.preventDefault();
                              const id = link.href.substring(1);
                              scrollToSection(id);
                            }}
                            sx={{ 
                              color: 'text.secondary',
                              textDecoration: 'none',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                color: 'primary.main'
                              }
                            }}
                          >
                            {link.name}
                          </Link>
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </motion.div>
              </Grid>
              
              {/* Our Services */}
              <Grid  xs={12} sm={6} md={3}>
                <motion.div variants={footerItemVariants}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 3, 
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -10,
                        left: 0,
                        width: 50,
                        height: 3,
                        bgcolor: 'primary.main'
                      }
                    }}
                  >
                    Our Services
                  </Typography>
                  <List disablePadding>
                    {serviceLinks.map((link) => (
                      <ListItem 
                        key={link.name} 
                        disablePadding 
                        sx={{ mb: 1 }}
                        component={motion.li}
                        whileHover={{ x: 10 }}
                      >
                        <ListItemText>
                          <Link 
                            href={link.href}
                            sx={{ 
                              color: 'text.secondary',
                              textDecoration: 'none',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                color: 'primary.main'
                              }
                            }}
                          >
                            {link.name}
                          </Link>
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </motion.div>
              </Grid>
              
              {/* Legal */}
              <Grid  xs={12} sm={6} md={3}>
                <motion.div variants={footerItemVariants}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 3, 
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -10,
                        left: 0,
                        width: 50,
                        height: 3,
                        bgcolor: 'primary.main'
                      }
                    }}
                  >
                    Legal
                  </Typography>
                  <List disablePadding>
                    {legalLinks.map((link) => (
                      <ListItem 
                        key={link.name} 
                        disablePadding 
                        sx={{ mb: 1 }}
                        component={motion.li}
                        whileHover={{ x: 10 }}
                      >
                        <ListItemText>
                          <Link 
                            href={link.href}
                            sx={{ 
                              color: 'text.secondary',
                              textDecoration: 'none',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                color: 'primary.main'
                              }
                            }}
                          >
                            {link.name}
                          </Link>
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
          
          {/* Copyright Section */}
          <Box 
            sx={{ 
              borderTop: 1, 
              borderColor: 'rgba(255, 255, 255, 0.1)', 
              pt: 3,
              textAlign: 'center'
            }}
          >
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
              &copy; {new Date().getFullYear()} Legendary Motorsports. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;