import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiUser, FiCreditCard, FiFileText, FiClock, FiEdit, FiCheck, FiUpload, FiAlertCircle, FiPlus, FiTrash2 } from 'react-icons/fi';
import { format } from 'date-fns';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Grid,
  TextField,
  Divider,
  CircularProgress,
  Chip,
  Tab,
  Tabs
} from '@mui/material';

const AccountSettings = () => {
  // State for tabs
  const [activeTab, setActiveTab] = useState(0);
  
  // State for personal information
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // State for license information
  const [licenseInfo, setLicenseInfo] = useState({
    frontImage: null,
    backImage: null,
    status: 'NOT_UPLOADED', // NOT_UPLOADED, PENDING, APPROVED, REJECTED
    rejectionReason: '',
  });
  const [frontImagePreview, setFrontImagePreview] = useState(null);
  const [backImagePreview, setBackImagePreview] = useState(null);

  // State for payment methods
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [newCardData, setNewCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  // State for activity history
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: 'all',
    carType: 'all',
  });
  
  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Replace with your actual API call
        const response = await fetch('/api/user/profile');
        const userData = await response.json();
        
        setPersonalInfo({
          fullName: userData.fullName || '',
          email: userData.email || '',
          phone: userData.phone || '',
        });
        
        // Set license info if available
        if (userData.license) {
          setLicenseInfo({
            frontImage: userData.license.frontImage || null,
            backImage: userData.license.backImage || null,
            status: userData.license.status || 'NOT_UPLOADED',
            rejectionReason: userData.license.rejectionReason || '',
          });
          
          // Set preview images if available
          if (userData.license.frontImage) {
            setFrontImagePreview(`/api/documents/${userData.license.frontImage}`);
          }
          if (userData.license.backImage) {
            setBackImagePreview(`/api/documents/${userData.license.backImage}`);
          }
        }

        // Fetch payment methods
        const paymentResponse = await fetch('/api/user/payment-methods');
        const paymentData = await paymentResponse.json();
        setPaymentMethods(paymentData || []);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        toast.error('Failed to load your profile information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Fetch booking history
  useEffect(() => {
    const fetchBookingHistory = async () => {
      setBookingsLoading(true);
      try {
        // Replace with your actual API call
        const url = new URL('/api/bookings/history', window.location.origin);
        
        // Add filters if they're active
        if (filters.dateRange !== 'all') {
          url.searchParams.append('dateRange', filters.dateRange);
        }
        if (filters.carType !== 'all') {
          url.searchParams.append('carType', filters.carType);
        }
        
        const response = await fetch(url);
        const data = await response.json();
        setBookings(data || []);
      } catch (error) {
        console.error('Failed to fetch booking history:', error);
        toast.error('Failed to load your booking history');
      } finally {
        setBookingsLoading(false);
      }
    };
    
    fetchBookingHistory();
  }, [filters]);
  
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const savePersonalInfo = async () => {
    setIsLoading(true);
    try {
      // Replace with your actual API call
      await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(personalInfo),
      });
      
      setIsEditingPersonal(false);
      toast.success('Personal information updated successfully!');
    } catch (error) {
      console.error('Failed to update personal info:', error);
      toast.error('Failed to update your information');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLicenseImageChange = (side) => (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file type
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        toast.error('Only JPG, PNG, and PDF files are accepted');
        return;
      }
      
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should not exceed 5MB');
        return;
      }
      
      // Update state for the specific side
      if (side === 'front') {
        setLicenseInfo(prev => ({ ...prev, frontImage: file }));
        
        // Create preview for image types
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => setFrontImagePreview(e.target.result);
          reader.readAsDataURL(file);
        } else {
          // For PDF, just show a placeholder
          setFrontImagePreview('/images/pdf-placeholder.png');
        }
      } else {
        setLicenseInfo(prev => ({ ...prev, backImage: file }));
        
        // Create preview for image types
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => setBackImagePreview(e.target.result);
          reader.readAsDataURL(file);
        } else {
          // For PDF, just show a placeholder
          setBackImagePreview('/images/pdf-placeholder.png');
        }
      }
    }
  };

  const uploadLicenseImages = async () => {
    if (!licenseInfo.frontImage || !licenseInfo.backImage) {
      toast.error('Please upload both front and back images of your license');
      return;
    }
    
    setIsLoading(true);
    const formData = new FormData();
    formData.append('frontImage', licenseInfo.frontImage);
    formData.append('backImage', licenseInfo.backImage);
    
    try {
      // Replace with your actual API call
      const response = await fetch('/api/user/license', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload license');
      }
      
      setLicenseInfo(prev => ({ ...prev, status: 'PENDING' }));
      toast.success('License uploaded successfully! It will be reviewed shortly.');
    } catch (error) {
      console.error('Failed to upload license:', error);
      toast.error('Failed to upload license');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = () => {
    switch (licenseInfo.status) {
      case 'PENDING':
        return <Chip label="Pending Review" color="warning" />;
      case 'APPROVED':
        return <Chip label="Approved" color="success" />;
      case 'REJECTED':
        return <Chip label="Rejected" color="error" />;
      default:
        return <Chip label="Not Uploaded" color="default" />;
    }
  };

  const handleNewCardChange = (e) => {
    const { name, value } = e.target;
    setNewCardData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addNewCard = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Replace with your actual API call
      const response = await fetch('/api/user/payment-methods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCardData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add payment method');
      }
      
      const addedCard = await response.json();
      setPaymentMethods(prev => [...prev, addedCard]);
      
      // Reset form
      setNewCardData({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
      });
      setShowAddCardForm(false);
      
      toast.success('Payment method added successfully!');
    } catch (error) {
      console.error('Failed to add payment method:', error);
      toast.error('Failed to add payment method');
    } finally {
      setIsLoading(false);
    }
  };

  const removeCard = async (cardId) => {
    if (!window.confirm('Are you sure you want to remove this payment method?')) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Replace with your actual API call
      await fetch(`/api/user/payment-methods/${cardId}`, {
        method: 'DELETE',
      });
      
      setPaymentMethods(prev => prev.filter(card => card.id !== cardId));
      toast.success('Payment method removed successfully!');
    } catch (error) {
      console.error('Failed to remove payment method:', error);
      toast.error('Failed to remove payment method');
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to format the booking duration as a string
  const formatBookingDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return `${days} ${days === 1 ? 'day' : 'days'}`;
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ 
      py: { xs: 8, md: 12 }, 
      background: 'linear-gradient(to right, rgba(57, 0, 153, 1), rgba(33, 33, 33, 0.9))',
      minHeight: '100vh'
    }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            mb: 6, 
            fontWeight: 700, 
            color: 'white',
            '& .highlight': { color: '#ffbd00' }
          }}
        >
          ACCOUNT <span className="highlight">SETTINGS</span>
        </Typography>

        <Box 
          sx={{ 
            width: '100%', 
            bgcolor: 'background.paper',
            mb: 4,
            borderRadius: '8px',
            overflow: 'hidden'
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 600,
                py: 2,
                fontSize: '1rem'
              },
              '& .Mui-selected': {
                color: '#ffbd00',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#ffbd00',
                height: 3
              }
            }}
          >
            <Tab icon={<FiUser />} label="Profile" iconPosition="start" />
            <Tab icon={<FiFileText />} label="Documents" iconPosition="start" />
            <Tab icon={<FiCreditCard />} label="Payment Methods" iconPosition="start" />
            <Tab icon={<FiClock />} label="Activity History" iconPosition="start" />
          </Tabs>
        </Box>

        {/* Personal Information Section */}
        {activeTab === 0 && (
          <Paper 
            elevation={3}
            sx={{
              p: 4,
              bgcolor: 'rgba(33, 33, 33, 0.95)',
              color: 'white',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
                Personal Information
              </Typography>
              {!isEditingPersonal ? (
                <Button
                  onClick={() => setIsEditingPersonal(true)}
                  variant="outlined"
                  startIcon={<FiEdit />}
                  sx={{ 
                    color: '#ffbd00', 
                    borderColor: '#ffbd00',
                    '&:hover': {
                      borderColor: '#ffbd00',
                      bgcolor: 'rgba(255, 189, 0, 0.1)'
                    }
                  }}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  onClick={savePersonalInfo}
                  variant="contained"
                  startIcon={<FiCheck />}
                  disabled={isLoading}
                  sx={{ 
                    bgcolor: '#ffbd00', 
                    color: '#390099',
                    '&:hover': {
                      bgcolor: '#d9a000'
                    },
                    '&.Mui-disabled': {
                      bgcolor: 'rgba(255, 189, 0, 0.4)'
                    }
                  }}
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </Button>
              )}
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                  Full Name
                </Typography>
                {isEditingPersonal ? (
                  <TextField
                    fullWidth
                    name="fullName"
                    value={personalInfo.fullName}
                    onChange={handlePersonalInfoChange}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#ffbd00',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#ffbd00',
                        },
                      },
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                    }}
                  />
                ) : (
                  <Box sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1 }}>
                    <Typography>{personalInfo.fullName || 'Not provided'}</Typography>
                  </Box>
                )}
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                  Email Address
                </Typography>
                <Box sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1 }}>
                  <Typography>{personalInfo.email || 'Not provided'}</Typography>
                </Box>
                <Typography variant="caption" sx={{ mt: 1, display: 'block', color: 'rgba(255, 255, 255, 0.5)' }}>
                  Email cannot be changed
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                  Phone Number
                </Typography>
                {isEditingPersonal ? (
                  <TextField
                    fullWidth
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#ffbd00',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#ffbd00',
                        },
                      },
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                    }}
                  />
                ) : (
                  <Box sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1 }}>
                    <Typography>{personalInfo.phone || 'Not provided'}</Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Driver's License Section */}
        {activeTab === 1 && (
          <Paper 
            elevation={3}
            sx={{
              p: 4,
              bgcolor: 'rgba(33, 33, 33, 0.95)',
              color: 'white',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
                Driver's License
              </Typography>
              {getStatusBadge()}
            </Box>
            
            {licenseInfo.status === 'REJECTED' && (
              <Box sx={{ 
                mb: 4, 
                p: 3, 
                bgcolor: 'rgba(244, 67, 54, 0.1)', 
                borderLeft: '4px solid #f44336',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'flex-start'
              }}>
                <FiAlertCircle style={{ marginRight: 16, marginTop: 4, color: '#f44336' }} />
                <Typography>
                  Your license was rejected: {licenseInfo.rejectionReason}
                </Typography>
              </Box>
            )}

            <Grid container spacing={4} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                  Front of License
                </Typography>
                <Box 
                  sx={{ 
                    border: '2px dashed rgba(255, 189, 0, 0.4)', 
                    borderRadius: 2, 
                    p: 3, 
                    textAlign: 'center',
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                    height: 250,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {frontImagePreview ? (
                    <Box>
                      <img 
                        src={frontImagePreview} 
                        alt="License Front Preview" 
                        style={{ maxWidth: '100%', maxHeight: 180, objectFit: 'contain', marginBottom: 16 }}
                      />
                      <Button 
                        onClick={() => {
                          setFrontImagePreview(null);
                          setLicenseInfo(prev => ({ ...prev, frontImage: null }));
                        }}
                        color="error"
                        variant="text"
                        disabled={licenseInfo.status === 'PENDING' || licenseInfo.status === 'APPROVED'}
                        sx={{ textTransform: 'none' }}
                      >
                        Remove
                      </Button>
                    </Box>
                  ) : (
                    <label style={{ width: '100%', height: '100%', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        style={{ display: 'none' }}
                        onChange={handleLicenseImageChange('front')}
                        disabled={licenseInfo.status === 'PENDING' || licenseInfo.status === 'APPROVED'}
                      />
                      <FiUpload style={{ fontSize: 48, margin: '0 auto 16px', color: 'rgba(255, 189, 0, 0.6)' }} />
                      <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>Click to upload front of license</Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', mt: 1 }}>
                        JPG, PNG or PDF, max 5MB
                      </Typography>
                    </label>
                  )}
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                  Back of License
                </Typography>
                <Box 
                  sx={{ 
                    border: '2px dashed rgba(255, 189, 0, 0.4)', 
                    borderRadius: 2, 
                    p: 3, 
                    textAlign: 'center',
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                    height: 250,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {backImagePreview ? (
                    <Box>
                      <img 
                        src={backImagePreview} 
                        alt="License Back Preview" 
                        style={{ maxWidth: '100%', maxHeight: 180, objectFit: 'contain', marginBottom: 16 }}
                      />
                      <Button 
                        onClick={() => {
                          setBackImagePreview(null);
                          setLicenseInfo(prev => ({ ...prev, backImage: null }));
                        }}
                        color="error"
                        variant="text"
                        disabled={licenseInfo.status === 'PENDING' || licenseInfo.status === 'APPROVED'}
                        sx={{ textTransform: 'none' }}
                      >
                        Remove
                      </Button>
                    </Box>
                  ) : (
                    <label style={{ width: '100%', height: '100%', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        style={{ display: 'none' }}
                        onChange={handleLicenseImageChange('back')}
                        disabled={licenseInfo.status === 'PENDING' || licenseInfo.status === 'APPROVED'}
                      />
                      <FiUpload style={{ fontSize: 48, margin: '0 auto 16px', color: 'rgba(255, 189, 0, 0.6)' }} />
                      <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>Click to upload back of license</Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', mt: 1 }}>
                        JPG, PNG or PDF, max 5MB
                      </Typography>
                    </label>
                  )}
                </Box>
              </Grid>
            </Grid>

            {(licenseInfo.status === 'NOT_UPLOADED' || licenseInfo.status === 'REJECTED') && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  onClick={uploadLicenseImages}
                  variant="contained"
                  disabled={!licenseInfo.frontImage || !licenseInfo.backImage || isLoading}
                  sx={{ 
                    bgcolor: '#ffbd00', 
                    color: '#390099',
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      bgcolor: '#d9a000'
                    },
                    '&.Mui-disabled': {
                      bgcolor: 'rgba(255, 189, 0, 0.4)'
                    }
                  }}
                >
                  {isLoading ? 'Uploading...' : 'Upload License'}
                </Button>
              </Box>
            )}
            
            {licenseInfo.status === 'APPROVED' && (
              <Box sx={{ 
                p: 3, 
                bgcolor: 'rgba(76, 175, 80, 0.1)', 
                borderRadius: 2,
                textAlign: 'center',
                border: '1px solid rgba(76, 175, 80, 0.3)'
              }}>
                <Typography sx={{ color: '#81c784' }}>
                  Your driver's license has been verified. You're ready to rent luxury vehicles!
                </Typography>
              </Box>
            )}
            
            {licenseInfo.status === 'PENDING' && (
              <Box sx={{ 
                p: 3, 
                bgcolor: 'rgba(255, 193, 7, 0.1)', 
                borderRadius: 2,
                textAlign: 'center',
                border: '1px solid rgba(255, 193, 7, 0.3)'
              }}>
                <Typography sx={{ color: '#ffd54f' }}>
                  Your license is currently being reviewed. This process typically takes 1-2 business days.
                </Typography>
              </Box>
            )}
          </Paper>
        )}

        {/* Payment Methods Section */}
        {activeTab === 2 && (
          <Paper 
            elevation={3}
            sx={{
              p: 4,
              bgcolor: 'rgba(33, 33, 33, 0.95)',
              color: 'white',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
                Payment Methods
              </Typography>
              <Button
                onClick={() => setShowAddCardForm(!showAddCardForm)}
                variant="contained"
                startIcon={<FiPlus />}
                sx={{ 
                  bgcolor: '#ffbd00', 
                  color: '#390099',
                  '&:hover': {
                    bgcolor: '#d9a000'
                  }
                }}
              >
                Add New Card
              </Button>
            </Box>

            {/* Add New Card Form */}
            {showAddCardForm && (
              <Box 
                component="form" 
                onSubmit={addNewCard} 
                sx={{ 
                  mb: 5, 
                  bgcolor: 'rgba(255, 255, 255, 0.05)', 
                  p: 4, 
                  borderRadius: 2,
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>Add New Payment Method</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Card Number</Typography>
                    <TextField
                      fullWidth
                      name="cardNumber"
                      value={newCardData.cardNumber}
                      onChange={handleNewCardChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      inputProps={{
                        pattern: "[0-9\\s]{13,19}",
                        maxLength: 19
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: 'rgba(255, 255, 255, 0.05)',
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                          },
                          '&:hover fieldset': {
                            borderColor: '#ffbd00',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#ffbd00',
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: 'white',
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Card Holder Name</Typography>
                    <TextField
                      fullWidth
                      name="cardHolder"
                      value={newCardData.cardHolder}
                      onChange={handleNewCardChange}
                      placeholder="John Doe"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: 'rgba(255, 255, 255, 0.05)',
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                          },
                          '&:hover fieldset': {
                            borderColor: '#ffbd00',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#ffbd00',
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: 'white',
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={3}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Expiry Date</Typography>
                    <TextField
                      fullWidth
                      name="expiryDate"
                      value={newCardData.expiryDate}
                      onChange={handleNewCardChange}
                      placeholder="MM/YY"
                      required
                      inputProps={{
                        pattern: "(0[1-9]|1[0-2])\/([0-9]{2})",
                        maxLength: 5
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: 'rgba(255, 255, 255, 0.05)',
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                          },
                          '&:hover fieldset': {
                            borderColor: '#ffbd00',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#ffbd00',
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: 'white',
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={3}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>CVV</Typography>
                    <TextField
                      fullWidth
                      name="cvv"
                      value={newCardData.cvv}
                      onChange={handleNewCardChange}
                      placeholder="123"
                      required
                      inputProps={{
                        pattern: "[0-9]{3,4}",
                        maxLength: 4
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: 'rgba(255, 255, 255, 0.05)',
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                          },
                          '&:hover fieldset': {
                            borderColor: '#ffbd00',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#ffbd00',
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: 'white',
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="button"
                    onClick={() => setShowAddCardForm(false)}
                    variant="outlined"
                    sx={{ 
                      mr: 2,
                      color: 'white', 
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    sx={{ 
                      bgcolor: '#ffbd00', 
                      color: '#390099',
                      '&:hover': {
                        bgcolor: '#d9a000'
                      },
                      '&.Mui-disabled': {
                        bgcolor: 'rgba(255, 189, 0, 0.4)'
                      }
                    }}
                  >
                    {isLoading ? 'Adding...' : 'Add Card'}
                  </Button>
                </Box>
              </Box>
            )}

            {/* Payment Methods List */}
            {paymentMethods.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {paymentMethods.map(card => (
                  <Box 
                    key={card.id} 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      p: 3,
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: 2,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.08)',
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ mr: 3, bgcolor: 'rgba(255, 255, 255, 0.1)', p: 1, borderRadius: 1 }}>
                        {card.brand === 'visa' && <img src="/images/visa.svg" alt="Visa" style={{ height: 32 }} />}
                        {card.brand === 'mastercard' && <img src="/images/mastercard.svg" alt="Mastercard" style={{ height: 32 }} />}
                        {card.brand === 'amex' && <img src="/images/amex.svg" alt="American Express" style={{ height: 32 }} />}
                        {(!card.brand || !['visa', 'mastercard', 'amex'].includes(card.brand)) && <FiCreditCard size={32} />}
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>•••• •••• •••• {card.last4}</Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                          Expires {card.expiryMonth}/{card.expiryYear}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      onClick={() => removeCard(card.id)}
                      color="error"
                      sx={{ minWidth: 'auto' }}
                    >
                      <FiTrash2 size={20} />
                    </Button>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box sx={{ 
                textAlign: 'center', 
                py: 8, 
                bgcolor: 'rgba(255, 255, 255, 0.05)', 
                borderRadius: 2,
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <FiCreditCard size={48} style={{ margin: '0 auto 16px', color: 'rgba(255, 255, 255, 0.3)' }} />
                <Typography variant="h6" sx={{ mb: 1 }}>No payment methods found</Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  Add a credit or debit card to make booking easier.
                </Typography>
              </Box>
            )}
          </Paper>
        )}

        {/* Activity History Section */}
        {activeTab === 3 && (
          <Paper 
            elevation={3}
            sx={{
              p: 4,
              bgcolor: 'rgba(33, 33, 33, 0.95)',
              color: 'white',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <Typography variant="h4" component="h2" sx={{ mb: 4, fontWeight: 600 }}>
              Activity History
            </Typography>

            {/* Filters */}
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 3, 
              mb: 4, 
              pb: 4, 
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Date Range</Typography>
                <TextField
                  select
                  name="dateRange"
                  value={filters.dateRange}
                  onChange={handleFilterChange}
                  SelectProps={{
                    native: true,
                  }}
                  sx={{
                    minWidth: 150,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#ffbd00',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ffbd00',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                    },
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                    },
                  }}
                >
                  <option value="all">All Time</option>
                  <option value="last30days">Last 30 Days</option>
                  <option value="last6months">Last 6 Months</option>
                  <option value="lastyear">Last Year</option>
                </TextField>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Car Type</Typography>
                <TextField
                  select
                  name="carType"
                  value={filters.carType}
                  onChange={handleFilterChange}
                  SelectProps={{
                    native: true,
                  }}
                  sx={{
                    minWidth: 150,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#ffbd00',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ffbd00',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                    },
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                    },
                  }}
                >
                  <option value="all">All Types</option>
                  <option value="sports">Sports</option>
                  <option value="luxury">Luxury</option>
                  <option value="suv">SUV</option>
                  <option value="convertible">Convertible</option>
                </TextField>
              </Box>
            </Box>

            {/* Bookings List */}
            {bookingsLoading ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <CircularProgress sx={{ color: '#ffbd00' }} />
                <Typography sx={{ mt: 2 }}>Loading booking history...</Typography>
              </Box>
            ) : bookings.length > 0 ? (
              <Box sx={{ overflow: 'auto' }}>
                <Box 
                  sx={{ 
                    minWidth: 700,
                    '& .header-cell': {
                      bgcolor: 'rgba(255, 255, 255, 0.08)',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      p: 2,
                    },
                    '& .table-cell': {
                      p: 2,
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    },
                    '& .table-row': {
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.03)',
                      },
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <Box className="header-cell" sx={{ flex: '3 1 0%' }}>Car</Box>
                    <Box className="header-cell" sx={{ flex: '2 1 0%' }}>Start Date</Box>
                    <Box className="header-cell" sx={{ flex: '1 1 0%' }}>Duration</Box>
                    <Box className="header-cell" sx={{ flex: '1 1 0%' }}>Total</Box>
                    <Box className="header-cell" sx={{ flex: '1 1 0%' }}>Status</Box>
                  </Box>
                  
                  {bookings.map(booking => (
                    <Box 
                      key={booking.id} 
                      className="table-row"
                      sx={{ display: 'flex' }}
                    >
                      <Box className="table-cell" sx={{ flex: '3 1 0%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {booking.carImage && (
                            <Box 
                              component="img"
                              src={booking.carImage}
                              alt={booking.carModel}
                              sx={{ 
                                width: 60, 
                                height: 40, 
                                objectFit: 'cover', 
                                borderRadius: 1,
                                mr: 2
                              }}
                            />
                          )}
                          <Box>
                            <Typography sx={{ fontWeight: 500 }}>{booking.carModel}</Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                              {booking.carType}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box className="table-cell" sx={{ flex: '2 1 0%' }}>
                        {format(new Date(booking.startDate), 'MMM d, yyyy')}
                      </Box>
                      <Box className="table-cell" sx={{ flex: '1 1 0%' }}>
                        {formatBookingDuration(booking.startDate, booking.endDate)}
                      </Box>
                      <Box className="table-cell" sx={{ flex: '1 1 0%', fontWeight: 600, color: '#ffbd00' }}>
                        ${booking.totalAmount.toFixed(2)}
                      </Box>
                      <Box className="table-cell" sx={{ flex: '1 1 0%' }}>
                        <Chip 
                          label={booking.status} 
                          size="small"
                          sx={{
                            bgcolor: booking.status === 'COMPLETED' ? 'rgba(76, 175, 80, 0.2)' : 
                              booking.status === 'CANCELLED' ? 'rgba(244, 67, 54, 0.2)' : 
                              booking.status === 'UPCOMING' ? 'rgba(33, 150, 243, 0.2)' : 
                              'rgba(158, 158, 158, 0.2)',
                            color: booking.status === 'COMPLETED' ? '#81c784' : 
                              booking.status === 'CANCELLED' ? '#e57373' : 
                              booking.status === 'UPCOMING' ? '#64b5f6' : 
                              '#bdbdbd',
                            borderRadius: '4px',
                            '& .MuiChip-label': {
                              px: 1,
                            }
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            ) : (
              <Box sx={{ 
                textAlign: 'center', 
                py: 8, 
                bgcolor: 'rgba(255, 255, 255, 0.05)', 
                borderRadius: 2,
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <FiClock size={48} style={{ margin: '0 auto 16px', color: 'rgba(255, 255, 255, 0.3)' }} />
                <Typography variant="h6" sx={{ mb: 1 }}>No booking history found</Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  You haven't made any bookings yet. When you do, they'll appear here.
                </Typography>
              </Box>
            )}
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default AccountSettings;