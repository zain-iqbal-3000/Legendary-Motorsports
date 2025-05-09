import { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, Chip, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { motion } from 'framer-motion';
import axios from 'axios';
import AddCar from './components/AddCar';
import FleetStatus from './components/FleetStatus';
import RecentBookings from './components/RecentBookings';

// Mock data
const mockBookings = [
  { id: 101, customer: 'John Smith', car: 'Ferrari SF90 Stradale', startDate: '2023-06-15', endDate: '2023-06-18', status: 'Active', paymentStatus: 'Paid', amount: 10497 },
  { id: 102, customer: 'Emily Johnson', car: 'Porsche 911 GT2 RS', startDate: '2023-06-20', endDate: '2023-06-22', status: 'Upcoming', paymentStatus: 'Paid', amount: 4798 },
  { id: 103, customer: 'Michael Williams', car: 'Lamborghini Aventador SVJ', startDate: '2023-06-10', endDate: '2023-06-12', status: 'Completed', paymentStatus: 'Paid', amount: 5998 },
  { id: 104, customer: 'Sophia Brown', car: 'McLaren 720S', startDate: '2023-06-05', endDate: '2023-06-10', status: 'Completed', paymentStatus: 'Paid', amount: 13995 },
  { id: 105, customer: 'James Davis', car: 'Bugatti Chiron', startDate: '2023-06-25', endDate: '2023-06-27', status: 'Upcoming', paymentStatus: 'Pending', amount: 9998 }
];

const mockStats = {
  totalRevenue: 145286,
  activeBookings: 1,
  availableCars: 3,
  conversionRate: 68,
  monthlyGrowth: 12.5
};

const cardStyles = {
  height: '100%',
  borderRadius: 2,
  bgcolor: '#23252B',
  color: '#FFD700',
  boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
  border: '1px solid #23252B'
};

const Dashboard = () => {
  const [carDialogOpen, setCarDialogOpen] = useState(false);
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState(mockBookings);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('/api/cars');
        setCars(response.data);
      } catch (error) {
        // fallback: keep cars empty or use mock data if desired
      }
    };
    fetchCars();
  }, []);

  const handleCarDialogOpen = () => setCarDialogOpen(true);
  const handleCarDialogClose = () => setCarDialogOpen(false);
  const handleCarSubmit = (carData) => {
    setCarDialogOpen(false);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#181A20', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h4"
          sx={{
            mb: 1,
            fontWeight: 700,
            color: '#FFD700',
            letterSpacing: 0.5,
          }}
        >
          Dashboard
        </Typography>
        <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
          Welcome back. Here's what's happening with your fleet today.
        </Typography>
      </Box>

      {/* Add Car Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCarDialogOpen}
          sx={{
            bgcolor: '#FFD700',
            color: '#23252B',
            fontWeight: 700,
            borderRadius: 2,
            boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
            '&:hover': { bgcolor: '#ffe066' }
          }}
        >
          Add New Car
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 1 }}>
        {/* Total Revenue */}
        <Grid item xs={12} md={6} lg={3}>
          <motion.div variants={itemVariants}>
            <Card sx={{ ...cardStyles, borderTop: '4px solid #FFD700' }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ color: '#FFD700', opacity: 0.85 }}>
                  Total Revenue
                </Typography>
                <Typography variant="h4" sx={{ my: 1, fontWeight: 700, color: '#FFD700', opacity: 0.95 }}>
                  ${mockStats.totalRevenue.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                  {mockStats.monthlyGrowth}% from last month
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        {/* Active Bookings */}
        <Grid item xs={12} md={6} lg={3}>
          <motion.div variants={itemVariants}>
            <Card sx={{ ...cardStyles, borderTop: '4px solid #3B82F6' }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ color: '#3B82F6', opacity: 0.85 }}>
                  Active Bookings
                </Typography>
                <Typography variant="h4" sx={{ my: 1, fontWeight: 700, color: '#fff', opacity: 0.95 }}>
                  {mockStats.activeBookings}
                </Typography>
                <Chip
                  label="1 Delivery Today"
                  size="small"
                  sx={{
                    bgcolor: '#232C38',
                    color: '#FFD700',
                    fontWeight: 600,
                  }}
                />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        {/* Available Cars */}
        <Grid item xs={12} md={6} lg={3}>
          <motion.div variants={itemVariants}>
            <Card sx={{ ...cardStyles, borderTop: '4px solid #21bf06' }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ color: '#21bf06', opacity: 0.85 }}>
                  Available Cars
                </Typography>
                <Typography variant="h4" sx={{ my: 1, fontWeight: 700, color: '#fff', opacity: 0.95 }}>
                  {mockStats.availableCars}
                </Typography>
                <Chip
                  label="1 In Maintenance"
                  size="small"
                  sx={{
                    bgcolor: '#23252B',
                    color: '#FFD700',
                    fontWeight: 600,
                  }}
                />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        {/* Conversion Rate */}
        <Grid item xs={12} md={6} lg={3}>
          <motion.div variants={itemVariants}>
            <Card sx={{ ...cardStyles, borderTop: '4px solid #FFD700' }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ color: '#FFD700', opacity: 0.85 }}>
                  Conversion Rate
                </Typography>
                <Typography variant="h4" sx={{ my: 1, fontWeight: 700, color: '#fff', opacity: 0.95 }}>
                  {mockStats.conversionRate}%
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#21bf06',
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
                      color: '#21bf06',
                      mr: 0.5,
                    }}
                  />
                  4.2% increase
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Recent Bookings */}
      <motion.div variants={itemVariants}>
        {/* <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#FFD700' }}>
          Recent Bookings
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            mb: 4,
            borderRadius: 2,
            bgcolor: '#23252B',
            boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: '#23252B' }}>
                <TableCell sx={{ color: '#FFD700', fontWeight: 700 }}>ID</TableCell>
                <TableCell sx={{ color: '#FFD700', fontWeight: 700 }}>Customer</TableCell>
                <TableCell sx={{ color: '#FFD700', fontWeight: 700 }}>Car</TableCell>
                <TableCell sx={{ color: '#FFD700', fontWeight: 700 }}>Dates</TableCell>
                <TableCell sx={{ color: '#FFD700', fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ color: '#FFD700', fontWeight: 700 }}>Payment</TableCell>
                <TableCell align="right" sx={{ color: '#FFD700', fontWeight: 700 }}>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.slice(0, 5).map((booking) => (
                <TableRow key={booking.id} sx={{ bgcolor: '#23252B' }}>
                  <TableCell sx={{ color: '#fff', opacity: 0.87 }}>#{booking.id}</TableCell>
                  <TableCell sx={{ color: '#fff', opacity: 0.87 }}>{booking.customer}</TableCell>
                  <TableCell sx={{ color: '#fff', opacity: 0.87 }}>{booking.car}</TableCell>
                  <TableCell sx={{ color: '#fff', opacity: 0.87 }}>
                    {booking.startDate} - {booking.endDate}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={booking.status}
                      size="small"
                      sx={{
                        bgcolor:
                          booking.status === 'Active'
                            ? '#3B82F6'
                            : booking.status === 'Upcoming'
                            ? '#FFD700'
                            : '#21bf06',
                        color:
                          booking.status === 'Upcoming'
                            ? '#23252B'
                            : '#fff',
                        fontWeight: 600
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={booking.paymentStatus}
                      size="small"
                      sx={{
                        bgcolor:
                          booking.paymentStatus === 'Paid'
                            ? '#21bf06'
                            : '#FFD700',
                        color:
                          booking.paymentStatus === 'Paid'
                            ? '#fff'
                            : '#23252B',
                        fontWeight: 600
                      }}
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ color: '#fff', opacity: 0.87 }}>
                    ${booking.amount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
        <RecentBookings bookings={bookings} />
      </motion.div>

      {/* Fleet Status */}
      <Box sx={{ mb: 10 }}>
        <FleetStatus cars={cars} />
      </Box>

      {/* Add Car Dialog */}
      <AddCar
        open={carDialogOpen}
        onClose={handleCarDialogClose}
        onSubmit={handleCarSubmit}
      />
    </Box>
  );
};

export default Dashboard;
