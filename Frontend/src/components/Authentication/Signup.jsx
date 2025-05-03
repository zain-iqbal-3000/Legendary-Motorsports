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
  Grid
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Visibility, 
  VisibilityOff,
  Facebook as FacebookIcon,
  Google as GoogleIcon 
} from '@mui/icons-material';

const Signup = () => {
  const navigate = useNavigate();
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

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'termsAccepted' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    // Handle signup logic here
    console.log('Signup form submitted:', formData);
    // Redirect user after successful signup
    // navigate('/login');
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
                        sx={{
                          '& .MuiInputLabel-root': { color: 'gray' },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                            '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.4)' },
                            '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                          },
                          '& input': { color: 'white' }
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
                        sx={{
                          '& .MuiInputLabel-root': { color: 'gray' },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                            '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.4)' },
                            '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                          },
                          '& input': { color: 'white' }
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
                    sx={{
                      mt: 2,
                      mb: 2,
                      '& .MuiInputLabel-root': { color: 'gray' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.4)' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                      },
                      '& input': { color: 'white' }
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
                    sx={{
                      mb: 2,
                      '& .MuiInputLabel-root': { color: 'gray' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.4)' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                      },
                      '& input': { color: 'white' }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: 'gray' }}
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
                    sx={{
                      mb: 2,
                      '& .MuiInputLabel-root': { color: 'gray' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.4)' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                      },
                      '& input': { color: 'white' }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                            sx={{ color: 'gray' }}
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
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ 
                      py: 1.5,
                      mb: 3,
                      fontWeight: 600,
                      boxShadow: '0 4px 14px 0 rgba(255, 189, 0, 0.39)'
                    }}
                  >
                    Create Account
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
    </Box>
  );
};

export default Signup;