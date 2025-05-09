import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  InputAdornment, 
  IconButton,
  Card,
  CardContent,
  Link,
  Divider,
  Stack,
  FormControlLabel,
  Checkbox,
  Grid,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Visibility, 
  VisibilityOff,
  Facebook as FacebookIcon,
  Google as GoogleIcon 
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });
  const [formErrors, setFormErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'termsAccepted' ? checked : value
    }));

    // Clear field-specific error when user starts typing again
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }
    
    if (!formData.termsAccepted) {
      errors.termsAccepted = 'You must accept the terms and conditions';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      
      setSnackbar({
        open: true,
        message: 'Account created successfully!',
        severity: 'success'
      });
      
      // Give a moment to see the success message
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.msg || 'Registration failed. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        py: 8,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4)',
          zIndex: -1
        }
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Box 
              component={RouterLink}
              to="/"
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mb: 5,
                textDecoration: 'none'
              }}
            >
              <Typography 
                variant="h3" 
                component="div"
                sx={{ 
                  fontWeight: 800, 
                  letterSpacing: 1,
                  color: 'primary.main',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
                }}
              >
                LEGENDARY MOTORSPORTS
              </Typography>
            </Box>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card 
              sx={{ 
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(4, 4, 48, 0.9)',
                borderRadius: 2,
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                overflow: 'visible'
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography 
                  variant="h4" 
                  component="h1" 
                  gutterBottom 
                  align="center"
                  sx={{ 
                    mb: 4,
                    color: 'white',
                    fontWeight: 700
                  }}
                >
                  Create Your Account
                </Typography>

                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={!!formErrors.firstName}
                        helperText={formErrors.firstName}
                        disabled={loading}
                        sx={{
                          '& .MuiInputLabel-root': { color: 'gray' },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                            '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.4)' },
                            '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                          },
                          '& input': { color: 'white' },
                          '& .MuiFormHelperText-root': {
                            color: 'error.main'
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={!!formErrors.lastName}
                        helperText={formErrors.lastName}
                        disabled={loading}
                        sx={{
                          '& .MuiInputLabel-root': { color: 'gray' },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                            '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.4)' },
                            '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                          },
                          '& input': { color: 'white' },
                          '& .MuiFormHelperText-root': {
                            color: 'error.main'
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                  
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    disabled={loading}
                    sx={{
                      mt: 2,
                      mb: 2,
                      '& .MuiInputLabel-root': { color: 'gray' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.4)' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                      },
                      '& input': { color: 'white' },
                      '& .MuiFormHelperText-root': {
                        color: 'error.main'
                      }
                    }}
                  />
                  
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                    disabled={loading}
                    sx={{
                      mb: 2,
                      '& .MuiInputLabel-root': { color: 'gray' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.4)' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                      },
                      '& input': { color: 'white' },
                      '& .MuiFormHelperText-root': {
                        color: 'error.main'
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: 'gray' }}
                            disabled={loading}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!formErrors.confirmPassword}
                    helperText={formErrors.confirmPassword}
                    disabled={loading}
                    sx={{
                      mb: 2,
                      '& .MuiInputLabel-root': { color: 'gray' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.4)' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                      },
                      '& input': { color: 'white' },
                      '& .MuiFormHelperText-root': {
                        color: 'error.main'
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                            sx={{ color: 'gray' }}
                            disabled={loading}
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox 
                        name="termsAccepted" 
                        color="primary"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                        disabled={loading}
                        sx={{
                          color: 'gray',
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                        }}
                      />
                    }
                    label={
                      <Box sx={{ color: 'white' }}>
                        <Typography variant="body2" display="inline">
                          I agree to the {' '}
                        </Typography>
                        <Link 
                          component={RouterLink} 
                          to="/terms"
                          variant="body2"
                          sx={{ 
                            color: 'primary.main',
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' }
                          }}
                        >
                          Terms of Service
                        </Link>
                        <Typography variant="body2" display="inline">
                          {' '} and {' '}
                        </Typography>
                        <Link 
                          component={RouterLink} 
                          to="/privacy"
                          variant="body2"
                          sx={{ 
                            color: 'primary.main',
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' }
                          }}
                        >
                          Privacy Policy
                        </Link>
                      </Box>
                    }
                    sx={{ mb: 3, mt: 1 }}
                  />
                  {formErrors.termsAccepted && (
                    <Typography variant="caption" color="error" sx={{ ml: 2, mt: -2, display: 'block' }}>
                      {formErrors.termsAccepted}
                    </Typography>
                  )}
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={loading}
                    sx={{ 
                      py: 1.5,
                      mb: 3,
                      fontWeight: 600,
                      boxShadow: '0 4px 14px 0 rgba(255, 189, 0, 0.39)'
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Create Account'
                    )}
                  </Button>

                  <Divider sx={{ 
                    my: 3, 
                    color: 'gray', 
                    '&::before, &::after': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    } 
                  }}>
                    <Typography variant="body2" sx={{ px: 1, color: 'gray' }}>
                      OR SIGN UP WITH
                    </Typography>
                  </Divider>

                  <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<GoogleIcon />}
                      disabled={loading}
                      sx={{ 
                        py: 1.2, 
                        color: 'white',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        '&:hover': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)'
                        }
                      }}
                    >
                      Google
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<FacebookIcon />}
                      disabled={loading}
                      sx={{ 
                        py: 1.2, 
                        color: 'white',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        '&:hover': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)'
                        }
                      }}
                    >
                      Facebook
                    </Button>
                  </Stack>

                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: 'white', display: 'inline' }}>
                      Already have an account?{' '}
                    </Typography>
                    <Link 
                      component={RouterLink} 
                      to="/login"
                      variant="body2"
                      sx={{ 
                        color: 'primary.main',
                        textDecoration: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      Sign In
                    </Link>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                &copy; {new Date().getFullYear()} Legendary Motorsports. All rights reserved.
              </Typography>
            </Box>
          </motion.div>
        </motion.div>
      </Container>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Signup;