import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  Box,
} from '@mui/material';
import axios from 'axios';

const AddCar = ({ open, onClose, editMode, selectedCar }) => {
  const [carData, setCarData] = useState({
    make: selectedCar?.make || '',
    model: selectedCar?.model || '',
    year: selectedCar?.year || '',
    description: selectedCar?.description || '',
    images: selectedCar?.images || '',
    dailyRate: selectedCar?.dailyRate || '',
    weeklyRate: selectedCar?.weeklyRate || '',
    monthlyRate: selectedCar?.monthlyRate || '',
    status: selectedCar?.status || 'Available',
    engineType: selectedCar?.specifications?.engine?.type || '',
    engineDisplacement: selectedCar?.specifications?.engine?.displacement || '',
    engineHorsepower: selectedCar?.specifications?.engine?.horsepower || '',
    engineTorque: selectedCar?.specifications?.engine?.torque || '',
    engineTransmission: selectedCar?.specifications?.engine?.transmission || '',
    engineDrivetrain: selectedCar?.specifications?.engine?.drivetrain || '',
    topSpeed: selectedCar?.specifications?.performance?.topSpeed || '',
    zeroToSixty: selectedCar?.specifications?.performance?.zeroToSixty || '',
    quarterMile: selectedCar?.specifications?.performance?.quarterMile || '',
    nurburgringTime: selectedCar?.specifications?.performance?.nürburgringTime || '',
    length: selectedCar?.specifications?.dimensions?.length || '',
    width: selectedCar?.specifications?.dimensions?.width || '',
    height: selectedCar?.specifications?.dimensions?.height || '',
    wheelbase: selectedCar?.specifications?.dimensions?.wheelbase || '',
    curbWeight: selectedCar?.specifications?.dimensions?.curbWeight || '',
    location: selectedCar?.availability?.location || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/cars/add', {
        make: carData.make,
        model: carData.model,
        year: carData.year,
        description: carData.description,
        images: carData.images.split(','), // Convert comma-separated string to array
        specifications: {
          engine: {
            type: carData.engineType || '',
            displacement: carData.engineDisplacement || '',
            horsepower: parseInt(carData.engineHorsepower) || 0,
            torque: parseInt(carData.engineTorque) || 0,
            transmission: carData.engineTransmission || '',
            drivetrain: carData.engineDrivetrain || '',
          },
          performance: {
            topSpeed: parseInt(carData.topSpeed) || 0,
            zeroToSixty: parseFloat(carData.zeroToSixty) || 0,
            quarterMile: parseFloat(carData.quarterMile) || 0,
            nürburgringTime: parseFloat(carData.nurburgringTime) || 0,
          },
          dimensions: {
            length: parseInt(carData.length) || 0,
            width: parseInt(carData.width) || 0,
            height: parseInt(carData.height) || 0,
            wheelbase: parseInt(carData.wheelbase) || 0,
            curbWeight: parseInt(carData.curbWeight) || 0,
          },
        },
        availability: {
          isAvailable: carData.status === 'Available',
          location: carData.location || '',
          rentalPrice: {
            daily: parseFloat(carData.dailyRate) || 0,
            weekly: parseFloat(carData.weeklyRate) || 0,
            monthly: parseFloat(carData.monthlyRate) || 0,
          },
        },
      });

      alert('Car added successfully!');
      console.log('Response:', response.data);
      onClose(); // Close the dialog
    } catch (error) {
      console.error('Error adding car:', error);
      alert('Failed to add car. Please try again.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{editMode ? 'Edit Car Details' : 'Add New Car'}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 3 }}>
          {editMode
            ? 'Update the details for this car in your inventory.'
            : 'Fill out the information below to add a new car to your fleet.'}
        </DialogContentText>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Make"
              name="make"
              fullWidth
              margin="normal"
              value={carData.make}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Model"
              name="model"
              fullWidth
              margin="normal"
              value={carData.model}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Year"
              name="year"
              fullWidth
              margin="normal"
              type="number"
              value={carData.year}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Daily Rate"
              name="dailyRate"
              fullWidth
              margin="normal"
              type="number"
              value={carData.dailyRate}
              onChange={handleChange}
              InputProps={{
                startAdornment: <Box component="span" sx={{ mr: 1 }}>$</Box>,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Weekly Rate"
              name="weeklyRate"
              fullWidth
              margin="normal"
              type="number"
              value={carData.weeklyRate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Monthly Rate"
              name="monthlyRate"
              fullWidth
              margin="normal"
              type="number"
              value={carData.monthlyRate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              name="description"
              fullWidth
              margin="normal"
              value={carData.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Images (comma-separated URLs)"
              name="images"
              fullWidth
              margin="normal"
              value={carData.images}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Engine Type"
              name="engineType"
              fullWidth
              margin="normal"
              value={carData.engineType}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Engine Displacement"
              name="engineDisplacement"
              fullWidth
              margin="normal"
              value={carData.engineDisplacement}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Horsepower"
              name="engineHorsepower"
              fullWidth
              margin="normal"
              type="number"
              value={carData.engineHorsepower}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Torque"
              name="engineTorque"
              fullWidth
              margin="normal"
              type="number"
              value={carData.engineTorque}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Transmission"
              name="engineTransmission"
              fullWidth
              margin="normal"
              value={carData.engineTransmission}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Drivetrain"
              name="engineDrivetrain"
              fullWidth
              margin="normal"
              value={carData.engineDrivetrain}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Top Speed (mph)"
              name="topSpeed"
              fullWidth
              margin="normal"
              type="number"
              value={carData.topSpeed}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="0-60 mph (seconds)"
              name="zeroToSixty"
              fullWidth
              margin="normal"
              type="number"
              value={carData.zeroToSixty}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Quarter Mile (seconds)"
              name="quarterMile"
              fullWidth
              margin="normal"
              type="number"
              value={carData.quarterMile}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nürburgring Time (minutes)"
              name="nurburgringTime"
              fullWidth
              margin="normal"
              type="number"
              value={carData.nurburgringTime}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Length (mm)"
              name="length"
              fullWidth
              margin="normal"
              type="number"
              value={carData.length}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Width (mm)"
              name="width"
              fullWidth
              margin="normal"
              type="number"
              value={carData.width}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Height (mm)"
              name="height"
              fullWidth
              margin="normal"
              type="number"
              value={carData.height}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Wheelbase (mm)"
              name="wheelbase"
              fullWidth
              margin="normal"
              type="number"
              value={carData.wheelbase}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Curb Weight (kg)"
              name="curbWeight"
              fullWidth
              margin="normal"
              type="number"
              value={carData.curbWeight}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Location"
              name="location"
              fullWidth
              margin="normal"
              value={carData.location}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} color="primary">
          {editMode ? 'Save Changes' : 'Add Car'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCar;