const express = require('express');
const router = express.Router();
const hypercar = require('../models/hypercarSchema');

router.post('/add', async (req, res) => {
    //const { make, model, year, description, images, specification, availability } = req.body;
    try {
      //const newCar = new hypercar({ make, model, year, description, images, specification, availability});
      const newCar = new hypercar(req.body);
      const savedCar = await newCar.save();
      res.json(savedCar);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  

  router.get('/:id', async (req, res)=>{
     try{
        const  carId  = req.params.id;
        console.log('carid: ' + carId)
        const car = await hypercar.findById(carId);
        if(!car){
           return res.status(404).json({msg: 'Hypercar with given id not found'})
        }
        res.json(car);
        }catch(err){
              console.error(err.message);
              if(err.kind === 'ObjectId'){
                  return res.status(404).json({msg: 'Hypercar with given id not found'})
              }
              res.status(500).send('Server Error');
          }


     }
    );

    router.get('/', async (req, res) => {
        try {
            const cars = await hypercar.find(); // Fetch all cars from the database
            res.json(cars); // Send the cars as a JSON response
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error'); // Handle server errors
        }
    });
    

//export

module.exports = router;