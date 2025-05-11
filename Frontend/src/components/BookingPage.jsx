import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  CircularProgress,
  Alert,
  Divider,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Chip,
  FormControlLabel,
  Checkbox,
  useTheme,
  alpha,
  StepConnector,
} from "@mui/material";
import {
  EventAvailable,
  LocationOn,
  Payment,
  CheckCircle,
  DirectionsCar,
  ArrowBack,
  ArrowForward,
  Check,
  Speed,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

// Dark theme colors
const darkBg = "#111517"; // Light black background
const accentPrimary = "#3498db"; // Main blue accent
const accentSecondary = "#f1c40f"; // Yellow accent
const darkPanel = "rgba(25, 28, 32, 0.85)";
const cardBg = "rgba(21, 24, 28, 0.95)";
const gold = "#F9A825";
const textPrimary = "#ffffff";
const textSecondary = "#a0a9b6";
const border = `1px solid ${accentPrimary}33`;

// Clean subtle effects
const glowEffect = `0 0 15px ${accentPrimary}40`;
const subtleShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';

// Define steps for the booking process
const steps = ["Select Dates & Location", "Personal Details", "Payment", "Confirmation"];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

// Mock payment methods - in a real app, these would come from the user's profile
const paymentMethods = [
  { id: 1, cardNumber: "**** **** **** 1234", cardType: "Visa", expiryDate: "09/25" },
  { id: 2, cardNumber: "**** **** **** 5678", cardType: "Mastercard", expiryDate: "12/24" },
];

// Locations available for pickup and dropoff
const locations = [
  "Dubai Downtown",
  "Dubai Marina",
  "Dubai International Airport (DXB)",
  "Palm Jumeirah",
  "Abu Dhabi",
  "Sharjah",
];

const BookingPage = () => {
  const navigate = useNavigate();
  const { carId } = useParams();
  
  // State variables
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [car, setCar] = useState(null);
  const [bookingReference, setBookingReference] = useState(null);
  const [bookingData, setBookingData] = useState({
    startDate: null,
    endDate: null,
    pickupTime: null,
    dropoffTime: null,
    pickupLocation: "",
    dropoffLocation: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    agreeToTerms: false,
    paymentMethod: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  // Fetch car data when component mounts
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        setLoading(true);
        
        if (!carId) {
          setError("No car selected. Please choose a car from our inventory.");
          setLoading(false);
          return;
        }

        // Real API call to get specific car details from backend
        const response = await axios.get(`/api/cars/${carId}`);
        setCar(response.data);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching car data:", error);
        setError("Failed to load car details. Please try again.");
        setLoading(false);
      }
    };

    fetchCarData();
  }, [carId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    // Clear validation error when field is updated
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Handle date and time picker changes
  const handleDateTimeChange = (name, value) => {
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear validation error when field is updated
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Calculate booking duration and price
  const calculateBookingDetails = () => {
    if (!bookingData.startDate || !bookingData.endDate || !car) {
      return { days: 0, totalPrice: 0 };
    }

    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);
    const diffTime = Math.abs(end - start);
    let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    days = Math.max(days, 1); // Minimum 1 day rental
    
    let totalPrice;
    if (days >= 30) {
      totalPrice = Math.floor(days / 30) * car.availability.rentalPrice.monthly;
      const remainingDays = days % 30;
      if (remainingDays >= 7) {
        totalPrice += Math.floor(remainingDays / 7) * car.availability.rentalPrice.weekly;
        totalPrice += (remainingDays % 7) * car.availability.rentalPrice.daily;
      } else {
        totalPrice += remainingDays * car.availability.rentalPrice.daily;
      }
    } else if (days >= 7) {
      totalPrice = Math.floor(days / 7) * car.availability.rentalPrice.weekly;
      totalPrice += (days % 7) * car.availability.rentalPrice.daily;
    } else {
      totalPrice = days * car.availability.rentalPrice.daily;
    }

    return { days, totalPrice };
  };

  // Validation for each step
  const validateStep = () => {
    const errors = {};

    switch (activeStep) {
      case 0: // Dates & Location
        if (!bookingData.startDate) errors.startDate = "Please select a pickup date";
        if (!bookingData.endDate) errors.endDate = "Please select a return date";
        if (!bookingData.pickupTime) errors.pickupTime = "Please select a pickup time";
        if (!bookingData.dropoffTime) errors.dropoffTime = "Please select a return time";
        if (!bookingData.pickupLocation) errors.pickupLocation = "Please select a pickup location";
        if (!bookingData.dropoffLocation) errors.dropoffLocation = "Please select a return location";
        
        if (bookingData.startDate && bookingData.endDate) {
          const start = new Date(bookingData.startDate);
          const end = new Date(bookingData.endDate);
          if (start > end) {
            errors.endDate = "Return date cannot be before pickup date";
          }
          
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (start < today) {
            errors.startDate = "Pickup date cannot be in the past";
          }
        }
        break;

      case 1: // Personal Details
        if (!bookingData.firstName.trim()) errors.firstName = "First name is required";
        if (!bookingData.lastName.trim()) errors.lastName = "Last name is required";
        if (!bookingData.email.trim()) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(bookingData.email)) 
          errors.email = "Please enter a valid email address";
        if (!bookingData.phone.trim()) errors.phone = "Phone number is required";
        else if (!/^\+?[0-9]{8,15}$/.test(bookingData.phone.replace(/[\s()-]/g, ""))) 
          errors.phone = "Please enter a valid phone number";
        break;

      case 2: // Payment
        if (!bookingData.paymentMethod) errors.paymentMethod = "Please select a payment method";
        if (!bookingData.agreeToTerms) errors.agreeToTerms = "You must agree to the terms and conditions";
        break;

      default:
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle next step button click
  const handleNext = () => {
    if (validateStep()) {
      if (activeStep === steps.length - 2) {
        handleSubmit();
      } else {
        setActiveStep((prevStep) => prevStep + 1);
        window.scrollTo(0, 0);
      }
    }
  };

  // Handle back button click
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    window.scrollTo(0, 0);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError(null);

      const { days, totalPrice } = calculateBookingDetails();
      
      // Format dates properly for the API
      const formattedStartDate = new Date(bookingData.startDate);
      const formattedEndDate = new Date(bookingData.endDate);
      
      if (bookingData.pickupTime) {
        const pickupTime = new Date(bookingData.pickupTime);
        formattedStartDate.setHours(pickupTime.getHours(), pickupTime.getMinutes());
      }
      
      if (bookingData.dropoffTime) {
        const dropoffTime = new Date(bookingData.dropoffTime);
        formattedEndDate.setHours(dropoffTime.getHours(), dropoffTime.getMinutes());
      }

      // Get the logged in user ID from localStorage or context
      // This is just a placeholder - replace with your actual authentication method
      const userId = localStorage.getItem('userId') || '65ba180399252b8aed855c3b';
      
      // Real API call to create the booking
      const response = await axios.post("/api/bookings", {
        user: userId,
        car: car._id || carId,
        startDate: formattedStartDate.toISOString(),
        endDate: formattedEndDate.toISOString(),
        pickupLocation: bookingData.pickupLocation,
        dropoffLocation: bookingData.dropoffLocation,
        specialRequests: bookingData.specialRequests,
        totalAmount: totalPrice,
        paymentDetails: {
          method: "CREDIT_CARD",
          cardLast4: paymentMethods.find(m => m.id === bookingData.paymentMethod)?.cardNumber.slice(-4) || '1234'
        },
      });
      
      // Store booking reference for confirmation page
      const bookingReference = response?.data?.invoiceNumber || `LM-${Math.floor(Math.random() * 10000)}`;
      setBookingReference(bookingReference);
      
      // Move to confirmation step
      setActiveStep((prevStep) => prevStep + 1);
      setSubmitting(false);
      window.scrollTo(0, 0);
      
    } catch (error) {
      console.error("Error submitting booking:", error);
      setError("Failed to process your booking. Please try again.");
      setSubmitting(false);
    }
  };

  // Render content for each step
  const renderStepContent = () => {
    const { days, totalPrice } = calculateBookingDetails();
    
    switch (activeStep) {
      case 0:
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Grid container spacing={4}>
                <Grid size={{xs:12, md:6}}>
                  <motion.div variants={itemVariants}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: textPrimary }}>
                      Pickup Details
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                      <DatePicker
                        label="Pickup Date"
                        value={bookingData.startDate}
                        onChange={(newValue) => handleDateTimeChange("startDate", newValue)}
                        disablePast
                        sx={{ 
                          width: "100%", 
                          mb: 2,
                          '& .MuiInputBase-root': {
                            bgcolor: darkPanel,
                            color: textPrimary,
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: `${accentPrimary}40`,
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: `${accentPrimary}80`,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: accentPrimary,
                            },
                             '& input': {
                            color: textPrimary,
                          },
                          },
                          '& .MuiInputLabel-root': {
                            color: textSecondary,
                          },
                          '& .MuiIconButton-root': {
                            color: accentPrimary,
                          },
                          '& .MuiSvgIcon-root': {
                            color: accentPrimary,
                          },
                        }}
                        slotProps={{
                          textField: {
                            helperText: validationErrors.startDate,
                            error: !!validationErrors.startDate,
                          },
                        }}
                      />
                      <TimePicker
                        label="Pickup Time"
                        value={bookingData.pickupTime}
                        onChange={(newValue) => handleDateTimeChange("pickupTime", newValue)}
                        sx={{ 
                          width: "100%", 
                          mb: 2,
                          '& .MuiInputBase-root': {
                            bgcolor: darkPanel,
                            color: textPrimary,
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: `${accentPrimary}40`,
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: `${accentPrimary}80`,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: accentPrimary,
                            },
                             '& input': {
                            color: textPrimary,
                          },
                          },
                          '& .MuiInputLabel-root': {
                            color: textSecondary,
                          },
                          '& .MuiIconButton-root': {
                            color: accentPrimary,
                          },
                          '& .MuiSvgIcon-root': {
                            color: accentPrimary,
                          },
                        }}
                        slotProps={{
                          textField: {
                            helperText: validationErrors.pickupTime,
                            error: !!validationErrors.pickupTime,
                          },
                        }}
                      />
                      <FormControl 
                        fullWidth 
                        error={!!validationErrors.pickupLocation} 
                        sx={{ 
                          '& .MuiInputBase-root': {
                            bgcolor: darkPanel,
                            color: textPrimary,
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: `${accentPrimary}40`,
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: `${accentPrimary}80`,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: accentPrimary,
                            },
                             '& input': {
                            color: textPrimary,
                          },
                          },
                          '& .MuiInputLabel-root': {
                            color: textSecondary,
                          },
                          '& .MuiSvgIcon-root': {
                            color: accentPrimary,
                          },
                          '& .MuiFormHelperText-root': {
                            color: 'error.main',
                          },
                        }}
                      >
                        <InputLabel>Pickup Location</InputLabel>
                        <Select
                          value={bookingData.pickupLocation}
                          label="Pickup Location"
                          name="pickupLocation"
                          onChange={handleChange}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                bgcolor: darkPanel,
                                color: textPrimary,
                                '& .MuiMenuItem-root': {
                                  color: textPrimary,
                                  '&:hover': {
                                    bgcolor: `${accentPrimary}20`,
                                  },
                                  '&.Mui-selected': {
                                    bgcolor: `${accentPrimary}40`,
                                    color: textPrimary,
                                    '&:hover': {
                                      bgcolor: `${accentPrimary}50`,
                                    },
                                  },
                                },
                              },
                            },
                          }}
                        >
                          {locations.map((location) => (
                            <MenuItem key={location} value={location}>
                              {location}
                            </MenuItem>
                          ))}
                        </Select>
                        {validationErrors.pickupLocation && (
                          <FormHelperText>{validationErrors.pickupLocation}</FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                  </motion.div>
                </Grid>
                <Grid size={{xs:12, md:6}}>
                  <motion.div variants={itemVariants}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: textPrimary }}>
                      Drop-off Details
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                      <DatePicker
                        label="Return Date"
                        value={bookingData.endDate}
                        onChange={(newValue) => handleDateTimeChange("endDate", newValue)}
                        disablePast
                        sx={{ 
                          width: "100%", 
                          mb: 2,
                          '& .MuiInputBase-root': {
                            bgcolor: darkPanel,
                            color: textPrimary,
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: `${accentPrimary}40`,
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: `${accentPrimary}80`,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: accentPrimary,
                            },
                             '& input': {
                            color: textPrimary,
                          },
                          },
                          '& .MuiInputLabel-root': {
                            color: textSecondary,
                          },
                          '& .MuiIconButton-root': {
                            color: accentPrimary,
                          },
                          '& .MuiSvgIcon-root': {
                            color: accentPrimary,
                          },
                        }}
                        slotProps={{
                          textField: {
                            helperText: validationErrors.endDate,
                            error: !!validationErrors.endDate,
                          },
                        }}
                      />
                      <TimePicker
                        label="Return Time"
                        value={bookingData.dropoffTime}
                        onChange={(newValue) => handleDateTimeChange("dropoffTime", newValue)}
                        sx={{ 
                          width: "100%", 
                          mb: 2,
                          '& .MuiInputBase-root': {
                            bgcolor: darkPanel,
                            color: textPrimary,
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: `${accentPrimary}40`,
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: `${accentPrimary}80`,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: accentPrimary,
                            },
                             '& input': {
                              color: textPrimary,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: textSecondary,
                          },
                          '& .MuiIconButton-root': {
                            color: accentPrimary,
                          },
                          '& .MuiSvgIcon-root': {
                            color: accentPrimary,
                          },
                        }}
                        slotProps={{
                          textField: {
                            helperText: validationErrors.dropoffTime,
                            error: !!validationErrors.dropoffTime,
                          },
                        }}
                      />
                      <FormControl 
                        fullWidth 
                        error={!!validationErrors.dropoffLocation}
                        sx={{ 
                          '& .MuiInputBase-root': {
                            bgcolor: darkPanel,
                            color: textPrimary,
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: `${accentPrimary}40`,
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: `${accentPrimary}80`,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: accentPrimary,
                            },
                            '& input': {
                              color: textPrimary,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: textSecondary,
                          },
                          '& .MuiSvgIcon-root': {
                            color: accentPrimary,
                          },
                          '& .MuiFormHelperText-root': {
                            color: 'error.main',
                          },
                        }}
                      >
                        <InputLabel>Return Location</InputLabel>
                        <Select
                          value={bookingData.dropoffLocation}
                          label="Return Location"
                          name="dropoffLocation"
                          onChange={handleChange}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                bgcolor: darkPanel,
                                color: textPrimary,
                                '& .MuiMenuItem-root': {
                                  color: textPrimary,
                                  '&:hover': {
                                    bgcolor: `${accentPrimary}20`,
                                  },
                                  '&.Mui-selected': {
                                    bgcolor: `${accentPrimary}40`,
                                    color: textPrimary,
                                    '&:hover': {
                                      bgcolor: `${accentPrimary}50`,
                                    },
                                  },
                                },
                              },
                            },
                          }}
                        >
                          {locations.map((location) => (
                            <MenuItem key={location} value={location}>
                              {location}
                            </MenuItem>
                          ))}
                        </Select>
                        {validationErrors.dropoffLocation && (
                          <FormHelperText>{validationErrors.dropoffLocation}</FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                  </motion.div>
                </Grid>
                <Grid size={{xs:12}}>
                  <motion.div variants={itemVariants}>
                    <TextField
                      fullWidth
                      label="Special Requests"
                      name="specialRequests"
                      value={bookingData.specialRequests}
                      onChange={handleChange}
                      multiline
                      rows={3}
                      placeholder="Any specific requirements or preferences for your rental"
                      sx={{
                        '& .MuiInputBase-root': {
                          bgcolor: darkPanel,
                          color: textPrimary,
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: `${accentPrimary}40`,
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: `${accentPrimary}80`,
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: accentPrimary,
                          },
                          '& input': {
                              color: textPrimary,
                            },
                        },
                        '& .MuiInputLabel-root': {
                          color: textSecondary,
                        },
                      }}
                    />
                  </motion.div>
                </Grid>
              </Grid>
            </motion.div>
          </LocalizationProvider>
        );
      
      case 1:
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={4}>
              <Grid size={{xs:12, md:6}}>
                <motion.div variants={itemVariants}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={bookingData.firstName}
                    onChange={handleChange}
                    error={!!validationErrors.firstName}
                    helperText={validationErrors.firstName}
                    sx={{
                      mb: 3,
                      '& .MuiInputBase-root': {
                        bgcolor: darkPanel,
                        color: textPrimary,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: `${accentPrimary}40`,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: `${accentPrimary}80`,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: accentPrimary,
                        },
                        '& input': {
                              color: textPrimary,
                            },
                      },
                      '& .MuiInputLabel-root': {
                        color: textSecondary,
                      },
                      '& .MuiFormHelperText-root': {
                        color: 'error.main',
                      },
                    }}
                  />
                </motion.div>
              </Grid>
              <Grid size={{xs:12, md:6}}>
                <motion.div variants={itemVariants}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={bookingData.lastName}
                    onChange={handleChange}
                    error={!!validationErrors.lastName}
                    helperText={validationErrors.lastName}
                    sx={{
                      mb: 3,
                      '& .MuiInputBase-root': {
                        bgcolor: darkPanel,
                        color: textPrimary,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: `${accentPrimary}40`,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: `${accentPrimary}80`,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: accentPrimary,
                        },
                        '& input': {
                              color: textPrimary,
                            },
                      },
                      '& .MuiInputLabel-root': {
                        color: textSecondary,
                      },
                      '& .MuiFormHelperText-root': {
                        color: 'error.main',
                      },
                    }}
                  />
                </motion.div>
              </Grid>
              <Grid size={{xs:12, md:6}}>
                <motion.div variants={itemVariants}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={bookingData.email}
                    onChange={handleChange}
                    error={!!validationErrors.email}
                    helperText={validationErrors.email}
                    sx={{
                      mb: 3,
                      '& .MuiInputBase-root': {
                        bgcolor: darkPanel,
                        color: textPrimary,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: `${accentPrimary}40`,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: `${accentPrimary}80`,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: accentPrimary,
                        },
                        '& input': {
                              color: textPrimary,
                            },
                      },
                      '& .MuiInputLabel-root': {
                        color: textSecondary,
                      },
                      '& .MuiFormHelperText-root': {
                        color: 'error.main',
                      },
                    }}
                  />
                </motion.div>
              </Grid>
              <Grid size={{xs:12, md:6}}>
                <motion.div variants={itemVariants}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={bookingData.phone}
                    onChange={handleChange}
                    error={!!validationErrors.phone}
                    helperText={validationErrors.phone}
                    sx={{
                      mb: 3,
                      '& .MuiInputBase-root': {
                        bgcolor: darkPanel,
                        color: textPrimary,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: `${accentPrimary}40`,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: `${accentPrimary}80`,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: accentPrimary,
                        },
                        '& input': {
                              color: textPrimary,
                            },
                      },
                      '& .MuiInputLabel-root': {
                        color: textSecondary,
                      },
                      '& .MuiFormHelperText-root': {
                        color: 'error.main',
                      },
                    }}
                  />
                </motion.div>
              </Grid>
            </Grid>
            <motion.div variants={itemVariants} style={{ marginTop: 24 }}>
              <Alert 
                severity="info" 
                sx={{ 
                  mb: 2, 
                  bgcolor: `${accentPrimary}20`,
                  color: textPrimary,
                  '& .MuiAlert-icon': {
                    color: accentPrimary,
                  },
                }}
              >
                Your personal details are required for verification and to complete the rental agreement. 
                We need to verify your identity and driving license before you can pick up the car.
              </Alert>
            </motion.div>
          </motion.div>
        );
        
      case 2:
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={4}>
              <Grid size={{xs:12}}>
                <motion.div variants={itemVariants}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: textPrimary }}>
                    Select Payment Method
                  </Typography>
                  <FormControl fullWidth error={!!validationErrors.paymentMethod}>
                    <Grid container spacing={2}>
                      {paymentMethods.map((method) => (
                        <Grid size={{xs:12, sm:6}} key={method.id}>
                          <Paper
                            elevation={bookingData.paymentMethod === method.id ? 3 : 1}
                            sx={{
                              p: 2,
                              bgcolor: darkPanel,
                              border: bookingData.paymentMethod === method.id 
                                ? `2px solid ${accentPrimary}`
                                : `1px solid ${accentPrimary}30`,
                              borderRadius: 2,
                              cursor: "pointer",
                              transition: "all 0.2s",
                              "&:hover": {
                                borderColor: accentPrimary,
                                boxShadow: glowEffect,
                              },
                            }}
                            onClick={() => handleChange({ target: { name: "paymentMethod", value: method.id } })}
                          >
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                              <Box>
                                <Typography variant="subtitle1" fontWeight={600} color={textPrimary}>
                                  {method.cardType}
                                </Typography>
                                <Typography variant="body2" color={textSecondary}>
                                  {method.cardNumber}
                                </Typography>
                                <Typography variant="caption" color={textSecondary}>
                                  Expires: {method.expiryDate}
                                </Typography>
                              </Box>
                              {bookingData.paymentMethod === method.id && (
                                <Check sx={{ color: accentPrimary }} />
                              )}
                            </Box>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                    {validationErrors.paymentMethod && (
                      <FormHelperText sx={{ color: 'error.main' }}>
                        {validationErrors.paymentMethod}
                      </FormHelperText>
                    )}
                  </FormControl>
                </motion.div>
              </Grid>
              
              <Grid size={{xs:12}}>
                <motion.div variants={itemVariants}>
                  <Divider sx={{ my: 2, borderColor: `${accentPrimary}30` }} />
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: textPrimary }}>
                      Rental Summary
                    </Typography>
                    <Paper sx={{ 
                      p: 2, 
                      bgcolor: cardBg, 
                      border: `1px solid ${accentPrimary}20`,
                      borderRadius: 2,
                    }}>
                      <Grid container spacing={2}>
                        <Grid size={{xs:12, sm:6}}>
                          <Typography variant="body2" color={textSecondary}>
                            Pickup Date & Time
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 1, color: textPrimary }}>
                            {bookingData.startDate && bookingData.pickupTime
                              ? `${bookingData.startDate.toLocaleDateString()} at ${new Date(bookingData.pickupTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
                              : "Not specified"}
                          </Typography>
                          <Typography variant="body2" color={textSecondary}>
                            Pickup Location
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 1, color: textPrimary }}>
                            {bookingData.pickupLocation || "Not specified"}
                          </Typography>
                          <Typography variant="body2" color={textSecondary}>
                            Duration
                          </Typography>
                          <Typography variant="body1" sx={{ color: textPrimary }}>
                            {days} {days === 1 ? "day" : "days"}
                          </Typography>
                        </Grid>
                        <Grid size={{xs:12, sm:6}}>
                          <Typography variant="body2" color={textSecondary}>
                            Return Date & Time
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 1, color: textPrimary }}>
                            {bookingData.endDate && bookingData.dropoffTime
                              ? `${bookingData.endDate.toLocaleDateString()} at ${new Date(bookingData.dropoffTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
                              : "Not specified"}
                          </Typography>
                          <Typography variant="body2" color={textSecondary}>
                            Return Location
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 1, color: textPrimary }}>
                            {bookingData.dropoffLocation || "Not specified"}
                          </Typography>
                          <Typography variant="body2" color={textSecondary} fontWeight={700}>
                            Total Price
                          </Typography>
                          <Typography variant="body1" fontWeight={700} color={accentSecondary}>
                            ${totalPrice.toLocaleString()}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Box>
                </motion.div>
              </Grid>
              
              <Grid size={{xs:12}}>
                <motion.div variants={itemVariants}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={bookingData.agreeToTerms}
                        onChange={handleChange}
                        name="agreeToTerms"
                        sx={{
                          color: textSecondary,
                          '&.Mui-checked': {
                            color: accentPrimary,
                          },
                        }}
                      />
                    }
                    label="I agree to the terms and conditions, including the cancellation policy and insurance requirements."
                    sx={{ color: textPrimary }}
                  />
                  {validationErrors.agreeToTerms && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {validationErrors.agreeToTerms}
                    </FormHelperText>
                  )}
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        );
        
      case 3:
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Box sx={{ textAlign: "center", py: 4 }}>
              <motion.div variants={itemVariants}>
                <CheckCircle sx={{ fontSize: 80, color: accentSecondary, mb: 3 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: textPrimary }}>
                  Booking Confirmed!
                </Typography>
                <Typography variant="h6" sx={{ color: accentSecondary, mb: 4 }}>
                  Your booking reference: <b>{bookingReference}</b>
                </Typography>
                <Paper
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    maxWidth: 600, 
                    mx: "auto", 
                    bgcolor: cardBg,
                    border: `1px solid ${accentPrimary}30`,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body1" sx={{ mb: 2, textAlign: "left", color: textPrimary }}>
                    We've sent a confirmation email to <b>{bookingData.email}</b> with all booking details. 
                    You'll receive a reminder 24 hours before your pickup.
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: "left", color: textPrimary }}>
                    If you have any questions or need to make changes to your booking, please contact our customer service team.
                  </Typography>
                </Paper>
              </motion.div>
              <motion.div variants={itemVariants} style={{ marginTop: 32 }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  onClick={() => navigate('/booking-history')}
                  sx={{ 
                    mt: 3, 
                    px: 4,
                    bgcolor: accentPrimary,
                    color: "#fff",
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: accentSecondary,
                    }
                  }}
                >
                  View My Bookings
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <Box sx={{ 
          minHeight: "80vh", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          bgcolor: darkBg,
        }}>
          <CircularProgress size={60} sx={{ color: accentPrimary }} />
        </Box>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <Box sx={{ 
          py: 8, 
          minHeight: "60vh",
          bgcolor: darkBg,
        }}>
          <Container>
            <Alert 
              severity="error" 
              sx={{ 
                mb: 4,
                bgcolor: 'rgba(211, 47, 47, 0.15)',
                color: '#ff8a80',
                '& .MuiAlert-icon': {
                  color: '#ff8a80',
                }
              }}
            >
              {error}
            </Alert>
            <Button 
              variant="outlined" 
              onClick={() => navigate(-1)}
              startIcon={<ArrowBack />}
              sx={{
                color: accentPrimary,
                borderColor: accentPrimary,
                '&:hover': {
                  borderColor: accentSecondary,
                  color: accentSecondary,
                  bgcolor: `${accentSecondary}10`,
                }
              }}
            >
              Go Back
            </Button>
          </Container>
        </Box>
        <Footer />
      </>
    );
  }

  const { days, totalPrice } = calculateBookingDetails();

  return (
    <>
      <Header />
      <Box 
        sx={{ 
          py: { xs: 4, md: 6 }, 
          pt: { xs: 10, md: 12 },
          bgcolor: darkBg,
          minHeight: "100vh",
          background: `linear-gradient(180deg, ${darkBg} 0%, rgba(10, 12, 14, 1) 100%)`,
          position: 'relative',
        }}
      >
        {/* Subtle grid overlay */}
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
            opacity: 0.4
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{
              color: textPrimary,
              mb: 1,
              textAlign: "center",
            }}
          >
            Book Your Hypercar Experience
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: textSecondary,
              mb: 5,
              textAlign: "center",
              maxWidth: 700,
              mx: "auto",
            }}
          >
            Complete your reservation in just a few easy steps
          </Typography>

          {/* Car Summary */}
          {car && (
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 3,
                bgcolor: cardBg,
                border: border,
                boxShadow: subtleShadow,
              }}
            >
              <Grid container spacing={3} alignItems="center">
                <Grid size={{xs:12, sm:4, md:6}}>
                  <CardMedia
                    component="img"
                    image={car.images?.[0] || "https://via.placeholder.com/300"}
                    alt={`${car.make || 'Car'} ${car.model || ''}`}
                    sx={{ 
                      borderRadius: 2, 
                      height: 140, 
                      objectFit: "cover",
                      border: `1px solid ${accentPrimary}20`,
                    }}
                  />
                </Grid>
                <Grid size={{xs:12,sm:8, md:6}}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: textPrimary }}>
                    {car.make} {car.model}
                  </Typography>
                  <Typography variant="body2" color={textSecondary}>
                    {car.year}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Chip
                      size="small"
                      label={`${car.specifications?.engine?.horsepower || 'N/A'} HP`}
                      sx={{ bgcolor: `${accentPrimary}20`, color: accentPrimary }}
                    />
                    <Chip
                      size="small"
                      label={`${car.specifications?.performance?.topSpeed || 'N/A'} km/h`}
                      sx={{ bgcolor: `${accentSecondary}20`, color: accentSecondary }}
                    />
                    <Chip
                      size="small"
                      label={`0-100: ${car.specifications?.performance?.zeroToSixty || 'N/A'}s`}
                      sx={{ bgcolor: `${accentPrimary}20`, color: accentPrimary }}
                    />
                  </Stack>
                </Grid>
                <Grid size={{xs:12, md:3}}>
                  <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
                    <Typography variant="body2" color={textSecondary}>
                      Starting from
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: accentPrimary }}>
                      ${car.availability?.rentalPrice?.daily?.toLocaleString() || 'N/A'}/day
                    </Typography>
                    {days > 0 && (
                      <Typography variant="body1" sx={{ fontWeight: 700, color: accentSecondary }}>
                        Total: ${totalPrice.toLocaleString()}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          )}

          {/* Stepper */}
          <Stepper 
            activeStep={activeStep} 
            alternativeLabel 
            sx={{ 
              mb: 5,
              "& .MuiStepIcon-root": {
                color: `${accentPrimary}40`,
                "&.Mui-active": {
                  color: accentPrimary,
                },
                "&.Mui-completed": {
                  color: accentPrimary,
                },
              },
              "& .MuiStepLabel-label": {
                color: textSecondary,
                "&.Mui-active": {
                  color: textPrimary,
                },
                "&.Mui-completed": {
                  color: textSecondary,
                },
              },
            }}
            connector={
              <StepConnector
                sx={{
                  "&.MuiStepConnector-root": {
                    top: 10,
                  },
                  "& .MuiStepConnector-line": {
                    borderColor: `${accentPrimary}40`,
                  },
                  "&.Mui-active": {
                    "& .MuiStepConnector-line": {
                      borderColor: accentPrimary,
                    },
                    '& input': {
                              color: textPrimary,
                            },
                  },
                  "&.Mui-completed": {
                    "& .MuiStepConnector-line": {
                      borderColor: accentPrimary,
                    },
                  },
                }}
              />
            }
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Main Content */}
          <Paper
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              bgcolor: cardBg,
              border: border,
              boxShadow: subtleShadow,
              mb: 4,
            }}
          >
            {renderStepContent()}
          </Paper>

          {/* Navigation Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}>
            <Button
              disabled={activeStep === 0 || activeStep === steps.length - 1}
              onClick={handleBack}
              startIcon={<ArrowBack />}
              sx={{
                visibility: activeStep === 0 || activeStep === steps.length - 1 ? "hidden" : "visible",
                color: accentPrimary,
                borderColor: `${accentPrimary}60`,
                '&:hover': {
                  borderColor: accentPrimary,
                  bgcolor: `${accentPrimary}10`,
                },
                border: `1px solid ${accentPrimary}40`,
                borderRadius: 2,
                px: 3,
              }}
            >
              Back
            </Button>
            {activeStep < steps.length - 1 && (
              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={activeStep === steps.length - 2 ? null : <ArrowForward />}
                disabled={submitting}
                sx={{
                  px: 4,
                  py: 1.2,
                  bgcolor: accentPrimary,
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: 2,
                  boxShadow: glowEffect,
                  "&:hover": {
                    bgcolor: accentSecondary,
                  },
                }}
              >
                {activeStep === steps.length - 2 ? (
                  submitting ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1, color: "#fff" }} />
                      Processing...
                    </>
                  ) : (
                    "Confirm Booking"
                  )
                ) : (
                  "Continue"
                )}
              </Button>
            )}
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default BookingPage;