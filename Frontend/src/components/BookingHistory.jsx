import { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Stack,
  Chip,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Badge,
  Divider,
  Paper,
  useTheme,
  useMediaQuery,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  AccessTime,
  CheckCircle,
  Cancel,
  DirectionsCar,
  Edit,
  Receipt,
  ArrowRightAlt,
  PrintOutlined,
  GetAppOutlined,
  Close,
  ErrorOutline,
} from "@mui/icons-material";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Header from "./Header";
import Footer from "./Footer";
import { motion } from "framer-motion";
import theme from "../theme";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

// Replace hardcoded colors with theme colors
const primaryColour = theme.palette.primary.main;
const secondaryColour = theme.palette.secondary.main;
const darkBlueColor = theme.palette.primary.blue;
const accentRedColor = theme.palette.primary.red;

// Animation variants for cards
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Status mapping constants
const statusColors = {
  active: "primary",
  upcoming: "info",
  completed: "success",
  cancelled: "error",
};

const statusIcons = {
  active: <AccessTime sx={{ mr: 0.5 }} fontSize="small" />,
  upcoming: <DirectionsCar sx={{ mr: 0.5 }} fontSize="small" />,
  completed: <CheckCircle sx={{ mr: 0.5 }} fontSize="small" />,
  cancelled: <Cancel sx={{ mr: 0.5 }} fontSize="small" />,
};

// Tab names
const tabLabels = ["Current Rentals", "Upcoming Reservations", "Past Rentals"];
const tabStatuses = ["Current", "Upcoming", "Past"];

