import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarById } from './redux/carsSlice';
import { fetchCommentsByCar, addComment, clearCommentsError, clearSuccessMessage } from './redux/commentsSlice';
import { showNotification } from './redux/uiSlice';
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Stack,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  TextField,
  Rating,
  Alert,
  CardMedia,
  CircularProgress,
  IconButton,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import {
  ArrowBack,
  Speed,
  AttachMoney,
  FlashOn,
  TrackChanges,
  LocationOn,
  Send as SendIcon,
  Star as StarIcon,
  LocalGasStation,
  Garage,
  AltRoute,
  Engineering,
  ElectricBolt
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Theme colors - now using dark blues for a modern luxury feel
// Theme colors - original dark theme
const darkBg = "#111517"; // Dark background
const accentPrimary = "#3498db"; // Main accent color
const accentSecondary = "green"; // Secondary accent
const darkPanel = "#1B2233"; // Panel background
const cardBg = "#181F2A"; // Card background
const textPrimary = "#FFFFFF"; // Primary text color
const textSecondary = "#B0B0B0"; // Secondary text color
const gold = "#FFD700"; // Gold for ratings
const successGreen = "#4CAF50"; // Success indicator
const errorRed = "#F44336"; // Error indicator
const glowEffect = `0 0 15px ${accentPrimary}30`;
const subtleShadow = '0 4px 20px rgba(0, 0, 0, 0.25)';

// Reusable feature chip component
const FeatureChip = ({ icon: Icon, label }) => (
  <Chip
    icon={<Icon sx={{ color: accentPrimary }} />}
    label={label}
    sx={{
      m: 0.5,
      px: 2,
      py: 1,
      borderRadius: 2,
      bgcolor: `${accentPrimary}15`,
      color: accentPrimary,
      fontWeight: 700,
      fontSize: '0.9rem',
      border: `1px solid ${accentPrimary}40`,
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: glowEffect,
        transform: 'translateY(-2px)'
      }
    }}
  />
);

// Comment card component
const CommentCard = ({ comment }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Paper
      elevation={2}
      sx={{
        bgcolor: darkPanel,
        color: textPrimary,
        borderRadius: 3,
        p: 3,
        mb: 3,
        borderLeft: `4px solid ${accentPrimary}`,
        boxShadow: subtleShadow,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2.5,
        '&:hover': {
          boxShadow: `0 10px 30px rgba(0, 0, 0, 0.4), 0 0 10px ${accentPrimary}20`,
        }
      }}
    >
      <Avatar
        src={comment.user?.profileImage || ''}
        alt={comment.user?.firstName || 'User'}
        sx={{
          width: 60,
          height: 60,
          border: `2px solid ${accentPrimary}40`,
          boxShadow: `0 0 10px ${accentPrimary}30`,
        }}
      />
      <Box sx={{ flex: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <Typography variant="subtitle1" fontWeight={700} color={accentPrimary}>
            {comment.user?.firstName} {comment.user?.lastName || 'User'}
          </Typography>
          <Rating value={comment.rating} readOnly size="small" sx={{ color: gold }} />
        </Stack>
        <Typography variant="body1" sx={{ color: textPrimary, mb: 1.5, lineHeight: 1.7 }}>
          {comment.content}
        </Typography>
        <Typography variant="caption" sx={{ color: textSecondary }}>
          {new Date(comment.createdAt).toLocaleDateString()}
        </Typography>
      </Box>
    </Paper>
  </motion.div>
);

// Main component
const CarDetail = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get data from redux
  const { currentCar, loading: carLoading } = useSelector(state => state.cars);
  const { comments, loading: commentsLoading, error: commentsError, successMessage } = useSelector(state => state.comments);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  
  // Local state
  const [tabValue, setTabValue] = useState(0);
  const [newComment, setNewComment] = useState({ rating: 5, content: '' });
  const [imgError, setImgError] = useState(false);
  const [addCommentLoading, setAddCommentLoading] = useState(false);

  // Fetch car data
  useEffect(() => {
    dispatch(fetchCarById(carId));
  }, [dispatch, carId]);

  // Fetch comments
  useEffect(() => {
    dispatch(fetchCommentsByCar(carId));
  }, [dispatch, carId]);

  // Clear success message after it displays
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch]);

  // Handle login redirect for comments
  const handleLoginRedirect = () => {
    localStorage.setItem('redirectAfterLogin', window.location.pathname);
    navigate('/login');
  };

  // Handle adding a new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    setAddCommentLoading(true);
    
    try {
      // For demo purposes, we're using a mock bookingId
      // In production, you'd have a way to associate comments with real bookings
      const mockBookingId = "663b1e7f8f8c8c001e3b2a1c";
      
      await dispatch(addComment({
        userId: user?._id,
        carId: carId,
        bookingId: mockBookingId,
        rating: newComment.rating,
        content: newComment.content
      })).unwrap();
      
      setNewComment({ rating: 5, content: '' });
      dispatch(showNotification({
        message: 'Your review has been added successfully!',
        type: 'success'
      }));
    } catch (error) {
      dispatch(showNotification({
        message: error || 'Failed to add comment. Please try again.',
        type: 'error'
      }));
    }
    
    setAddCommentLoading(false);
  };

  // Loading state
  if (carLoading) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        bgcolor: darkBg, 
        color: textPrimary, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress 
            sx={{ color: accentPrimary, mb: 3 }} 
            size={60}
          />
          <Typography 
            variant="h5" 
            sx={{
              color: accentPrimary,
              fontWeight: 500,
              letterSpacing: 1,
            }}
          >
            Loading Car Details
          </Typography>
        </Box>
      </Box>
    );
  }

  // Error state
  if (!currentCar) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        bgcolor: darkBg, 
        color: textPrimary, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
      }}>
        <Box sx={{ textAlign: 'center', maxWidth: 500, p: 3 }}>
          <Typography variant="h4" color={errorRed} mb={2}>
            Car Not Found
          </Typography>
          <Typography color={textSecondary} mb={4}>
            We couldn't find the car you're looking for. It may have been removed or you may have followed an invalid link.
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/carinventory')}
            sx={{
              bgcolor: accentPrimary,
              '&:hover': { bgcolor: accentSecondary },
            }}
          >
            Return to Inventory
          </Button>
        </Box>
      </Box>
    );
  }

  // Main render with data
  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: darkBg,
      color: textPrimary,
      pt: 6,
      pb: 10,
      position: 'relative',
      background: `radial-gradient(circle at top right, ${darkPanel}, ${darkBg} 70%)`,
    }}>
      {/* Background grid pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(to right, ${accentPrimary}08 1px, transparent 1px),
            linear-gradient(to bottom, ${accentPrimary}08 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          zIndex: 0,
          opacity: 0.5
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/carinventory')}
          sx={{
            mb: 5,
            color: accentPrimary,
            bgcolor: `${accentPrimary}10`,
            borderRadius: 2,
            px: 3,
            py: 1,
            fontSize: '0.9rem',
            fontWeight: 500,
            '&:hover': { 
              bgcolor: `${accentPrimary}20`,
            },
            border: `1px solid ${accentPrimary}30`,
            textTransform: 'none'
          }}
        >
          Back to Fleet
        </Button>

        {/* Hero Section with Car Details */}
        <Card
          sx={{
            position: 'relative',
            bgcolor: cardBg,
            borderRadius: 4,
            overflow: 'visible',
            boxShadow: subtleShadow,
            border: `1px solid ${accentPrimary}20`,
            mb: 8,
          }}
        >
          <Grid container spacing={0}>
            {/* Car Image Section */}
            <Grid size={{xs:12,md:6,lg:7}} sx={{ 
              position: 'relative',
              p: { xs: 3, md: 4 },
            }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
              >
                <Box sx={{ 
                  position: 'relative',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: subtleShadow,
                  border: `1px solid ${accentPrimary}30`,
                  height: { xs: 260, sm: 360, md: 400 },
                }}>
                  <CardMedia
                    component="img"
                    image={
                      !imgError && currentCar.images && currentCar.images.length > 0 && currentCar.images[0]
                        ? currentCar.images[0]
                        : 'https://via.placeholder.com/800x500?text=No+Image'
                    }
                    alt={`${currentCar.make} ${currentCar.model}`}
                    onError={() => setImgError(true)}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease',
                      '&:hover': {
                        transform: 'scale(1.03)'
                      }
                    }}
                  />
                </Box>

                {/* Car Specs Feature Box */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: { xs: -30, md: -30 },
                    right: { xs: 'auto', md: 30 },
                    left: { xs: '50%', md: 'auto' },
                    transform: { 
                      xs: 'translateX(-50%)', 
                      md: 'translateX(0)' 
                    },
                    bgcolor: darkPanel,
                    borderRadius: 3,
                    px: 3,
                    py: 2,
                    minWidth: 280,
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${accentPrimary}30`,
                    boxShadow: subtleShadow,
                    zIndex: 10
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid size={{xs:4}} sx={{ textAlign: 'center' }}>
                      <Box sx={{ color: accentPrimary, mb: 0.5 }}>
                        <ElectricBolt />
                      </Box>
                      <Typography variant="body2" color={textSecondary} gutterBottom>
                        Power
                      </Typography>
                      <Typography variant="h6" color={accentPrimary} fontWeight="bold">
                        {currentCar.specifications?.engine?.horsepower || 'N/A'} HP
                      </Typography>
                    </Grid>

                    <Grid size={{xs:4}} sx={{ textAlign: 'center' }} >
                      <Box sx={{ color: accentSecondary, mb: 0.5 }}>
                        <Speed />
                      </Box>
                      <Typography variant="body2" color={textSecondary} gutterBottom>
                        Top Speed
                      </Typography>
                      <Typography variant="h6" color={accentSecondary} fontWeight="bold">
                        {currentCar.specifications?.performance?.topSpeed || 'N/A'} 
                      </Typography>
                    </Grid>
                    
                    <Grid size={{xs:4}} sx={{ textAlign: 'center' }}>
                      <Box sx={{ color: accentPrimary, mb: 0.5 }}>
                        <AltRoute />
                      </Box>
                      <Typography variant="body2" color={textSecondary} gutterBottom>
                        0-100
                      </Typography>
                      <Typography variant="h6" color={accentPrimary} fontWeight="bold">
                        {currentCar.specifications?.performance?.zeroToSixty || 'N/A'}s
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </motion.div>
            </Grid>

            {/* Car Details Section */}
            <Grid  size={{xs:12,md:6,lg:5}} sx={{ 
              p: { xs: 3, md: 4 },
              pt: { xs: 6, md: 4 },
              position: 'relative',
              zIndex: 1
            }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Car Availability Badge */}
                <Chip
                  label={currentCar.availability?.status || "Available"} 
                  sx={{
                    bgcolor: currentCar.availability?.status === "Booked" ? `${errorRed}20` : `${successGreen}20`,
                    color: currentCar.availability?.status === "Booked" ? errorRed : successGreen,
                    fontWeight: 600,
                    borderRadius: '6px',
                    mb: 2
                  }}
                />

                {/* Car Name */}
                <Typography 
                  variant="h2" 
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '2.5rem', md: '3rem' },
                    color: textPrimary,
                    mb: 1,
                    letterSpacing: 0.5,
                    lineHeight: 1.1
                  }}
                >
                  {currentCar.make} <br/> {currentCar.model}
                </Typography>

                {/* Year & Location */}
                <Typography 
                  variant="h6" 
                  sx={{
                    color: textSecondary,
                    fontWeight: 400,
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {currentCar.year} &bull; <LocationOn sx={{ ml: 1, mr: 0.5, color: accentSecondary, fontSize: 20 }} /> {currentCar.availability?.location}
                </Typography>

                {/* Car Rating */}
                {currentCar.averageRating && (
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                    <Rating value={currentCar.averageRating} readOnly precision={0.5} sx={{ color: gold }} />
                    <Typography variant="body1" sx={{ color: gold, fontWeight: 600 }}>
                      {currentCar.averageRating?.toFixed(1) || "N/A"}
                    </Typography>
                    <Typography variant="body2" sx={{ color: textSecondary }}>
                      ({currentCar.totalReviews || 0} reviews)
                    </Typography>
                  </Stack>
                )}
                
                {/* Car Features */}
                <Stack 
                  direction="row" 
                  flexWrap="wrap" 
                  sx={{ mb: 4 }}
                >
                  <FeatureChip 
                    icon={LocalGasStation} 
                    label={currentCar.specifications?.engine?.type || 'Engine'} 
                  />
                  <FeatureChip 
                    icon={Engineering} 
                    label={currentCar.specifications?.engine?.transmission || 'Transmission'} 
                  />
                  <FeatureChip 
                    icon={Garage} 
                    label={`${currentCar.specifications?.dimensions?.weight || 'N/A'} kg`} 
                  />
                </Stack>
                
                {/* Car Description */}
                <Typography 
                  variant="body1" 
                  sx={{
                    fontSize: '1.05rem',
                    lineHeight: 1.7,
                    color: textPrimary,
                    mb: 4,
                    maxWidth: '95%'
                  }}
                >
                  {currentCar.description}
                </Typography>

                {/* Pricing Card */}
                <Card
                  sx={{
                    bgcolor: darkPanel,
                    color: textPrimary,
                    borderRadius: 3,
                    border: `1px solid ${accentSecondary}30`,
                    mb: 3,
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        color: accentSecondary,
                        fontWeight: 600,
                        mb: 2
                      }}
                    >
                      <AttachMoney sx={{ mr: 1 }} /> Rental Rates
                    </Typography>

                    <Grid container spacing={2}>
                      {Object.entries(currentCar.availability?.rentalPrice || {}).map(([period, price]) => (
                        <Grid size={{xs:6}} key={period}>
                          <Box sx={{ 
                            p: 1.5, 
                            textAlign: 'center',
                            borderRadius: 2,
                            bgcolor: `${accentSecondary}10`,
                            border: `1px solid ${accentSecondary}20`
                          }}>
                            <Typography variant="body2" sx={{ color: textSecondary, textTransform: 'capitalize' }}>
                              {period}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: accentSecondary }}>
                              ${price?.toLocaleString()}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>

                {/* Booking Button */}
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: accentPrimary,
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: '1rem',
                    borderRadius: 2,
                    px: 5,
                    py: 1.5,
                    textTransform: 'none',
                    transition: 'all 0.3s',
                    '&:hover': { 
                      bgcolor: accentSecondary,
                      transform: 'translateY(-3px)',
                      boxShadow: glowEffect
                    }
                  }}
                  onClick={() => navigate(`/booking/${currentCar._id}`)}
                >
                  Book Now
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </Card>

        {/* Technical Specifications */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: textPrimary,
              mb: 4,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: 0,
                width: '60px',
                height: '3px',
                background: accentPrimary,
                borderRadius: 2
              }
            }}
          >
            Technical Specifications
          </Typography>

          <Card
            sx={{
              bgcolor: cardBg,
              borderRadius: 3,
              border: `1px solid ${accentPrimary}20`,
              overflow: 'hidden',
              boxShadow: subtleShadow,
            }}
          >
            <Tabs
              value={tabValue}
              onChange={(e, newVal) => setTabValue(newVal)}
              sx={{
                borderBottom: `1px solid ${accentPrimary}20`,
                '& .MuiTabs-indicator': { bgcolor: accentPrimary },
                '& .MuiTab-root': { 
                  color: textSecondary, 
                  fontWeight: 600, 
                  fontSize: '1rem',
                  textTransform: 'none',
                  minWidth: 100
                },
                '& .Mui-selected': { color: accentPrimary }
              }}
            >
              <Tab label="Engine" />
              <Tab label="Performance" />
              <Tab label="Dimensions" />
            </Tabs>

            <Box sx={{ p: 3 }}>
              {tabValue === 0 && (
                <Grid container spacing={2}>
                  {Object.entries(currentCar.specifications?.engine || {}).map(([key, value]) => (
                    <Grid size={{xs:12, sm:6, md:4}} key={key}>
                      <Card
                        sx={{
                          bgcolor: darkPanel,
                          boxShadow: 'none',
                          borderRadius: 2,
                          height: '100%',
                          border: `1px solid ${accentPrimary}20`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: glowEffect,
                            transform: 'translateY(-3px)'
                          }
                        }}
                      >
                        <CardContent sx={{ p: 2 }}>
                          <Typography
                            variant="overline"
                            sx={{ color: textSecondary, fontWeight: 600, fontSize: '0.7rem' }}
                          >
                            {key.replace(/([A-Z])/g, ' $1')}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, color: accentPrimary, mt: 0.5 }}
                          >
                            {value}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}

              {tabValue === 1 && (
                <Grid container spacing={2}>
                  {Object.entries(currentCar.specifications?.performance || {}).map(([key, value]) => (
                    <Grid size={{xs:12,sm:6,md:4}} key={key}>
                      <Card
                        sx={{
                          bgcolor: darkPanel,
                          boxShadow: 'none',
                          borderRadius: 2,
                          height: '100%',
                          border: `1px solid ${accentSecondary}20`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: `0 0 15px ${accentSecondary}40`,
                            transform: 'translateY(-3px)'
                          }
                        }}
                      >
                        <CardContent sx={{ p: 2 }}>
                          <Typography
                            variant="overline"
                            sx={{ color: textSecondary, fontWeight: 600, fontSize: '0.7rem' }}
                          >
                            {key.replace(/([A-Z])/g, ' $1')}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, color: accentSecondary, mt: 0.5 }}
                          >
                            {value}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}

              {tabValue === 2 && (
                <Grid container spacing={2}>
                  {Object.entries(currentCar.specifications?.dimensions || {}).map(([key, value]) => (
                    <Grid size={{xs:12,sm:6,md:4}} key={key}>
                      <Card
                        sx={{
                          bgcolor: darkPanel,
                          boxShadow: 'none',
                          borderRadius: 2,
                          height: '100%',
                          border: `1px solid ${accentPrimary}20`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: glowEffect,
                            transform: 'translateY(-3px)'
                          }
                        }}
                      >
                        <CardContent sx={{ p: 2 }}>
                          <Typography
                            variant="overline"
                            sx={{ color: textSecondary, fontWeight: 600, fontSize: '0.7rem' }}
                          >
                            {key.replace(/([A-Z])/g, ' $1')}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, color: accentPrimary, mt: 0.5 }}
                          >
                            {value}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </Card>
        </Box>

        {/* Comments Section */}
        <Box sx={{ maxWidth: 900, mx: 'auto', mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: textPrimary,
              mb: 4,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: 0,
                width: '60px',
                height: '3px',
                background: accentSecondary,
                borderRadius: 2
              }
            }}
          >
            Customer Reviews
          </Typography>

          {/* Comments loading state */}
          {commentsLoading && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CircularProgress size={24} sx={{ color: accentSecondary, mr: 2 }} />
              <Typography color={accentSecondary}>Loading reviews...</Typography>
            </Box>
          )}

          {/* Comments error state */}
          {commentsError && (
            <Alert severity="error" sx={{ mb: 2 }}>{commentsError}</Alert>
          )}

          {/* Empty comments state */}
          {!commentsLoading && comments.length === 0 && (
            <Box 
              sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 3,
                bgcolor: cardBg,
                border: `1px solid ${accentPrimary}20`,
                mb: 4
              }}
            >
              <Typography color={textSecondary} sx={{ mb: 2 }}>
                No reviews yet. Be the first to share your experience!
              </Typography>
            </Box>
          )}

          {/* Comments list */}
          {comments.map((comment) => (
            <CommentCard key={comment._id} comment={comment} />
          ))}

          {/* Add Comment Card */}
          <Card
            sx={{
              bgcolor: cardBg,
              borderRadius: 3,
              border: `1px solid ${accentPrimary}20`,
              mt: 6,
              overflow: 'hidden',
              position: 'relative',
              boxShadow: subtleShadow,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: accentPrimary,
              }}
            />
            
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} color={accentPrimary} mb={3}>
                Share Your Experience
              </Typography>
              
              {/* Not logged in state */}
              {!isAuthenticated ? (
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Typography color={textSecondary} sx={{ mb: 2 }}>
                    Please log in to submit a review
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={handleLoginRedirect}
                    sx={{
                      color: accentPrimary,
                      borderColor: accentPrimary,
                      '&:hover': {
                        borderColor: accentSecondary,
                        color: accentSecondary
                      }
                    }}
                  >
                    Log In
                  </Button>
                </Box>
              ) : (
                // Logged in comment form
                <form onSubmit={handleAddComment}>
                  <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ mr: 2, color: textSecondary }}>
                      Your Rating:
                    </Typography>
                    <Rating
                      name="rating"
                      value={newComment.rating}
                      onChange={(_, value) => setNewComment((prev) => ({ ...prev, rating: value || 5 }))}
                      size="large"
                      sx={{ color: gold }}
                    />
                  </Box>
                  
                  <TextField
                    label="Write your review"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    value={newComment.content}
                    onChange={e => setNewComment((prev) => ({ ...prev, content: e.target.value }))}
                    sx={{
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        bgcolor: darkPanel,
                        borderRadius: 2,
                        '& fieldset': {
                          borderColor: `${accentPrimary}40`
                        },
                        '&:hover fieldset': {
                          borderColor: `${accentPrimary}80`
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: accentPrimary
                        }
                      },
                      '& .MuiInputLabel-root': {
                        color: textSecondary
                      },
                      input: { color: textPrimary }
                    }}
                    required
                  />
                  
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                    disabled={addCommentLoading || !newComment.content}
                    sx={{
                      bgcolor: accentPrimary,
                      color: "#fff",
                      fontWeight: 600,
                      px: 4,
                      py: 1.2,
                      borderRadius: 2,
                      '&:hover': { 
                        bgcolor: accentSecondary,
                      },
                      textTransform: 'none'
                    }}
                  >
                    {addCommentLoading ? "Submitting..." : "Submit Review"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default CarDetail;