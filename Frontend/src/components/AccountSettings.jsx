import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  Grid,
  IconButton,
  Tabs,
  Tab,
  Divider,
  Switch,
  FormControlLabel,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Alert,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
  alpha,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import {
  PhotoCamera,
  Save,
  Edit,
  Security,
  Notifications,
  CreditCard,
  Delete,
  AddCircleOutline,
  Visibility,
  VisibilityOff,
  Warning,
  Check,
  AccountCircle,
  Email,
  Phone,
  Home,
  LocationCity,
  Public,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios"; // Added axios for API calls

const AccountSettings = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { currentUser, logout } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(
    "Your changes have been saved successfully!"
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    displayName: currentUser?.displayName || "",
    email: currentUser?.email || "",
    phoneNumber: currentUser?.phoneNumber || "",
    address: "",
    city: "",
    country: "",
    profileImage: currentUser?.photoURL || "",
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: false,
  });

  // Colors from theme
  const primaryColour = theme.palette.primary.main; // '#ffd633'
  const secondaryColour = theme.palette.secondary.main; // '#390099'
  const darkBlueColor = theme.palette.primary.blue; // '#040430'

  // Payment methods state
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loadingPaymentMethods, setLoadingPaymentMethods] = useState(false);

  // Password fields
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle password input change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  // Fetch user data from backend on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;

      setIsLoading(true);
      try {
        const response = await axios.get(`/api/users/${currentUser.uid}`, {
          headers: {
            Authorization: `Bearer ${await currentUser.getIdToken()}`,
          },
        });

        const userDataFromBackend = response.data;
        setUserData({
          ...userData,
          ...userDataFromBackend,
          displayName: userDataFromBackend.displayName || currentUser.displayName || "",
          email: userDataFromBackend.email || currentUser.email || "",
          phoneNumber: userDataFromBackend.phoneNumber || currentUser.phoneNumber || "",
          profileImage: userDataFromBackend.profileImage || currentUser.photoURL || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrorMessage("Failed to load user data. Please try again.");
        setShowError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  // Fetch payment methods
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      if (!currentUser) return;

      setLoadingPaymentMethods(true);
      try {
        const response = await axios.get(
          `/api/users/${currentUser.uid}/payment-methods`,
          {
            headers: {
              Authorization: `Bearer ${await currentUser.getIdToken()}`,
            },
          }
        );

        setPaymentMethods(response.data || []);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
        // Fallback to mock data if API fails
        setPaymentMethods([
          { id: 1, cardType: "Visa", last4: "4242", expiry: "12/24" },
          { id: 2, cardType: "Mastercard", last4: "8888", expiry: "06/25" },
        ]);
      } finally {
        setLoadingPaymentMethods(false);
      }
    };

    fetchPaymentMethods();
  }, [currentUser]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleProfileEdit = () => {
    setEditing(!editing);
  };

  const handleProfileSave = async () => {
    if (!currentUser) {
      setErrorMessage("You need to be logged in to update your profile");
      setShowError(true);
      return;
    }

    try {
      const response = await axios.put(
        `/api/users/${currentUser.uid}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${await currentUser.getIdToken()}`,
          },
        }
      );

      setEditing(false);
      setSuccessMessage("Profile updated successfully!");
      setShowSuccess(true);
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("Failed to update profile. Please try again.");
      setShowError(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setUserData({
      ...userData,
      [name]: e.target.type === "checkbox" ? checked : value,
    });
  };

  const handleUpdatePassword = async () => {
    // Validate passwords
    if (!passwordData.currentPassword) {
      setErrorMessage("Current password is required");
      setShowError(true);
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage("New password and confirmation do not match");
      setShowError(true);
      return;
    }

    try {
      await axios.put(
        `/api/users/${currentUser.uid}/password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${await currentUser.getIdToken()}`,
          },
        }
      );

      // Reset password fields
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setSuccessMessage("Password updated successfully!");
      setShowSuccess(true);
    } catch (error) {
      console.error("Error updating password:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to update password. Please try again."
      );
      setShowError(true);
    }
  };

  const handleSaveNotifications = async () => {
    try {
      await axios.put(
        `/api/users/${currentUser.uid}/notifications`,
        {
          emailNotifications: userData.emailNotifications,
          smsNotifications: userData.smsNotifications,
          marketingCommunications: userData.marketingCommunications,
        },
        {
          headers: {
            Authorization: `Bearer ${await currentUser.getIdToken()}`,
          },
        }
      );

      setSuccessMessage("Notification preferences updated successfully!");
      setShowSuccess(true);
    } catch (error) {
      console.error("Error updating notifications:", error);
      setErrorMessage("Failed to update notification preferences. Please try again.");
      setShowError(true);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`/api/users/${currentUser.uid}`, {
        headers: {
          Authorization: `Bearer ${await currentUser.getIdToken()}`,
        },
      });

      setDeleteDialogOpen(false);

      // Sign user out
      await logout();

      // Navigate to home page or display a message
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting account:", error);
      setErrorMessage("Failed to delete account. Please try again.");
      setShowError(true);
      setDeleteDialogOpen(false);
    }
  };

  const handleAddPaymentMethod = async () => {
    // This would typically redirect to a payment provider form
    // For now, we'll just show a success message
    setSuccessMessage("Payment method would be added via secure payment provider");
    setShowSuccess(true);
  };

  const handleRemovePaymentMethod = async (paymentMethodId) => {
    try {
      await axios.delete(
        `/api/users/${currentUser.uid}/payment-methods/${paymentMethodId}`,
        {
          headers: {
            Authorization: `Bearer ${await currentUser.getIdToken()}`,
          },
        }
      );

      // Update the state to remove this payment method
      setPaymentMethods(paymentMethods.filter((method) => method.id !== paymentMethodId));

      setSuccessMessage("Payment method removed successfully!");
      setShowSuccess(true);
    } catch (error) {
      console.error("Error removing payment method:", error);
      setErrorMessage("Failed to remove payment method. Please try again.");
      setShowError(true);
    }
  };

  const handleProfileImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await axios.post(
        `/api/users/${currentUser.uid}/profile-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${await currentUser.getIdToken()}`,
          },
        }
      );

      // Update user data with new image URL
      setUserData({
        ...userData,
        profileImage: response.data.imageUrl,
      });

      setSuccessMessage("Profile picture updated successfully!");
      setShowSuccess(true);
    } catch (error) {
      console.error("Error uploading profile image:", error);
      setErrorMessage("Failed to upload profile image. Please try again.");
      setShowError(true);
    }
  };

  // Enhanced profile tab content
  const renderProfileTab = () => {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={4}>
          {/* Profile Card */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={3}
              component={motion.div}
              variants={itemVariants}
              sx={{
                p: 0,
                borderRadius: 4,
                bgcolor: "white",
                textAlign: "center",
                height: "100%",
                overflow: "hidden",
                boxShadow: `0 8px 32px ${alpha(darkBlueColor, 0.15)}`,
              }}
            >
              {/* Header banner */}
              <Box
                sx={{
                  height: 100,
                  width: "100%",
                  background: `linear-gradient(135deg, ${secondaryColour} 0%, ${alpha(
                    darkBlueColor,
                    0.8
                  )} 100%)`,
                  position: "relative",
                }}
              />

              {/* Avatar */}
              <Box sx={{ position: "relative", mt: -8, mb: 2 }}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Avatar
                    src={userData.profileImage}
                    alt={userData.displayName || "User"}
                    sx={{
                      width: 140,
                      height: 140,
                      mx: "auto",
                      border: `5px solid white`,
                      boxShadow: `0 8px 24px ${alpha(darkBlueColor, 0.3)}`,
                      fontSize: "4rem",
                      bgcolor: primaryColour,
                      color: darkBlueColor,
                    }}
                  >
                    {userData.displayName
                      ? userData.displayName[0].toUpperCase()
                      : "U"}
                  </Avatar>

                  {/* Camera Icon overlay */}
                  <label htmlFor="profile-image-upload">
                    <IconButton
                      component="span"
                      sx={{
                        position: "absolute",
                        bottom: 5,
                        right: "50%",
                        transform: "translateX(50px)",
                        bgcolor: primaryColour,
                        color: darkBlueColor,
                        "&:hover": {
                          bgcolor: alpha(primaryColour, 0.9),
                        },
                      }}
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="profile-image-upload"
                    type="file"
                    onChange={handleProfileImageUpload}
                  />
                </motion.div>
              </Box>

              <CardContent sx={{ pt: 0, pb: 4 }}>
                <Typography
                  variant="h5"
                  fontWeight={800}
                  gutterBottom
                  sx={{ color: darkBlueColor }}
                >
                  {userData.displayName || "New User"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3, fontWeight: 500 }}
                >
                  {userData.email}
                </Typography>

                <Divider sx={{ mb: 3, mx: -2 }} />

                {/* Quick Info */}
                <Box sx={{ textAlign: "left", px: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1.5,
                    }}
                  >
                    <Email
                      sx={{
                        color: alpha(secondaryColour, 0.8),
                        mr: 2,
                        fontSize: 20,
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {userData.email || "No email provided"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1.5,
                    }}
                  >
                    <Phone
                      sx={{
                        color: alpha(secondaryColour, 0.8),
                        mr: 2,
                        fontSize: 20,
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {userData.phoneNumber || "No phone provided"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1.5,
                    }}
                  >
                    <LocationCity
                      sx={{
                        color: alpha(secondaryColour, 0.8),
                        mr: 2,
                        fontSize: 20,
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {userData.city || "No city provided"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Public
                      sx={{
                        color: alpha(secondaryColour, 0.8),
                        mr: 2,
                        fontSize: 20,
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {userData.country || "No country provided"}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Personal Details Section */}
          <Grid item xs={12} md={8}>
            <Card
              elevation={3}
              component={motion.div}
              variants={itemVariants}
              sx={{
                borderRadius: 4,
                bgcolor: "white",
                height: "100%",
                overflow: "hidden",
                boxShadow: `0 8px 32px ${alpha(darkBlueColor, 0.15)}`,
              }}
            >
              <Box
                sx={{
                  p: 3,
                  background: `linear-gradient(135deg, ${alpha(
                    primaryColour,
                    0.2
                  )} 0%, ${alpha(secondaryColour, 0.1)} 100%)`,
                  borderBottom: `1px solid ${alpha(darkBlueColor, 0.1)}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={800}
                  sx={{ color: darkBlueColor }}
                >
                  Personal Information
                </Typography>
                <Button
                  variant={editing ? "contained" : "outlined"}
                  startIcon={editing ? <Save /> : <Edit />}
                  onClick={editing ? handleProfileSave : handleProfileEdit}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    bgcolor: editing ? primaryColour : "transparent",
                    color: editing ? darkBlueColor : darkBlueColor,
                    borderColor: editing ? "transparent" : primaryColour,
                    "&:hover": {
                      bgcolor: editing
                        ? alpha(primaryColour, 0.9)
                        : alpha(primaryColour, 0.1),
                      borderColor: editing ? "transparent" : alpha(primaryColour, 0.7),
                    },
                    fontWeight: 600,
                    boxShadow:
                      editing && `0 4px 14px ${alpha(primaryColour, 0.4)}`,
                  }}
                >
                  {editing ? "Save Changes" : "Edit Profile"}
                </Button>
              </Box>

              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 3,
                    color: alpha(darkBlueColor, 0.7),
                    fontStyle: "italic",
                  }}
                >
                  Update your personal details to enhance your car rental
                  experience. Your information helps us provide you with
                  personalized service.
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="displayName"
                      value={userData.displayName}
                      onChange={handleInputChange}
                      disabled={!editing}
                      sx={{
                        mb: 1,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: editing ? "white" : alpha(darkBlueColor, 0.02),
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle
                              sx={{
                                color: editing
                                  ? primaryColour
                                  : alpha(darkBlueColor, 0.5),
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      disabled={!editing}
                      sx={{
                        mb: 1,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: editing ? "white" : alpha(darkBlueColor, 0.02),
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email
                              sx={{
                                color: editing
                                  ? primaryColour
                                  : alpha(darkBlueColor, 0.5),
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phoneNumber"
                      value={userData.phoneNumber}
                      onChange={handleInputChange}
                      disabled={!editing}
                      sx={{
                        mb: 1,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: editing ? "white" : alpha(darkBlueColor, 0.02),
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone
                              sx={{
                                color: editing
                                  ? primaryColour
                                  : alpha(darkBlueColor, 0.5),
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Country"
                      name="country"
                      value={userData.country}
                      onChange={handleInputChange}
                      disabled={!editing}
                      sx={{
                        mb: 1,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: editing ? "white" : alpha(darkBlueColor, 0.02),
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Public
                              sx={{
                                color: editing
                                  ? primaryColour
                                  : alpha(darkBlueColor, 0.5),
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      value={userData.city}
                      onChange={handleInputChange}
                      disabled={!editing}
                      sx={{
                        mb: 1,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: editing ? "white" : alpha(darkBlueColor, 0.02),
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationCity
                              sx={{
                                color: editing
                                  ? primaryColour
                                  : alpha(darkBlueColor, 0.5),
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={userData.address}
                      onChange={handleInputChange}
                      disabled={!editing}
                      sx={{
                        mb: 1,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: editing ? "white" : alpha(darkBlueColor, 0.02),
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Home
                              sx={{
                                color: editing
                                  ? primaryColour
                                  : alpha(darkBlueColor, 0.5),
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {editing && (
                      <Box sx={{ mt: 2 }}>
                        <Alert
                          severity="info"
                          icon={false}
                          sx={{
                            borderRadius: 2,
                            bgcolor: alpha(primaryColour, 0.1),
                            color: darkBlueColor,
                            border: `1px solid ${alpha(primaryColour, 0.3)}`,
                          }}
                        >
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Click "Save Changes" to update your information
                          </Typography>
                        </Alert>
                      </Box>
                    )}
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    mt: 4,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Last updated: {new Date().toLocaleDateString()}
                  </Typography>
                  {editing && (
                    <Button
                      variant="contained"
                      onClick={handleProfileSave}
                      sx={{
                        borderRadius: 2,
                        px: 4,
                        py: 1.2,
                        bgcolor: primaryColour,
                        color: darkBlueColor,
                        fontWeight: 700,
                        "&:hover": {
                          bgcolor: alpha(primaryColour, 0.9),
                          boxShadow: `0 6px 20px ${alpha(primaryColour, 0.4)}`,
                        },
                        boxShadow: `0 4px 14px ${alpha(primaryColour, 0.4)}`,
                      }}
                    >
                      Save Changes
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </motion.div>
    );
  };

  // Updated renderTabContent function
  const renderTabContent = () => {
    switch (tabValue) {
      case 0: // Profile
        return renderProfileTab();
      case 1: // Security
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={4}>
              {/* Password Change Section */}
              <Grid item xs={12} md={6}>
                <Card
                  elevation={2}
                  component={motion.div}
                  variants={itemVariants}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: "white",
                    height: "100%",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  }}
                >
                  <Typography variant="h6" fontWeight={700} mb={3}>
                    Change Password
                  </Typography>

                  <TextField
                    fullWidth
                    margin="normal"
                    label="Current Password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    type={showPassword ? "text" : "password"}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="New Password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    type={showPassword ? "text" : "password"}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Confirm New Password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    type={showPassword ? "text" : "password"}
                    sx={{
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleUpdatePassword}
                    sx={{
                      py: 1.5,
                      borderRadius: 8,
                      bgcolor: primaryColour,
                      color: darkBlueColor,
                      fontWeight: 600,
                      "&:hover": {
                        bgcolor: alpha(primaryColour, 0.9),
                      },
                    }}
                  >
                    Update Password
                  </Button>
                </Card>
              </Grid>

              {/* Two-Factor Authentication Section */}
              <Grid item xs={12} md={6}>
                <Card
                  elevation={2}
                  component={motion.div}
                  variants={itemVariants}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: "white",
                    height: "100%",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  }}
                >
                  <Typography variant="h6" fontWeight={700} mb={3}>
                    Two-Factor Authentication
                  </Typography>

                  <Box
                    sx={{
                      bgcolor: alpha(primaryColour, 0.1),
                      p: 2,
                      borderRadius: 2,
                      mb: 3,
                      border: `1px solid ${alpha(primaryColour, 0.3)}`,
                    }}
                  >
                    <Typography variant="body2" mb={2}>
                      Enable two-factor authentication for an extra layer of
                      security. We'll send a verification code to your phone each
                      time you sign in.
                    </Typography>

                    <FormControlLabel
                      control={
                        <Switch
                          checked={userData.twoFactorAuth}
                          onChange={handleInputChange}
                          name="twoFactorAuth"
                          color="primary"
                        />
                      }
                      label={
                        <Typography fontWeight={600}>
                          {userData.twoFactorAuth ? "Enabled" : "Disabled"}
                        </Typography>
                      }
                    />
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" fontWeight={700} mb={3}>
                    Danger Zone
                  </Typography>

                  <Box
                    sx={{
                      bgcolor: alpha("#f44336", 0.05),
                      p: 2,
                      borderRadius: 2,
                      border: `1px solid ${alpha("#f44336", 0.2)}`,
                    }}
                  >
                    <Typography variant="body2" mb={2}>
                      Once you delete your account, there is no going back.
                      Please be certain.
                    </Typography>

                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => setDeleteDialogOpen(true)}
                      sx={{
                        borderRadius: 8,
                      }}
                    >
                      Delete Account
                    </Button>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </motion.div>
        );

      case 2: // Payment Methods
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={4}>
              {/* Existing Payment Methods */}
              <Grid item xs={12} md={7}>
                <Card
                  elevation={2}
                  component={motion.div}
                  variants={itemVariants}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: "white",
                    height: "100%",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  }}
                >
                  <Typography variant="h6" fontWeight={700} mb={3}>
                    Payment Methods
                  </Typography>

                  {paymentMethods.map((method) => (
                    <Paper
                      key={method.id}
                      elevation={0}
                      sx={{
                        p: 2,
                        mb: 2,
                        borderRadius: 2,
                        border: `1px solid ${alpha(darkBlueColor, 0.1)}`,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        "&:hover": {
                          boxShadow: `0 5px 15px ${alpha(darkBlueColor, 0.1)}`,
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          sx={{
                            width: 45,
                            height: 30,
                            borderRadius: 1,
                            bgcolor:
                              method.cardType === "Visa"
                                ? "#172B85"
                                : "#EB001B",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            mr: 2,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "0.7rem",
                          }}
                        >
                          {method.cardType === "Visa" ? "VISA" : "MC"}
                        </Box>
                        <Box>
                          <Typography variant="body1" fontWeight={600}>
                            **** **** **** {method.last4}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Expires: {method.expiry}
                          </Typography>
                        </Box>
                      </Box>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleRemovePaymentMethod(method.id)}
                        sx={{
                          minWidth: "auto",
                          textTransform: "none",
                        }}
                      >
                        Remove
                      </Button>
                    </Paper>
                  ))}

                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<AddCircleOutline />}
                    onClick={handleAddPaymentMethod}
                    sx={{
                      mt: 2,
                      py: 1.5,
                      borderRadius: 8,
                      color: darkBlueColor,
                      borderColor: alpha(darkBlueColor, 0.3),
                      "&:hover": {
                        borderColor: darkBlueColor,
                        bgcolor: alpha(darkBlueColor, 0.05),
                      },
                    }}
                  >
                    Add Payment Method
                  </Button>
                </Card>
              </Grid>

              {/* Billing Address */}
              <Grid item xs={12} md={5}>
                <Card
                  elevation={2}
                  component={motion.div}
                  variants={itemVariants}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: "white",
                    height: "100%",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  }}
                >
                  <Typography variant="h6" fontWeight={700} mb={3}>
                    Billing Address
                  </Typography>

                  <TextField
                    fullWidth
                    label="Full Name"
                    defaultValue={userData.displayName}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Address Line"
                    defaultValue={userData.address}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="City"
                        defaultValue={userData.city}
                        sx={{
                          mb: 2,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Postal Code"
                        sx={{
                          mb: 2,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    fullWidth
                    label="Country"
                    defaultValue={userData.country}
                    sx={{
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      py: 1.5,
                      borderRadius: 8,
                      bgcolor: primaryColour,
                      color: darkBlueColor,
                      fontWeight: 600,
                      "&:hover": {
                        bgcolor: alpha(primaryColour, 0.9),
                      },
                    }}
                  >
                    Save Billing Address
                  </Button>
                </Card>
              </Grid>
            </Grid>
          </motion.div>
        );

      case 3: // Notifications
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Card
              elevation={2}
              component={motion.div}
              variants={itemVariants}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "white",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              }}
            >
              <Typography variant="h6" fontWeight={700} mb={3}>
                Notification Preferences
              </Typography>

              <List>
                <ListItem
                  sx={{
                    px: 3,
                    py: 2,
                    borderRadius: 2,
                    mb: 2,
                    bgcolor: alpha(darkBlueColor, 0.03),
                  }}
                >
                  <ListItemText
                    primary="Email Notifications"
                    secondary="Receive booking confirmations, updates, and promotional offers by email"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={userData.emailNotifications}
                        onChange={handleInputChange}
                        name="emailNotifications"
                        color="primary"
                      />
                    }
                    label=""
                  />
                </ListItem>

                <ListItem
                  sx={{
                    px: 3,
                    py: 2,
                    borderRadius: 2,
                    mb: 2,
                    bgcolor: alpha(darkBlueColor, 0.03),
                  }}
                >
                  <ListItemText
                    primary="SMS Notifications"
                    secondary="Receive booking reminders and updates by text message"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={userData.smsNotifications}
                        onChange={handleInputChange}
                        name="smsNotifications"
                        color="primary"
                      />
                    }
                    label=""
                  />
                </ListItem>

                <ListItem
                  sx={{
                    px: 3,
                    py: 2,
                    borderRadius: 2,
                    bgcolor: alpha(darkBlueColor, 0.03),
                  }}
                >
                  <ListItemText
                    primary="Marketing Communications"
                    secondary="Receive special offers, discounts, and news about new vehicles"
                  />
                  <FormControlLabel
                    control={<Switch color="primary" />}
                    label=""
                  />
                </ListItem>
              </List>

              <Box sx={{ textAlign: "right", mt: 3 }}>
                <Button
                  variant="contained"
                  onClick={handleSaveNotifications}
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: 8,
                    bgcolor: primaryColour,
                    color: darkBlueColor,
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: alpha(primaryColour, 0.9),
                    },
                  }}
                >
                  Save Preferences
                </Button>
              </Box>
            </Card>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha(darkBlueColor, 0.05)} 0%, ${alpha(
            secondaryColour,
            0.08
          )} 100%)`,
          minHeight: "100vh",
          py: { xs: 5, md: 8 },
          pt: { xs: 12, md: 16 },
        }}
      >
        <Container maxWidth="lg">
          {/* Page Header */}
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
                textAlign: "center",
                letterSpacing: "-0.02em",
              }}
            >
              Account Settings
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: alpha(darkBlueColor, 0.7),
                mb: 5,
                textAlign: "center",
                maxWidth: 700,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Manage your profile details, security preferences, payment methods,
              and notification settings
            </Typography>
          </motion.div>

          {/* Loading State */}
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
              <CircularProgress sx={{ color: primaryColour }} />
            </Box>
          ) : (
            <>
              {/* Tabs Section */}
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 4,
                  mb: 4,
                  overflow: "hidden",
                  bgcolor: "white",
                  boxShadow: `0 8px 32px ${alpha(darkBlueColor, 0.15)}`,
                  border: `1px solid ${alpha(primaryColour, 0.2)}`,
                }}
              >
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant={isMobile ? "scrollable" : "fullWidth"}
                  scrollButtons={isMobile ? "auto" : false}
                  aria-label="account settings tabs"
                  sx={{
                    "& .MuiTabs-flexContainer": {
                      justifyContent: "center",
                    },
                    "& .MuiTab-root": {
                      py: 2.5,
                      fontSize: { xs: "0.8rem", sm: "0.9rem" },
                      fontWeight: 700,
                      color: alpha(darkBlueColor, 0.6),
                      "&.Mui-selected": {
                        color: darkBlueColor,
                      },
                      "&:hover": {
                        backgroundColor: alpha(primaryColour, 0.05),
                      },
                      transition: "all 0.2s",
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: primaryColour,
                      height: 4,
                      borderRadius: "2px 2px 0 0",
                    },
                    borderBottom: `1px solid ${alpha(darkBlueColor, 0.1)}`,
                  }}
                >
                  <Tab
                    icon={<AccountCircleIcon />}
                    iconPosition="start"
                    label="Profile"
                    id="tab-0"
                    aria-controls="tabpanel-0"
                  />
                  <Tab
                    icon={<SecurityIcon />}
                    iconPosition="start"
                    label="Security"
                    id="tab-1"
                    aria-controls="tabpanel-1"
                  />
                  <Tab
                    icon={<CreditCardIcon />}
                    iconPosition="start"
                    label="Payment Methods"
                    id="tab-2"
                    aria-controls="tabpanel-2"
                  />
                  <Tab
                    icon={<NotificationsIcon />}
                    iconPosition="start"
                    label="Notifications"
                    id="tab-3"
                    aria-controls="tabpanel-3"
                  />
                </Tabs>
              </Paper>

              {/* Tab Content */}
              <Box
                role="tabpanel"
                id={`tabpanel-${tabValue}`}
                aria-labelledby={`tab-${tabValue}`}
              >
                {renderTabContent()}
              </Box>
            </>
          )}
        </Container>
      </Box>
      <Footer />

      {/* Delete Account Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          elevation: 5,
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ pb: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "error.main",
            }}
          >
            <Warning sx={{ mr: 1 }} />
            Are you sure you want to delete your account?
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone. All your personal information, booking
            history, and settings will be permanently deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{
              borderRadius: 8,
              px: 3,
              color: "text.primary",
              "&:hover": { bgcolor: alpha(darkBlueColor, 0.05) },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAccount}
            color="error"
            variant="contained"
            sx={{
              borderRadius: 8,
              px: 3,
            }}
          >
            Delete My Account
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={5000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          variant="filled"
          icon={<Check fontSize="inherit" />}
          sx={{
            width: "100%",
            borderRadius: 8,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={5000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowError(false)}
          severity="error"
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: 8,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AccountSettings;

// Helper icon components for tabs
function AccountCircleIcon() {
  return <AccountCircle sx={{ fontSize: 20, mr: 1 }} />;
}

function SecurityIcon() {
  return <Security sx={{ fontSize: 20, mr: 1 }} />;
}

function CreditCardIcon() {
  return <CreditCard sx={{ fontSize: 20, mr: 1 }} />;
}

function NotificationsIcon() {
  return <Notifications sx={{ fontSize: 20, mr: 1 }} />;
}