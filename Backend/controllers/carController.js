const addCar = async (req, res) => {
    try {
      //const newCar = new hypercar({ make, model, year, description, images, specification, availability});
      const newCar = new hypercar(req.body);
      const savedCar = await newCar.save();
      res.json(savedCar);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
  
const getCarById = async (req, res)=>{
try{
    const  carId  = req.params.id;
    console.log('carid: ' + carId)
    const car = await hypercar.findById(carId);
    console.log(res.json)
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
const getAllCars = async (req, res) => {
    try {
        const cars = await hypercar.find(); // Fetch all cars
        res.json(cars); // Send the cars as a JSON response
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

  
const editCarData = async (req, res)=>{
    try{
        const  carId  = req.params.id;
        const car = await hypercar.findByIdAndUpdate(carId, req.body, {new: true, runValidators: true});
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

const deleteCar = async (req, res)=>{
    try{
        const  carId  = req.params.id;
        const car = await hypercar.findByIdAndDelete(carId);
        if(!car){
        return res.status(404).json({msg: 'Hypercar with given id not found'})
        }
        res.json({msg: 'Hypercar deleted'});
        }catch(err){
            console.error(err.message);
            if(err.kind === 'ObjectId'){
                return res.status(404).json({msg: 'Hypercar with given id not found'})
            }
            res.status(500).send('Server Error');
        }
    }

module.exports = { addCar, getCarById, editCarData, deleteCar, getAllCars}