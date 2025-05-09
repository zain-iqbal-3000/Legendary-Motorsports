import { useState, useEffect } from 'react';
import AddCar from './components/AddCar';
import {
  Box, Drawer,AppBar,Toolbar,List,
  Typography,Divider,IconButton,ListItem,ListItemButton,ListItemIcon,ListItemText,Avatar,Chip,
  Grid,Card,CardContent,Button,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,
  Paper,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,TextField,FormControl,InputLabel,
  Select,MenuItem,Tab,Tabs,Badge,Stack,Switch,FormControlLabel
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  DirectionsCar as DirectionsCarIcon,
  CalendarToday as CalendarTodayIcon,
  People as PeopleIcon,
  AttachMoney as AttachMoneyIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Logout as LogoutIcon,
  Assessment as AssessmentIcon,
  Mail as MailIcon,
  Help as HelpIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import FleetStatus from './components/FleetStatus';


const mockBookings = [
  {
    id: 101,
    customer: 'John Smith',
    carId: 2,
    car: 'Ferrari SF90 Stradale',
    startDate: '2023-06-15',
    endDate: '2023-06-18',
    status: 'Active',
    paymentStatus: 'Paid',
    amount: 10497
  },
  {
    id: 102,
    customer: 'Emily Johnson',
    carId: 5,
    car: 'Porsche 911 GT2 RS',
    startDate: '2023-06-20',
    endDate: '2023-06-22',
    status: 'Upcoming',
    paymentStatus: 'Paid',
    amount: 4798
  },
  {
    id: 103,
    customer: 'Michael Williams',
    carId: 1,
    car: 'Lamborghini Aventador SVJ',
    startDate: '2023-06-10',
    endDate: '2023-06-12',
    status: 'Completed',
    paymentStatus: 'Paid',
    amount: 5998
  },
  {
    id: 104,
    customer: 'Sophia Brown',
    carId: 3,
    car: 'McLaren 720S',
    startDate: '2023-06-05',
    endDate: '2023-06-10',
    status: 'Completed',
    paymentStatus: 'Paid',
    amount: 13995
  },
  {
    id: 105,
    customer: 'James Davis',
    carId: 4,
    car: 'Bugatti Chiron',
    startDate: '2023-06-25',
    endDate: '2023-06-27',
    status: 'Upcoming',
    paymentStatus: 'Pending',
    amount: 9998
  }
];

const mockStats = {
  totalRevenue: 145286,
  activeBookings: 1,
  upcomingBookings: 2,
  availableCars: 3,
  conversionRate: 68,
  popularCar: 'Ferrari SF90 Stradale',
  monthlyGrowth: 12.5
};

const drawerWidth = 220;

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState('overview');
  const [carDialogOpen, setCarDialogOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState(mockBookings);
  const [editMode, setEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);


   // Fetch car data from the backend
   useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('/api/cars'); // Adjust the endpoint if necessary
        setCars(response.data); // Update the state with the fetched car data
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    fetchCars();
  }, []);

  // Handle drawer open/close
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Handle section selection
  const handleSectionSelect = (section) => {
    setSelectedSection(section);
  };

  // Handle car dialog open/close
  const handleCarDialogOpen = () => {
    setCarDialogOpen(true);
  };

  const handleCarDialogClose = () => {
    setCarDialogOpen(false);
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle car form submission
  const handleCarSubmit = (carData) => {
    if (editMode) {
      // Update existing car logic
      console.log('Updating car:', carData);
    } else {
      // Add new car logic
      console.log('Adding new car:', carData);
    }
  };

  // Filter cars based on search query
  const filteredCars = cars.filter(car => 
    car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  const cardStyles = {
    height: '100%',
    borderRadius: 2,
  };
  // Dashboard sections
  const renderOverview = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
     
    >
      {/* // ===================Header=================== */}
      <Box sx={{ mb: 2 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 1, 
            fontWeight: 700, 
            '& .highlight': { color: 'primary.main' } 
          }}
        >
          Admin <span className="highlight">Dashboard</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome back, Admin. Here's what's happening with your fleet today.
        </Typography>
      </Box>
      {/* // ===================/Header=================== */}

      {/*  // ===================Stats=================== */} 
      <Grid container spacing={1} sx={{ mb: 1 }}>
        {/* Total Revenue Card */}
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <motion.div variants={itemVariants}>
            <Card
              sx={{
                ...cardStyles,
                background: 'linear-gradient(135deg, rgba(57, 0, 153, 0.8), rgba(57, 0, 153, 0.6))', // Purple background
              }}
            >
              <CardContent>
                <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Total Revenue
                </Typography>
                <Typography variant="h4" sx={{ my: 1, fontWeight: 700, color: 'white' }}>
                  ${mockStats.totalRevenue.toLocaleString()}
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'primary.main',
                  }}
                >
                  <Box
                    sx={{
                      display: 'inline-block',
                      width: 0,
                      height: 0,
                      borderLeft: '4px solid transparent',
                      borderRight: '4px solid transparent',
                      borderBottom: '6px solid',
                      color: 'primary.main',
                      mr: 0.5,
                    }}
                  />
                  {mockStats.monthlyGrowth}% from last month
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Active Bookings Card */}
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <motion.div variants={itemVariants}>
            <Card sx={{ ...cardStyles, background: '#fff' }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Active Bookings
                </Typography>
                <Typography variant="h4" sx={{ my: 1, fontWeight: 700 }}>
                  {mockStats.activeBookings}
                </Typography>
                <Chip
                  label="1 Delivery Today"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255, 189, 0, 0.1)',
                    color: 'primary.main',
                    fontWeight: 500,
                  }}
                />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Available Cars Card */}
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <motion.div variants={itemVariants}>
            <Card sx={{ ...cardStyles, background: '#fff' }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Available Cars
                </Typography>
                <Typography variant="h4" sx={{ my: 1, fontWeight: 700 }}>
                  {mockStats.availableCars}
                </Typography>
                <Chip
                  label="1 In Maintenance"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    color: 'text.secondary',
                    fontWeight: 500,
                  }}
                />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Conversion Rate Card */}
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <motion.div variants={itemVariants}>
            <Card sx={{ ...cardStyles, background: '#fff' }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Conversion Rate
                </Typography>
                <Typography variant="h4" sx={{ my: 1, fontWeight: 700 }}>
                  {mockStats.conversionRate}%
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'success.main',
                  }}
                >
                  <Box
                    sx={{
                      display: 'inline-block',
                      width: 0,
                      height: 0,
                      borderLeft: '4px solid transparent',
                      borderRight: '4px solid transparent',
                      borderBottom: '6px solid',
                      color: 'success.main',
                      mr: 0.5,
                    }}
                  />
                  4.2% increase
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>;
      
      {/*  // ===================/Stats=================== */} 


      {/* // ================Recent Bookings Table ========= */}
      <motion.div variants={itemVariants}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Recent Bookings
        </Typography>
        <TableContainer 
          component={Paper} 
          sx={{ 
            mb: 4, 
            borderRadius: 2,
            // overflow: 'hidden'
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: 'rgba(57, 0, 153, 0.1)' }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Car</TableCell>
                <TableCell>Dates</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.slice(0, 5).map((booking) => (
                <TableRow 
                  key={booking.id}
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' }
                  }}
                >
                  <TableCell component="th" scope="row">
                    #{booking.id}
                  </TableCell>
                  <TableCell>{booking.customer}</TableCell>
                  <TableCell>{booking.car}</TableCell>
                  <TableCell>{booking.startDate} - {booking.endDate}</TableCell>
                  <TableCell>
                    <Chip 
                      label={booking.status} 
                      size="small" 
                      sx={{ 
                        bgcolor: booking.status === 'Active' 
                          ? 'rgba(25, 118, 210, 0.1)' 
                          : booking.status === 'Upcoming' 
                            ? 'rgba(255, 189, 0, 0.1)' 
                            : 'rgba(76, 175, 80, 0.1)',
                        color: booking.status === 'Active' 
                          ? '#1976d2' 
                          : booking.status === 'Upcoming' 
                            ? 'primary.main' 
                            : '#4caf50',
                        fontWeight: 500
                      }} 
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={booking.paymentStatus} 
                      size="small" 
                      sx={{ 
                        bgcolor: booking.paymentStatus === 'Paid' 
                          ? 'rgba(76, 175, 80, 0.1)' 
                          : 'rgba(255, 189, 0, 0.1)',
                        color: booking.paymentStatus === 'Paid' 
                          ? '#4caf50' 
                          : 'primary.main',
                        fontWeight: 500
                      }} 
                    />
                  </TableCell>
                  <TableCell align="right">${booking.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </motion.div>
      {/* // ================/Recent Bookings Table ========= */}


      {/* ======================Fleet Status=================== */}
      <Box sx={{ mb: 10 }}>
        <FleetStatus cars={cars} />
      </Box>
    
      {/* ======================Fleet Status=================== */}

    </motion.div>
  );

  {/* ======================Car Inventory=================== */}
  const renderInventory = () => (
    <AnimatePresence mode="wait">
      <motion.div
        key={tabValue}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 1, 
              fontWeight: 700, 
              '& .highlight': { color: 'primary.main' } 
            }}
          >
            Car <span className="highlight">Inventory</span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your fleet of luxury hypercars.
          </Typography>
        </Box>

        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            placeholder="Search cars..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
            }}
            sx={{ width: 300 }}
          />
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => handleCarDialogOpen()}
          >
            Add New Car
          </Button>
          <AddCar
            open={carDialogOpen}
            onClose={handleCarDialogClose}
            
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': { 
                fontWeight: 600, 
                fontSize: '0.9rem',
                py: 2,
                textTransform: 'none'
              },
              '& .Mui-selected': { color: 'primary.main' },
              '& .MuiTabs-indicator': { bgcolor: 'primary.main', height: 3 }
            }}
          >
            <Tab label="All Cars" />
            <Tab label="Available" />
            <Tab label="Rented" />
            <Tab label="Maintenance" />
          </Tabs>
        </Box>

        <TableContainer 
          component={Paper} 
          sx={{ 
            mb: 4, 
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: 'rgba(57, 0, 153, 0.1)' }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Make & Model</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Daily Rate</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCars.map((car) => (
                <TableRow 
                  key={car.id}
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' }
                  }}
                >
                  <TableCell>#{car.id}</TableCell>
                  <TableCell>
                    <Box
                      component="img"
                      src={car.image}
                      alt={`${car.make} ${car.model}`}
                      sx={{
                        width: 60,
                        height: 40,
                        objectFit: 'cover',
                        borderRadius: 1
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {car.make} {car.model}
                    </Typography>
                  </TableCell>
                  <TableCell>{car.year}</TableCell>
                  <TableCell>
                    <Chip 
                      label={car.status} 
                      size="small" 
                      sx={{ 
                        bgcolor: car.status === 'Available' 
                          ? 'rgba(76, 175, 80, 0.1)' 
                          : car.status === 'Rented' 
                            ? 'rgba(25, 118, 210, 0.1)' 
                            : 'rgba(255, 189, 0, 0.1)',
                        color: car.status === 'Available' 
                          ? '#4caf50' 
                          : car.status === 'Rented' 
                            ? '#1976d2' 
                            : 'primary.main',
                        fontWeight: 500
                      }} 
                    />
                  </TableCell>
                  <TableCell align="right">${car.dailyRate}/day</TableCell>
                  <TableCell align="center">
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => handleCarDialogOpen(car)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCars.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      No cars found matching your search.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </motion.div>
    </AnimatePresence>
  );
  {/* ======================/Car Inventory=================== */}

 {/* // ======================Bookings=================== */}
  const renderBookings = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 1, 
            fontWeight: 700, 
            '& .highlight': { color: 'primary.main' } 
          }}
        >
          Booking <span className="highlight">Management</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Track and manage all customer bookings.
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': { 
              fontWeight: 600, 
              fontSize: '0.9rem',
              py: 2,
              textTransform: 'none'
            },
            '& .Mui-selected': { color: 'primary.main' },
            '& .MuiTabs-indicator': { bgcolor: 'primary.main', height: 3 }
          }}
        >
          <Tab label="All Bookings" />
          <Tab label="Active" />
          <Tab label="Upcoming" />
          <Tab label="Completed" />
        </Tabs>
      </Box>

      <motion.div variants={itemVariants}>
        <TableContainer 
          component={Paper} 
          sx={{ 
            mb: 4, 
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: 'rgba(57, 0, 153, 0.1)' }}>
              <TableRow>
                <TableCell>Booking ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Car</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow 
                  key={booking.id}
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' }
                  }}
                >
                  <TableCell component="th" scope="row">
                    #{booking.id}
                  </TableCell>
                  <TableCell>{booking.customer}</TableCell>
                  <TableCell>{booking.car}</TableCell>
                  <TableCell>{booking.startDate}</TableCell>
                  <TableCell>{booking.endDate}</TableCell>
                  <TableCell>
                    <Chip 
                      label={booking.status} 
                      size="small" 
                      sx={{ 
                        bgcolor: booking.status === 'Active' 
                          ? 'rgba(25, 118, 210, 0.1)' 
                          : booking.status === 'Upcoming' 
                            ? 'rgba(255, 189, 0, 0.1)' 
                            : 'rgba(76, 175, 80, 0.1)',
                        color: booking.status === 'Active' 
                          ? '#1976d2' 
                          : booking.status === 'Upcoming' 
                            ? 'primary.main' 
                            : '#4caf50',
                        fontWeight: 500
                      }} 
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={booking.paymentStatus} 
                      size="small" 
                      sx={{ 
                        bgcolor: booking.paymentStatus === 'Paid' 
                          ? 'rgba(76, 175, 80, 0.1)' 
                          : 'rgba(255, 189, 0, 0.1)',
                        color: booking.paymentStatus === 'Paid' 
                          ? '#4caf50' 
                          : 'primary.main',
                        fontWeight: 500
                      }} 
                    />
                  </TableCell>
                  <TableCell align="right">${booking.amount.toLocaleString()}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" color="primary">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </motion.div>
    </motion.div>
  );
 {/* // ======================/Bookings=================== */}

  const renderSection = () => {
    switch (selectedSection) {
      case 'overview':
        return renderOverview();
      case 'inventory':
        return renderInventory();
      case 'bookings':
        return renderBookings();
      case 'customers':
        return (
          <motion.div variants={fadeInVariants} initial="hidden" animate="visible">
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>Customers</Typography>
            <Paper sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="body1" color="text.secondary">
                Customer management functionality would be implemented here.
              </Typography>
            </Paper>
          </motion.div>
        );
      case 'reports':
        return (
          <motion.div variants={fadeInVariants} initial="hidden" animate="visible">
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>Reports</Typography>
            <Paper sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="body1" color="text.secondary">
                Reporting and analytics functionality would be implemented here.
              </Typography>
            </Paper>
          </motion.div>
        );
      case 'settings':
        return (
          <motion.div variants={fadeInVariants} initial="hidden" animate="visible">
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>Settings</Typography>
            <Paper sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="body1" color="text.secondary">
                Admin settings functionality would be implemented here.
              </Typography>
            </Paper>
          </motion.div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '120vh',width:'100vw', bgcolor: '#f7f7f7' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${open ? drawerWidth : 64}px)` },
          ml: { md: `${open ? drawerWidth : 24}px` },
          backgroundColor: 'rgba(57, 0, 153, 0.97)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
          border:'1px solid red',
        }}
      >
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              display: { xs: 'block', md: 'none' },
              fontWeight: 700
            }}
          >
            Legendary Motorsports
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" sx={{ ml: 1 }}>
              <Badge badgeContent={7} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton sx={{ ml: 2 }}>
              <Avatar 
                src="https://i.pravatar.cc/150?img=8" 
                alt="Admin User" 
                sx={{ width: 32, height: 32 }} 
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: { xs: 0, md: open ? 10 : 10 },
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: { xs: 0, md: open ? drawerWidth : 64 },
            boxSizing: 'border-box',
            bgcolor: 'background.paper',
            border: 'none',
            boxShadow: '4px 0 20px rgba(0, 0, 0, 0.15)',
            overflowX: 'hidden',
            transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
          },
          display: { xs: 'none', md: 'block' }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'flex-end' : 'center',
            padding: 2,
            ...(!open && { justifyContent: 'center' }),
          }}
        >
          {open && (
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                flexGrow: 1, 
                fontWeight: 700,
                color: 'primary.main',
                ml: 1
              }}
            >
              Admin Panel
            </Typography>
          )}
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            {[
              { name: 'Overview', icon: <DashboardIcon />, id: 'overview' },
              { name: 'Car Inventory', icon: <DirectionsCarIcon />, id: 'inventory' },
              { name: 'Bookings', icon: <CalendarTodayIcon />, id: 'bookings' },
              { name: 'Customers', icon: <PeopleIcon />, id: 'customers' },
              { name: 'Reports', icon: <AssessmentIcon />, id: 'reports' },
            ].map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  onClick={() => handleSectionSelect(item.id)}
                  selected={selectedSection === item.id}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    position: 'relative',
                    '&::before': selectedSection === item.id ? {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 4,
                      height: '60%',
                      bgcolor: 'primary.main',
                      borderRadius: '0 4px 4px 0'
                    } : {},
                    '&.Mui-selected': {
                      bgcolor: 'rgba(255, 189, 0, 0.08)'
                    },
                    '&:hover': {
                      bgcolor: 'rgba(255, 189, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: selectedSection === item.id ? 'primary.main' : 'inherit'
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && (
                    <ListItemText 
                      primary={item.name} 
                      sx={{ 
                        opacity: open ? 1 : 0,
                        '& .MuiTypography-root': {
                          fontWeight: selectedSection === item.id ? 600 : 400
                        }
                      }} 
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <List>
            {[
              { name: 'Settings', icon: <SettingsIcon />, id: 'settings' },
              { name: 'Help & Support', icon: <HelpIcon />, id: 'help' },
              { name: 'Logout', icon: <LogoutIcon />, id: 'logout' },
            ].map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  onClick={() => handleSectionSelect(item.id)}
                  selected={selectedSection === item.id}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && (
                    <ListItemText 
                      primary={item.name} 
                      sx={{ opacity: open ? 1 : 0 }} 
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Drawer for mobile */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={toggleDrawer}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            bgcolor: 'background.paper',
            boxSizing: 'border-box',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 2,
          }}
        >
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 700,
              color: 'primary.main'
            }}
          >
            Admin Panel
          </Typography>
          <IconButton onClick={toggleDrawer}>
            {/* <CloseIcon /> */}
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            {[
              { name: 'Overview', icon: <DashboardIcon />, id: 'overview' },
              { name: 'Car Inventory', icon: <DirectionsCarIcon />, id: 'inventory' },
              { name: 'Bookings', icon: <CalendarTodayIcon />, id: 'bookings' },
              { name: 'Customers', icon: <PeopleIcon />, id: 'customers' },
              { name: 'Reports', icon: <AssessmentIcon />, id: 'reports' },
            ].map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  onClick={() => {
                    handleSectionSelect(item.id);
                    toggleDrawer();
                  }}
                  selected={selectedSection === item.id}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    position: 'relative',
                    '&::before': selectedSection === item.id ? {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 4,
                      height: '60%',
                      bgcolor: 'primary.main',
                      borderRadius: '0 4px 4px 0'
                    } : {},
                    '&.Mui-selected': {
                      bgcolor: 'rgba(255, 189, 0, 0.08)'
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: selectedSection === item.id ? 'primary.main' : 'inherit'
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.name} 
                    sx={{ 
                      '& .MuiTypography-root': {
                        fontWeight: selectedSection === item.id ? 600 : 400
                      }
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <List>
            {[
              { name: 'Settings', icon: <SettingsIcon />, id: 'settings' },
              { name: 'Help & Support', icon: <HelpIcon />, id: 'help' },
              { name: 'Logout', icon: <LogoutIcon />, id: 'logout' },
            ].map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  onClick={() => {
                    handleSectionSelect(item.id);
                    toggleDrawer();
                  }}
                  selected={selectedSection === item.id}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                  }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: 10,
          pb: 6,
          width: { md: `calc(100% - ${open ? drawerWidth : 64}px)` },
          ml: { md: `${open ? drawerWidth : 64}px` },
          transition: 'margin-left 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
          bgcolor: '#f7f7f7',
          overflow: 'auto',
          minHeight: '100vh',
          maxWidth: '100vw'
        }}
      >
        {renderSection()}
      </Box>

      {/* Add/Edit Car Dialog */}
      <Dialog 
        open={carDialogOpen} 
        onClose={handleCarDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editMode ? 'Edit Car Details' : 'Add New Car'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            {editMode 
              ? 'Update the details for this car in your inventory.' 
              : 'Fill out the information below to add a new car to your fleet.'}
          </DialogContentText>
          <Grid container spacing={3}>
            <Grid size={{xs:12, sm:6}}>
              <TextField
                label="Make"
                fullWidth
                margin="normal"
                defaultValue={selectedCar?.make || ''}
              />
            </Grid>
            <Grid size={{xs:12, sm:6}}>
              <TextField
                label="Model"
                fullWidth
                margin="normal"
                defaultValue={selectedCar?.model || ''}
              />
            </Grid>
            <Grid size={{xs:12, sm:6}}>
              <TextField
                label="Year"
                fullWidth
                margin="normal"
                type="number"
                defaultValue={selectedCar?.year || ''}
              />
            </Grid>
            <Grid size={{xs:12, sm:6}}>
              <TextField
                label="Daily Rate"
                fullWidth
                margin="normal"
                type="number"
                defaultValue={selectedCar?.dailyRate || ''}
                InputProps={{
                  startAdornment: <Box component="span" sx={{ mr: 1 }}>$</Box>
                }}
              />
            </Grid>
            <Grid size={{xs:12, sm:6}}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  defaultValue={selectedCar?.status || 'Available'}
                >
                  <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="Rented">Rented</MenuItem>
                  <MenuItem value="Maintenance">Maintenance</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{xs:12, sm:6}}>
              <TextField
                label="Image URL"
                fullWidth
                margin="normal"
                defaultValue={selectedCar?.image || ''}
              />
            </Grid>
            <Grid size={{xs:12}}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Featured Car"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCarDialogClose}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleCarSubmit}
            color="primary"
          >
            {editMode ? 'Save Changes' : 'Add Car'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;