function BookingHistory() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { currentUser } = useAuth();
  
  // Tab state: 0=Current, 1=Upcoming, 2=Past
  const [tab, setTab] = useState(0);

  // Filter/sort state
  const [filterType, setFilterType] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc");
  
  // Booking data state
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Invoice modal state
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Review modal state
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewBooking, setReviewBooking] = useState(null);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState(null);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewedBookings, setReviewedBookings] = useState([]);
  
  // Reference to the textarea to avoid re-renders
  const reviewTextareaRef = useRef(null);

  // Fetch bookings on component mount
  useEffect(() => {
    fetchBookings();
  }, [currentUser]);

  // Fetch bookings from backend
  const fetchBookings = async () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');
      // Fetch bookings by user id from backend
      const response = await axios.get(`/api/bookings/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Map backend bookings to frontend format
      const mappedBookings = response.data.map(b => {
        // Determine status for tab filtering
        // "active" if startDate <= now <= endDate and status is ACTIVE/CONFIRMED
        // "upcoming" if startDate > now and status is PENDING/CONFIRMED
        // "completed" if status is COMPLETED or endDate < now
        // "cancelled" if status is CANCELLED
        const now = new Date();
        const start = new Date(b.startDate);
        const end = new Date(b.endDate);
        let status = "pending";
        if (b.status) {
          const s = b.status.toUpperCase();
          if (s === "CANCELLED") status = "cancelled";
          else if (s === "COMPLETED") status = "completed";
          else if (s === "ACTIVE" || s === "CONFIRMED") {
            if (end < now) status = "completed";
            else if (start > now) status = "upcoming";
            else status = "active";
          } else if (s === "PENDING") {
            if (start > now) status = "upcoming";
            else if (end < now) status = "completed";
            else status = "active";
          }
        }
        return {
          id: b._id,
          carId: b.car && b.car._id, // Add carId explicitly
          car: {
            id: b.car && b.car._id, // Add id inside car object
            name: b.car && b.car.make && b.car.model ? `${b.car.make} ${b.car.model}` : '',
            year: b.car && b.car.year ? b.car.year : '',
            image: b.car && b.car.images && b.car.images.length > 0 ? b.car.images[0] : '',
            type: b.car && b.car.specifications && b.car.specifications.bodyType ? b.car.specifications.bodyType : 'N/A'
          },
          pickup: { location: b.pickupLocation, date: b.startDate },
          dropoff: { location: b.dropoffLocation, date: b.endDate },
          price: b.totalAmount,
          duration: `${Math.ceil((new Date(b.endDate) - new Date(b.startDate)) / (1000 * 60 * 60 * 24))} days`,
          status,
          requiresAction: typeof b.requiresAction === 'boolean' ? b.requiresAction : false,
          createdAt: b.createdAt
        };
      });
      setBookings(mappedBookings);
      setError(null);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load your bookings. Please try again.");
      // Provide fallback mock data for development/testing
      if (process.env.NODE_ENV !== 'production') {
        setBookings([
          {
            id: "b1",
            carId: "c1", // Make sure mock data includes carId
            car: {
              id: "c1", // Add id inside car object for mock data
              name: "Lamborghini Aventador",
              year: 2023,
              image: "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?auto=format&fit=crop&w=600&q=80",
              type: "Coupe",
            },
            pickup: { location: "Dubai Downtown", date: "2025-05-10T10:00:00Z" },
            dropoff: { location: "Dubai Airport", date: "2025-05-12T14:00:00Z" },
            price: 5200,
            duration: "2 days",
            status: "active",
            requiresAction: true,
            createdAt: "2023-05-01T12:00:00Z",
          },
          {
            id: 'mock-completed-1',
            car: {
              name: 'Bugatti Veyron',
              year: 2012,
              image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=600&q=80',
              type: 'Coupe'
            },
            pickup: { location: 'Dubai Marina', date: '2023-01-01T10:00:00Z' },
            dropoff: { location: 'Dubai Marina', date: '2023-01-03T10:00:00Z' },
            price: 10000,
            duration: '2 days',
            status: 'completed',
            requiresAction: false,
            createdAt: '2023-01-01T09:00:00Z'
          }
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Cancel booking
  const handleCancelBooking = async (bookingId) => {
    if (!currentUser) return;

    setActionLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      await axios.patch(`/api/bookings/${bookingId}/cancel`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Update local state
      setBookings(bookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
      ));
      
      // Show success message
      // You could add a snackbar/toast here
      
    } catch (err) {
      console.error("Error cancelling booking:", err);
      setError("Failed to cancel booking. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  // Generate invoice number
  const generateInvoiceNumber = (bookingId) => {
    return `INV-${new Date().getFullYear()}-${bookingId.toString().padStart(5, "0")}`;
  };
  
  // Invoice handling functions
  const handleOpenInvoice = (booking) => {
    setSelectedBooking(booking);
    setInvoiceOpen(true);
  };
  
  const handleCloseInvoice = () => {
    setInvoiceOpen(false);
  };

  // Handle opening review dialog
  const handleOpenReview = (booking) => {
    setReviewBooking(booking);
    setReviewError(null);
    setReviewSuccess(false);
    setReviewComment('');
    setReviewOpen(true);
    
    // Clear textarea when reopening modal
    if (reviewTextareaRef.current) {
      setTimeout(() => {
        if (reviewTextareaRef.current) {
          reviewTextareaRef.current.value = '';
        }
      }, 50);
    }
  };

  // Handle submitting review
  const handleSubmitReview = async () => {
    // Get value directly from the DOM element instead of state
    const commentValue = reviewTextareaRef.current ? reviewTextareaRef.current.value.trim() : '';
    
    if (!reviewRating || !commentValue) {
      setReviewError('Please provide a rating and comment.');
      return;
    }
    
    setReviewSubmitting(true);
    setReviewError(null);
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('authToken');
      
      // Make sure we have a valid car ID - improve the extraction logic
      const carId = reviewBooking.carId || 
                   (reviewBooking.car && reviewBooking.car.id) || 
                   (reviewBooking.car && reviewBooking.car._id);
      
      console.log("Review booking data:", reviewBooking);
      console.log("Car ID for review:", carId);
      
      // Additional fallback - this is a last resort
      if (!carId && reviewBooking && reviewBooking.car) {
        console.warn("Car ID not found in standard properties, using booking ID as fallback");
        const bookingData = await axios.get(`/api/bookings/${reviewBooking.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (bookingData.data && bookingData.data.car) {
          console.log("Retrieved car ID from booking data:", bookingData.data.car);
          await axios.post('/api/comments', {
            userId,
            carId: bookingData.data.car,
            bookingId: reviewBooking.id,
            rating: reviewRating,
            content: reviewTextareaRef.current.value.trim()
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          setReviewSuccess(true);
          setReviewedBookings(prev => [...prev, reviewBooking.id]);
          setReviewRating(0);
          setTimeout(() => setReviewOpen(false), 1200);
          return;
        }
      }
      
      if (!carId) {
        throw new Error('Could not determine car ID for review');
      }
      
      await axios.post('/api/comments', {
        userId,
        carId,
        bookingId: reviewBooking.id,
        rating: reviewRating,
        content: reviewTextareaRef.current.value.trim()
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setReviewSuccess(true);
      setReviewedBookings(prev => [...prev, reviewBooking.id]);
      setReviewRating(0);
      setTimeout(() => setReviewOpen(false), 1200);
    } catch (err) {
      console.error("Error submitting review:", err);
      setReviewError('Failed to submit review. Please try again.');
    } finally {
      setReviewSubmitting(false);
    }
  };
  
  // Filter and sort logic
  const filterBookings = (status) => {
    // Guard clause if bookings aren't loaded yet
    if (!bookings.length) return [];
    
    let filtered = bookings.filter((b) => {
      if (status === "Current") return b.status === "active";
      if (status === "Upcoming") return b.status === "upcoming";
      if (status === "Past") return b.status === "completed" || b.status === "cancelled";
      return true;
    });
    
    if (filterType !== "All") {
      filtered = filtered.filter((b) => b.car.type === filterType);
    }
    
    if (sortBy === "date-desc") {
      filtered = filtered.sort((a, b) => new Date(b.pickup.date) - new Date(a.pickup.date));
    } else if (sortBy === "date-asc") {
      filtered = filtered.sort((a, b) => new Date(a.pickup.date) - new Date(b.pickup.date));
    }
    
    return filtered;
  };

  // Get unique car types from the bookings for filtering
  const carTypes = ["All", ...new Set(bookings.map(b => b.car.type))];

  // Invoice Modal Component
  const InvoiceModal = () => {
    if (!selectedBooking) return null;
    
    // Invoice calculation logic
    const invoiceNumber = generateInvoiceNumber(selectedBooking.id);
    const pickupDate = new Date(selectedBooking.pickup.date);
    const dropoffDate = new Date(selectedBooking.dropoff.date);
    const days = Math.ceil((dropoffDate - pickupDate) / (1000 * 60 * 60 * 24));
    const dailyRate = Math.round(selectedBooking.price / days);
    const subtotal = dailyRate * days;
    const tax = subtotal * 0.05; // 5% tax
    const total = subtotal + tax;
    
    return (
      <Dialog 
        open={invoiceOpen} 
        onClose={handleCloseInvoice}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ 
          bgcolor: darkBlueColor, 
          color: 'white', 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2
        }}>
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Invoice #{invoiceNumber}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              {selectedBooking.status} Booking
            </Typography>
          </Box>
          <IconButton onClick={handleCloseInvoice} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <Grid container spacing={4}>
            {/* Company and Customer Info */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mb: 3 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">Bill From</Typography>
                  <Typography variant="subtitle1" fontWeight={700} color={darkBlueColor}>Legendary Motorsports</Typography>
                  <Typography variant="body2">Downtown Dubai</Typography>
                  <Typography variant="body2">United Arab Emirates</Typography>
                </Box>
                <Box sx={{ textAlign: { xs: 'left', sm: 'right' }, mt: { xs: 2, sm: 0 } }}>
                  <Typography variant="body2" color="text.secondary">Invoice Date</Typography>
                  <Typography variant="body2">{new Date().toLocaleDateString()}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Booking Status</Typography>
                  <Chip 
                    label={selectedBooking.status} 
                    size="small"
                    color={statusColors[selectedBooking.status]}
                    sx={{
                      fontWeight: 600,
                      bgcolor: statusColors[selectedBooking.status] === "primary" ? primaryColour : undefined,
                      color: statusColors[selectedBooking.status] === "primary" ? darkBlueColor : undefined,
                    }}
                  />
                </Box>
              </Box>
            </Grid>
            
            {/* Car Details */}
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ 
                p: 2, 
                borderRadius: 2, 
                bgcolor: alpha(primaryColour, 0.1),
                mb: 3,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: 2
              }}>
                <Box 
                  component="img" 
                  src={selectedBooking.car.image} 
                  alt={selectedBooking.car.name}
                  sx={{ 
                    width: { xs: '100%', sm: 120 }, 
                    height: { xs: 160, sm: 80 },
                    objectFit: 'cover',
                    borderRadius: 2
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight={700} color={darkBlueColor}>
                    {selectedBooking.car.name} ({selectedBooking.car.year})
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedBooking.car.type}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ textAlign: 'right' }}>
                    Rental Duration
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color={darkBlueColor}>
                    {selectedBooking.duration}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            
            {/* Rental Details */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" fontWeight={600} color="text.secondary">
                  PICKUP DETAILS
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {selectedBooking.pickup.location}
                </Typography>
                <Typography variant="body2">
                  {new Date(selectedBooking.pickup.date).toLocaleDateString()} • {new Date(selectedBooking.pickup.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" fontWeight={600} color="text.secondary">
                  DROP-OFF DETAILS
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {selectedBooking.dropoff.location}
                </Typography>
                <Typography variant="body2">
                  {new Date(selectedBooking.dropoff.date).toLocaleDateString()} • {new Date(selectedBooking.dropoff.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </Typography>
              </Box>
            </Grid>
            
            {/* Invoice Table */}
            <Grid item xs={12}>
              <TableContainer component={Paper} sx={{ borderRadius: 2, mb: 3, overflow: 'hidden' }}>
                <Table>
                  <TableHead sx={{ bgcolor: alpha(darkBlueColor, 0.05) }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>Rate</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>Quantity</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {selectedBooking.car.name} Rental
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Premium Luxury Car Rental
                        </Typography>
                      </TableCell>
                      <TableCell align="right">${dailyRate.toLocaleString()}/day</TableCell>
                      <TableCell align="right">{days} days</TableCell>
                      <TableCell align="right">${subtotal.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2} />
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Subtotal</TableCell>
                      <TableCell align="right">${subtotal.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2} />
                      <TableCell align="right" sx={{ fontWeight: 600 }}>VAT (5%)</TableCell>
                      <TableCell align="right">${tax.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow sx={{ bgcolor: alpha(primaryColour, 0.1) }}>
                      <TableCell colSpan={2} />
                      <TableCell align="right" sx={{ fontWeight: 700, color: darkBlueColor }}>Total</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: darkBlueColor }}>${total.toLocaleString()}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            
            {/* Payment Info */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
                Payment Information
              </Typography>
              <Typography variant="body2">
                Payment was processed on {new Date(selectedBooking.pickup.date).toLocaleDateString()} via Credit Card ending in **** 1234.
              </Typography>
            </Grid>
            
            {/* Terms */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                Terms & Conditions
              </Typography>
              <Typography variant="caption" color="text.secondary">
                This invoice is automatically generated and is valid without a signature. Please contact our customer service for any questions regarding this invoice.
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 4, pb: 3 }}>
          <Button 
            variant="outlined" 
            startIcon={<PrintOutlined />}
            onClick={() => window.print()}
            sx={{ 
              borderRadius: 2, 
              fontWeight: 600,
              borderColor: alpha(darkBlueColor, 0.5),
              color: darkBlueColor,
              "&:hover": { borderColor: darkBlueColor }  
            }}
          >
            Print
          </Button>
          <Button 
            variant="contained" 
            startIcon={<GetAppOutlined />}
            sx={{ 
              borderRadius: 2, 
              fontWeight: 600,
              bgcolor: primaryColour, 
              color: darkBlueColor,
              "&:hover": { bgcolor: alpha(primaryColour, 0.9) }  
            }}
          >
            Download PDF
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  // Review Modal Component
  const ReviewModal = () => (
    <Dialog open={reviewOpen} onClose={() => setReviewOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          bgcolor: alpha(secondaryColour, 0.08),
          fontWeight: 700,
          fontSize: "1.3rem",
          letterSpacing: "-0.01em",
          pb: 1,
          borderBottom: `1px solid ${alpha(darkBlueColor, 0.08)}`
        }}
      >
        Leave a Review
        <IconButton
          aria-label="close"
          onClick={() => setReviewOpen(false)}
          sx={{ position: 'absolute', right: 8, top: 8, color: darkBlueColor }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 4, bgcolor: alpha(primaryColour, 0.03) }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight={700} color={darkBlueColor}>
            {reviewBooking?.car?.name} ({reviewBooking?.car?.year})
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {reviewBooking?.pickup?.location} to {reviewBooking?.dropoff?.location}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
            Your Rating
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            {[1,2,3,4,5].map(star => (
              <IconButton
                key={star}
                onClick={() => setReviewRating(star)}
                color={reviewRating >= star ? "warning" : "default"}
                size="large"
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                sx={{
                  transition: "transform 0.15s",
                  transform: reviewRating === star ? "scale(1.2)" : "scale(1)",
                  "&:hover": { transform: "scale(1.2)" }
                }}
                tabIndex={0}
                type="button"
              >
                {reviewRating >= star ? <StarIcon fontSize="large" /> : <StarBorderIcon fontSize="large" />}
              </IconButton>
            ))}
          </Stack>
          <InputLabel htmlFor="review-comment" sx={{ fontWeight: 600, mb: 1, color: darkBlueColor }}>
            Your Comment
          </InputLabel>
          {/* Wrap textarea in a form and prevent default on submit */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSubmitReview();
            }}
          >
            <Paper
              elevation={0}
              sx={{
                borderRadius: 2,
                border: `1.5px solid ${alpha(darkBlueColor, 0.15)}`,
                bgcolor: "#fff",
                mb: 1,
                p: 0
              }}
            >
              <textarea
                id="review-comment"
                ref={reviewTextareaRef}
                rows={5}
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  resize: "vertical",
                  padding: 14,
                  fontSize: 16,
                  fontFamily: "inherit",
                  background: "transparent",
                  color: darkBlueColor,
                  borderRadius: 8,
                  minHeight: 80
                }}
                defaultValue="" // Use defaultValue instead of value
                disabled={reviewSubmitting}
                placeholder="Share your experience..."
                autoComplete="off"
                spellCheck={true}
              />
            </Paper>
            <Typography variant="caption" color="text.secondary">
              Please be respectful and constructive. Your review will help others!
            </Typography>
            {reviewError && (
              <Alert severity="error" sx={{ mt: 2 }}>{reviewError}</Alert>
            )}
            {reviewSuccess && (
              <Alert severity="success" sx={{ mt: 2 }}>Review submitted!</Alert>
            )}
            <DialogActions sx={{ px: 0, pb: 0, bgcolor: "transparent" }}>
              <Button onClick={() => setReviewOpen(false)} disabled={reviewSubmitting} sx={{ borderRadius: 2 }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                disabled={reviewSubmitting}
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  bgcolor: secondaryColour,
                  color: "#fff",
                  "&:hover": { bgcolor: alpha(secondaryColour, 0.9) }
                }}
              >
                {reviewSubmitting ? <CircularProgress size={20} /> : "Submit Review"}
              </Button>
            </DialogActions>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );

  // Enhanced card layout
  const renderBookingCard = (booking, index) => {
    const canReview = booking.status === "completed" && !reviewedBookings.includes(booking.id);
    return (
      <Grid item xs={12} md={6} key={booking.id}>
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "stretch",
              borderRadius: 4,
              boxShadow: "0 10px 28px rgba(57,0,153,0.1)",
              mb: 3,
              overflow: "hidden",
              position: "relative",
              bgcolor: "#fff",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: `0 14px 34px ${alpha(darkBlueColor, 0.15)}`,
              },
            }}
            aria-label={`Booking for ${booking.car.name}`}
          >
            {booking.status === "cancelled" && (
              <Box sx={{
                position: "absolute",
                top: 20,
                left: -35,
                background: accentRedColor,
                color: "#fff",
                padding: "4px 40px",
                transform: "rotate(-45deg)",
                zIndex: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                fontSize: "0.75rem",
                fontWeight: 600
              }}>CANCELLED</Box>
            )}
            
            {/* Upcoming pickup notification */}
            {booking.requiresAction && (
              <Box
                sx={{
                  position: "absolute",
                  top: { xs: 10, sm: 10 },
                  right: { xs: 10, sm: 10 },
                  zIndex: 5,
                  animation: "pulse 1.5s infinite",
                  "@keyframes pulse": {
                    "0%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.05)" },
                    "100%": { transform: "scale(1)" }
                  },
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'rgba(255, 214, 51, 0.95)',
                    color: darkBlueColor,
                    px: 1.5,
                    py: 0.7,
                    borderRadius: 6,
                    border: `1px solid ${primaryColour}`,
                    boxShadow: `0 2px 12px ${alpha(primaryColour, 0.5)}`,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: darkBlueColor,
                      color: '#fff',
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.75rem',
                      mr: 1
                    }}
                  >
                    !
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.75rem',
                    }}
                  >
                    UPCOMING PICKUP
                  </Typography>
                </Paper>
              </Box>
            )}

            <Box sx={{ 
              width: { xs: "100%", sm: 240 }, 
              flexShrink: 0, 
              position: "relative",
              overflow: "hidden" 
            }}>
              <CardMedia
                component="img"
                image={booking.car.image}
                alt={booking.car.name}
                sx={{
                  width: "100%",
                  height: { xs: 200, sm: "100%" },
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                  "&:hover": {
                    transform: "scale(1.05)"
                  }
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  background: alpha(darkBlueColor, 0.8),
                  color: "#fff",
                  fontWeight: 700,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 5
                }}
              >
                {booking.car.year}
              </Typography>
            </Box>
            <CardContent
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: { xs: 2.5, sm: 3 },
                minWidth: 0,
              }}
            >
              <Box>
                <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
                  <Typography 
                    variant="h6" 
                    fontWeight={800} 
                    sx={{ 
                      color: darkBlueColor,
                      letterSpacing: "-0.025em"
                    }}
                  >
                    {booking.car.name}
                  </Typography>
                  <Chip
                    size="small"
                    label={booking.car.type}
                    sx={{
                      ml: 1,
                      bgcolor: alpha(primaryColour, 0.15),
                      color: darkBlueColor,
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      height: 22,
                    }}
                  />
                </Stack>
                
                {/* Pickup and Dropoff Information */}
                <Paper 
                  elevation={0} 
                  sx={{
                    borderRadius: 3,
                    bgcolor: alpha(darkBlueColor, 0.03),
                    p: 2,
                    mb: 2
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <Typography 
                          variant="caption" 
                          fontWeight={600}
                          color="text.secondary"
                          sx={{
                            display: "block",
                            mb: 0.5,
                            textTransform: "uppercase",
                            fontSize: "0.75rem"
                          }}
                        >
                          Pickup
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {booking.pickup.location}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(booking.pickup.date).toLocaleDateString()} • {new Date(booking.pickup.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{position: "relative"}}>
                      {!isMobile && (
                        <ArrowRightAlt sx={{ 
                          position: "absolute", 
                          left: -16, 
                          top: "50%", 
                          transform: "translateY(-50%)",
                          color: alpha(darkBlueColor, 0.6)
                        }} />
                      )}
                      <Box>
                        <Typography 
                          variant="caption" 
                          fontWeight={600}
                          color="text.secondary"
                          sx={{
                            display: "block",
                            mb: 0.5,
                            textTransform: "uppercase",
                            fontSize: "0.75rem"
                          }}
                        >
                          Drop-off
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {booking.dropoff.location}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(booking.dropoff.date).toLocaleDateString()} • {new Date(booking.dropoff.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
                
                <Box sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between", 
                  mb: 1.5
                }}>
                  <Typography variant="body2" fontWeight={700} fontSize="1rem">
                    <Box component="span" sx={{ color: "#666" }}>
                      Total:
                    </Box>
                    <Box component="span" sx={{ color: darkBlueColor, ml: 1 }}>
                      ${booking.price.toLocaleString()}
                    </Box>
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      bgcolor: alpha(primaryColour, 0.2), 
                      px: 1.5, 
                      py: 0.5, 
                      borderRadius: 5,
                      fontWeight: 600,
                      color: darkBlueColor
                    }}
                  >
                    {booking.duration}
                  </Typography>
                </Box>
              </Box>
              
              <Box>
                <Divider sx={{ my: 2, opacity: 0.6 }} />
                <Stack 
                  direction="row" 
                  alignItems="center" 
                  justifyContent="space-between" 
                  spacing={2} 
                  mb={2}
                >
                  <Chip
                    icon={statusIcons[booking.status]}
                    label={booking.status}
                    color={statusColors[booking.status]}
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      px: 1.5,
                      textTransform: "capitalize",
                      bgcolor: statusColors[booking.status] === "primary" ? primaryColour : undefined,
                      color: statusColors[booking.status] === "primary" ? darkBlueColor : undefined,
                      "& .MuiChip-icon": { fontSize: "1.2rem" }
                    }}
                    aria-label={`Status: ${booking.status}`}
                  />
                </Stack>
                {/* Action Buttons */}
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="outlined"
                    startIcon={<Receipt />}
                    onClick={() => handleOpenInvoice(booking)}
                    sx={{
                      borderRadius: 2,
                      borderColor: alpha(darkBlueColor, 0.5),
                      color: darkBlueColor,
                      fontWeight: 600,
                      textTransform: "none",
                      px: 2,
                      "&:hover": { 
                        bgcolor: alpha(darkBlueColor, 0.04), 
                        borderColor: darkBlueColor 
                      },
                    }}
                    aria-label="View Invoice"
                  >
                    View Invoice
                  </Button>
                  {booking.status === "upcoming" && (
                    <Button
                      variant="contained"
                      startIcon={<Edit />}
                      sx={{
                        borderRadius: 2,
                        bgcolor: primaryColour,
                        color: darkBlueColor,
                        fontWeight: 600,
                        textTransform: "none",
                        px: 2,
                        boxShadow: `0 4px 14px ${alpha(primaryColour, 0.4)}`,
                        "&:hover": { 
                          bgcolor: alpha(primaryColour, 0.9),
                          boxShadow: `0 6px 20px ${alpha(primaryColour, 0.5)}`,
                        },
                      }}
                      aria-label="Modify Booking"
                    >
                      Modify Booking
                    </Button>
                  )}
                  {(booking.status === "upcoming" || booking.status === "active") && (
                    <Button
                      variant="outlined" 
                      color="error"
                      disabled={actionLoading}
                      onClick={() => handleCancelBooking(booking.id)}
                      sx={{
                        borderRadius: 2,
                        fontWeight: 600,
                        textTransform: "none",
                        px: 2,
                      }}
                    >
                      {actionLoading ? <CircularProgress size={20} /> : 'Cancel'}
                    </Button>
                  )}
                  {canReview && (
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<StarIcon />}
                      onClick={() => handleOpenReview(booking)}
                      sx={{
                        borderRadius: 2,
                        fontWeight: 600,
                        textTransform: "none",
                        px: 2,
                        bgcolor: secondaryColour,
                        color: "#fff"
                      }}
                    >
                      Leave a Review
                    </Button>
                  )}
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Grid>
    );
  };

  return (
    <>
      <Header />
      <Box 
        sx={{ 
          background: `linear-gradient(to bottom, ${alpha(darkBlueColor, 0.03)}, ${alpha(darkBlueColor, 0.07)})`, 
          minHeight: "100vh", 
          py: { xs: 5, md: 8 },
          pt: { xs: 12, md: 16 },
          mt: { xs: 0, md: 0 }
        }}
      >
        <Container maxWidth="lg">
          {/* Page Title Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                color: darkBlueColor,
                mb: 1,
                letterSpacing: "-0.02em",
                textAlign: "center",
              }}
            >
              My Rentals
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: "#555",
                mb: 5,
                textAlign: "center",
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.5,
              }}
            >
              View and manage your luxury car rental experience
            </Typography>
          </motion.div>
          
          {/* Tabs */}
          <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
            <Paper
              elevation={2}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                p: 0.5,
              }}
            >
              <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                aria-label="Booking history tabs"
                textColor="primary"
                indicatorColor="primary"
                sx={{
                  minWidth: { xs: 320, sm: 400 },
                  "& .MuiTabs-indicator": {
                    height: 3,
                    borderRadius: 1.5,
                    bgcolor: primaryColour,
                  }
                }}
              >
                {tabLabels.map((label, idx) => (
                  <Tab
                    key={label}
                    label={label}
                    id={`tab-${idx}`}
                    aria-controls={`tabpanel-${idx}`}
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      color: tab === idx ? darkBlueColor : "#777",
                      px: { xs: 1, sm: 3 },
                      py: 1.5,
                      transition: "all 0.2s",
                      "&.Mui-selected": {
                        color: darkBlueColor,
                      },
                    }}
                  />
                ))}
              </Tabs>
            </Paper>
          </Box>
          
          {/* Loading State */}
          {loading ? (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 300,
              py: 8
            }}>
              <CircularProgress sx={{ color: primaryColour, mb: 3 }} />
              <Typography variant="h6" fontWeight={500} color="text.secondary">
                Loading your bookings...
              </Typography>
            </Box>
          ) : error ? (
            <Alert 
              severity="error" 
              icon={<ErrorOutline />}
              sx={{ 
                mb: 4, 
                borderRadius: 3,
                boxShadow: `0 4px 12px ${alpha('#000', 0.05)}`
              }}
              action={
                <Button color="inherit" onClick={fetchBookings}>
                  Retry
                </Button>
              }
            >
              <Typography fontWeight={600}>{error}</Typography>
            </Alert>
          ) : (
            <>
              {/* Filters */}
              <Paper 
                elevation={0}
                sx={{
                  borderRadius: 3,
                  bgcolor: alpha("#fff", 0.6),
                  backdropFilter: "blur(10px)",
                  p: 2,
                  mb: 4,
                  border: `1px solid ${alpha(darkBlueColor, 0.1)}`,
                }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  alignItems={{ xs: "stretch", sm: "center" }}
                  justifyContent="space-between"
                >
                  <Typography variant="subtitle2" fontWeight={600} color="text.secondary">
                    {filterBookings(tabStatuses[tab]).length} {tabStatuses[tab].toLowerCase()} {filterBookings(tabStatuses[tab]).length === 1 ? 'rental' : 'rentals'} found
                  </Typography>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <FormControl 
                      size="small" 
                      sx={{ 
                        minWidth: 140,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          borderColor: alpha(darkBlueColor, 0.2),
                        },
                        "& .MuiInputLabel-root": {
                          color: alpha(darkBlueColor, 0.7),
                        }
                      }}
                    >
                      <InputLabel>Car Type</InputLabel>
                      <Select
                        value={filterType}
                        label="Car Type"
                        onChange={(e) => setFilterType(e.target.value)}
                        aria-label="Filter by car type"
                      >
                        {carTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl 
                      size="small" 
                      sx={{ 
                        minWidth: 140,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          borderColor: alpha(darkBlueColor, 0.2),
                        },
                        "& .MuiInputLabel-root": {
                          color: alpha(darkBlueColor, 0.7),
                        }
                      }}
                    >
                      <InputLabel>Sort By</InputLabel>
                      <Select
                        value={sortBy}
                        label="Sort By"
                        onChange={(e) => setSortBy(e.target.value)}
                        aria-label="Sort by"
                      >
                        <MenuItem value="date-desc">Newest First</MenuItem>
                        <MenuItem value="date-asc">Oldest First</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Stack>
              </Paper>
              
              {/* Booking Cards */}
              <Box
                role="tabpanel"
                id={`tabpanel-${tab}`}
                aria-labelledby={`tab-${tab}`}
                sx={{ width: "100%", minHeight: 200 }}
              >
                <Grid container spacing={3}>
                  {filterBookings(tabStatuses[tab]).length === 0 ? (
                    <Grid item xs={12}>
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: alpha("#fff", 0.8),
                          borderRadius: 4,
                          p: 6,
                          textAlign: "center",
                          boxShadow: "0 2px 8px rgba(57,0,153,0.05)",
                          border: `1px dashed ${alpha(darkBlueColor, 0.2)}`,
                        }}
                      >
                        <DirectionsCar sx={{ fontSize: 64, color: alpha(darkBlueColor, 0.2), mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" fontWeight={500}>
                          No rentals found in this category
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Try changing your filters or check another tab
                        </Typography>
                      </Paper>
                    </Grid>
                  ) : (
                    filterBookings(tabStatuses[tab]).map((booking, index) => 
                      renderBookingCard(booking, index)
                    )
                  )}
                </Grid>
              </Box>
            </>
          )}
        </Container>
      </Box>
      <Footer />
      
      {/* Invoice Modal */}
      <InvoiceModal />
      {/* Review Modal */}
      <ReviewModal />
    </>
  );
}

export default BookingHistory;
