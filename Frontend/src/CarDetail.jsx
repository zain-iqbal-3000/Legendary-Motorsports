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
  TextField,
  Rating,
  Alert,
  Paper,
} from '@mui/material';
import {
  ArrowBack,
  Speed,
  AttachMoney,
  FlashOn,
  TrackChanges,
  LocationOn,
  Send as SendIcon,
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
    icon={<Icon sx={{ color: gold }} />}
    label={label}
    sx={{
      m: 0.5,
      px: 2,
      py: 1,
      borderRadius: 2,
      bgcolor: `${gold}22`,
      color: gold,
      fontWeight: 700,
      fontSize: '1rem',
      border: `2px solid ${gold}`,
    }}
  />
);

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  // Comments
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState(null);

  // Add comment
  const [newComment, setNewComment] = useState({ rating: 5, content: '' });
  const [addCommentLoading, setAddCommentLoading] = useState(false);
  const [addCommentError, setAddCommentError] = useState(null);
  const [addCommentSuccess, setAddCommentSuccess] = useState(null);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  const handleBack = () => {
    navigate('/carinventory');
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: darkBg,
      color: textPrimary,
      pt: 4,
      pb: 8,
    }}>
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{
            mb: 3,
            color: gold,
            fontWeight: 700,
            bgcolor: `${gold}11`,
            borderRadius: 2,
            px: 3,
            '&:hover': { bgcolor: `${gold}33` }
          }}
        >
          Back to Fleet
        </Button>

        {/* Hero Section */}
        <Grid container spacing={4} alignItems="center" sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={controls}
              transition={{ delay: 0.15 }}
            >
              <Typography variant="h2" sx={{
                fontWeight: 900,
                fontSize: { xs: '2.2rem', md: '3.2rem' },
                background: `linear-gradient(90deg, ${gold} 30%, #fff7b2 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                letterSpacing: 1
              }}>
                {car.make} {car.model}
              </Typography>
              <Typography variant="h6" sx={{
                color: gold,
                fontWeight: 600,
                mb: 2
              }}>
                {car.year} &bull; {car.availability?.location}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                <FeatureChip icon={FlashOn} label={`${car.specifications?.engine?.horsepower || 'N/A'} HP`} />
                <FeatureChip icon={Speed} label={`${car.specifications?.performance?.topSpeed || 'N/A'} km/h`} />
                <FeatureChip icon={TrackChanges} label={`0-100km/h ${car.specifications?.performance?.zeroToSixty || 'N/A'}s`} />
              </Stack>
              <Typography variant="body1" sx={{
                fontSize: '1.15rem',
                lineHeight: 1.7,
                opacity: 0.92,
                mb: 3,
                color: textSecondary
              }}>
                {car.description}
              </Typography>
              <Chip
                icon={<LocationOn sx={{ color: purple }} />}
                label={`Available in ${car.availability?.location || 'N/A'}`}
                sx={{
                  bgcolor: gold,
                  color: purple,
                  fontWeight: 600,
                  fontSize: '0.95rem'
                }}
              />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <Card
                sx={{
                  borderRadius: 5,
                  boxShadow: `0 12px 40px ${gold}44`,
                  border: `3px solid ${gold}`,
                  overflow: 'hidden',
                  bgcolor: cardBg,
                  p: 0,
                  mb: 1
                }}
              >
                <Box
                  sx={{
                    height: { xs: 220, md: 340 },
                    backgroundImage: `url(${car.images?.[0] || 'https://via.placeholder.com/600x400'})`,
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
          <Grid item xs={12} md={8}>
            <AnimatedCard>
              <Card
                sx={{
                  bgcolor: accent,
                  borderRadius: 4,
                  boxShadow: `0 4px 24px ${gold}22`,
                  border: `2px solid ${border}`,
                  mb: 3
                }}
              >
                <CardContent>
                  <Tabs
                    value={tabValue}
                    onChange={(e, newVal) => setTabValue(newVal)}
                    sx={{
                      mb: 3,
                      '& .MuiTabs-indicator': { bgcolor: gold },
                      '& .MuiTab-root': { color: `${gold}99`, fontWeight: 700, fontSize: '1.1rem' },
                      '& .Mui-selected': { color: gold }
                    }}
                  >
                    <Tab label="Engine" />
                    <Tab label="Performance" />
                    <Tab label="Dimensions" />
                  </Tabs>
                  <Divider sx={{ mb: 2, borderColor: border }} />
                  {tabValue === 0 && (
                    <Grid container spacing={2}>
                      {Object.entries(car.specifications?.engine || {}).map(([key, value]) => (
                        <Grid item xs={12} sm={6} key={key}>
                          <Box sx={{
                            p: 2,
                            borderRadius: 2,
                            bgcolor: `${gold}11`,
                            border: `1.5px solid ${border}`,
                            mb: 1
                          }}>
                            <Typography variant="overline" sx={{ color: `${gold}cc`, fontWeight: 700 }}>
                              {key.replace(/([A-Z])/g, ' $1')}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: textPrimary }}>
                              {value}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                  {tabValue === 1 && (
                    <Grid container spacing={2}>
                      {Object.entries(car.specifications?.performance || {}).map(([key, value]) => (
                        <Grid item xs={12} sm={6} key={key}>
                          <Box sx={{
                            p: 2,
                            borderRadius: 2,
                            bgcolor: `${gold}11`,
                            border: `1.5px solid ${border}`,
                            mb: 1
                          }}>
                            <Typography variant="overline" sx={{ color: `${gold}cc`, fontWeight: 700 }}>
                              {key.replace(/([A-Z])/g, ' $1')}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: textPrimary }}>
                              {value}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                  {tabValue === 2 && (
                    <Grid container spacing={2}>
                      {Object.entries(car.specifications?.dimensions || {}).map(([key, value]) => (
                        <Grid item xs={12} sm={6} key={key}>
                          <Box sx={{
                            p: 2,
                            borderRadius: 2,
                            bgcolor: `${gold}11`,
                            border: `1.5px solid ${border}`,
                            mb: 1
                          }}>
                            <Typography variant="overline" sx={{ color: `${gold}cc`, fontWeight: 700 }}>
                              {key.replace(/([A-Z])/g, ' $1')}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: textPrimary }}>
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
          <Grid item xs={12} md={4}>
            <AnimatedCard>
              <Card
                sx={{
                  bgcolor: gold,
                  color: purple,
                  borderRadius: 4,
                  boxShadow: `0 2px 24px ${gold}55`,
                  border: `2px solid ${purple}33`,
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
                    <AttachMoney sx={{ color: purple }} /> Rental Rates
                  </Typography>
                  <Stack spacing={2} sx={{ mb: 3 }}>
                    {Object.entries(car.availability?.rentalPrice || {}).map(([period, price]) => (
                      <Box key={period} sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: '#fffde4',
                        border: `1px solid ${purple}22`
                      }}>
                        <Typography variant="body1" sx={{ textTransform: 'capitalize', fontWeight: 700, color: purple }}>
                          {period}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 900, color: purple }}>
                          ${price?.toLocaleString()}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      bgcolor: purple,
                      color: gold,
                      fontWeight: 800,
                      fontSize: '1.1rem',
                      '&:hover': {
                        bgcolor: '#4B006E'
                      },
                      boxShadow: `0 4px 16px ${purple}22`,
                      transition: 'all 0.2s'
                    }}
                    onClick={() => navigate(`/booking/${car._id}`)}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </AnimatedCard>
          </Grid>
        </Grid>

        {/* Comments Section */}
        <Box sx={{ maxWidth: 900, mx: 'auto', mt: 10 }}>
          <Typography variant="h4" sx={{
            fontWeight: 800,
            mb: 3,
            color: gold,
            letterSpacing: 1
          }}>
            Customer Reviews
          </Typography>
          {commentsLoading && (
            <Typography color={gold} sx={{ mb: 2 }}>Loading comments...</Typography>
          )}
          {commentsError && (
            <Alert severity="error" sx={{ mb: 2 }}>{commentsError}</Alert>
          )}
          {!commentsLoading && comments.length === 0 && (
            <Typography color={textSecondary} sx={{ mb: 2 }}>No reviews yet. Be the first to review this car!</Typography>
          )}
          {comments.map((comment) => (
            <CommentCard key={comment._id} comment={comment} />
          ))}

          {/* Add Comment */}
          <Box
            component="form"
            onSubmit={handleAddComment}
            sx={{
              mt: 6,
              bgcolor: accent,
              borderRadius: 3,
              p: 4,
              boxShadow: `0 2px 16px ${gold}22`,
              border: `2px solid ${gold}33`
            }}
          >
            <Typography variant="h6" fontWeight={700} color={gold} mb={2}>
              Add Your Review
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center" mb={2}>
              <Rating
                name="rating"
                value={newComment.rating}
                onChange={(_, value) => setNewComment((prev) => ({ ...prev, rating: value }))}
                size="large"
                sx={{ color: gold }}
              />
              <TextField
                label="Your review"
                variant="filled"
                fullWidth
                multiline
                minRows={2}
                value={newComment.content}
                onChange={e => setNewComment((prev) => ({ ...prev, content: e.target.value }))}
                sx={{
                  bgcolor: cardBg,
                  borderRadius: 2,
                  input: { color: textPrimary },
                  label: { color: gold },
                  '& .MuiFilledInput-root': { bgcolor: cardBg, color: textPrimary }
                }}
                required
              />
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                disabled={addCommentLoading || !newComment.content}
                sx={{
                  bgcolor: gold,
                  color: purple,
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  '&:hover': { bgcolor: '#ffe066' }
                }}
              >
                {addCommentLoading ? "Submitting..." : "Submit"}
              </Button>
            </Stack>
            {addCommentError && <Alert severity="error" sx={{ mt: 2 }}>{addCommentError}</Alert>}
            {addCommentSuccess && <Alert severity="success" sx={{ mt: 2 }}>{addCommentSuccess}</Alert>}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CarDetail;