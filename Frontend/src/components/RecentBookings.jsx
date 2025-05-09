import {
    Typography, TableContainer, Paper, Table, TableHead, TableRow,
    TableCell, TableBody, Chip
  } from '@mui/material';
  
  const RecentBookings = ({ bookings }) => (
    <>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#FFD700' }}>
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
        </TableContainer>
    </>
  );
  
  export default RecentBookings;
  