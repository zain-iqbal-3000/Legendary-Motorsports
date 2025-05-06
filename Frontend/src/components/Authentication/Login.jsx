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
  Checkbox,
  FormControlLabel,
  Divider,
  Stack,
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

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
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
      [name]: name === 'rememberMe' ? checked : value
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
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await login(formData.email, formData.password);
      setSnackbar({
        open: true,
        message: 'Login successful!',
        severity: 'success'
      });
      
      // Give a moment to see the success message
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.msg || 'Login failed. Please try again.',
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
        minHeight: '100vh',
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
          backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
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
                  Welcome Back
                </Typography>

                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate>
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
                      mb: 3,
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
                    autoComplete="current-password"
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

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          name="rememberMe" 
                          color="primary"
                          checked={formData.rememberMe}
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
                      label={<Typography variant="body2" sx={{ color: 'white' }}>Remember me</Typography>}
                    />
                    <Link 
                      component={RouterLink} 
                      to="/forgot-password"
                      variant="body2"
                      sx={{ 
                        color: 'primary.main',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      Forgot password?
                    </Link>
                  </Box>
                  
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
                      'Sign In'
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
                      OR CONTINUE WITH
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
                      Don't have an account?{' '}
                    </Typography>
                    <Link 
                      component={RouterLink} 
                      to="/signup"
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
                      Sign Up
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

export default Login;