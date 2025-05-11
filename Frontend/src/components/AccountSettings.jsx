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
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

const AccountSettings = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Get token and userId from localStorage (set after login)
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

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

  // User data state
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    profileImage: "",
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: false,
  });

  // Password fields
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Payment methods state (mock, since not in backend)
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, cardType: "Visa", last4: "4242", expiry: "12/24" },
    { id: 2, cardType: "Mastercard", last4: "8888", expiry: "06/25" },
  ]);
  const [loadingPaymentMethods] = useState(false);

  // Fetch user data from backend on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId || !token) return;
      setIsLoading(true);
      try {
        // Use /api/users/me to get current user
        const response = await axios.get("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = response.data;
        setUserData({
          ...userData,
          ...user,
          address: user.address || {
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
          },
          profileImage: user.profileImage || "",
          emailNotifications: true, // You can wire these fields if you add them to your backend
          smsNotifications: false,
          twoFactorAuth: false,
        });
      } catch (error) {
        setErrorMessage("Failed to load user data. Please try again.");
        setShowError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
    // eslint-disable-next-line
  }, [userId, token]);

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
    if (!userId || !token) {
      setErrorMessage("You need to be logged in to update your profile");
      setShowError(true);
      return;
    }
    try {
      const response = await axios.put(
        `/api/users/${userId}`,
        userData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditing(false);
      setSuccessMessage("Profile updated successfully!");
      setShowSuccess(true);
      setUserData({ ...userData, ...response.data });
    } catch (error) {
      setErrorMessage("Failed to update profile. Please try again.");
      setShowError(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    if (name.startsWith("address.")) {
      const addrField = name.split(".")[1];
      setUserData({
        ...userData,
        address: { ...userData.address, [addrField]: value },
      });
    } else {
      setUserData({
        ...userData,
        [name]: e.target.type === "checkbox" ? checked : value,
      });
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleUpdatePassword = async () => {
    if (!userId || !token) {
      setErrorMessage("You need to be logged in to update your password");
      setShowError(true);
      return;
    }
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
        `/api/users/${userId}/password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setSuccessMessage("Password updated successfully!");
      setShowSuccess(true);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to update password. Please try again."
      );
      setShowError(true);
    }
  };

  const handleDeleteAccount = async () => {
    if (!userId || !token) return;
    try {
      await axios.delete(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeleteDialogOpen(false);
      // Log out: remove tokens and redirect
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      window.location.href = "/";
    } catch (error) {
      setErrorMessage("Failed to delete account. Please try again.");
      setShowError(true);
      setDeleteDialogOpen(false);
    }
  };

  const handleProfileImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !userId || !token) return;
    const formData = new FormData();
    formData.append("profileImage", file);
    try {
      const response = await axios.post(
        `/api/users/${userId}/profile-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData({
        ...userData,
        profileImage: response.data.imageUrl,
      });
      setSuccessMessage("Profile picture updated successfully!");
      setShowSuccess(true);
    } catch (error) {
      setErrorMessage("Failed to upload profile image. Please try again.");
      setShowError(true);
    }
  };

  // Notification preferences (mock, since not in backend)
  const handleSaveNotifications = async () => {
    setSuccessMessage("Notification preferences updated successfully!");
    setShowSuccess(true);
  };

  // Payment methods (mock)
  const handleAddPaymentMethod = async () => {
    setSuccessMessage("Payment method would be added via secure payment provider");
    setShowSuccess(true);
  };
  const handleRemovePaymentMethod = async (paymentMethodId) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== paymentMethodId));
    setSuccessMessage("Payment method removed successfully!");
    setShowSuccess(true);
  };

  // --- UI Rendering (unchanged, as you requested) ---

  // ... (keep your renderProfileTab and other tab renderers unchanged)
  // ... (keep your tab navigation and all styling as in your original code)

  // Example: renderProfileTab (you can keep your original code here)
  const renderProfileTab = () => (
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
              boxShadow: `0 8px 32px ${alpha("#040430", 0.15)}`,
            }}
          >
            {/* ...rest of your profile card code */}
            {/* ... */}
          </Card>
        </Grid>
        {/* ...rest of your profile tab code */}
      </Grid>
    </motion.div>
  );

  // ... (keep your other tab renderers unchanged)

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            bgcolor: alpha(theme.palette.background.paper, 0.9),
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
            Account Settings
          </Typography>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            sx={{ mb: 3 }}
          >
            <Tab label="Profile" />
            <Tab label="Security" />
            <Tab label="Notifications" />
            <Tab label="Payments" />
            <Tab label="Danger Zone" />
          </Tabs>
          <Divider sx={{ mb: 3 }} />
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height={200}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {tabValue === 0 && renderProfileTab()}
              {/* ...render other tabs as in your original code */}
            </>
          )}
        </Paper>
      </Container>
      <Footer />
      {/* Snackbar & Dialogs (keep as in your code) */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={4000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setShowError(false)} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteAccount} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountSettings;
