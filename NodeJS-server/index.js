const express = require('express');
const app = express();
app.use(express.json());

let cars = [
    { id: 1, brand: 'Toyota' },
    { id: 2, brand: 'Ford' },
    { id: 3, brand: 'Honda' },
    { id: 4, brand: 'Nissan' },
    { id: 5, brand: 'Chevrolet' },
    { id: 6, brand: 'Volkswagen' },
    { id: 7, brand: 'BMW' },
    { id: 8, brand: 'Mercedes-Benz' }
];
// GET all cars
app.get('/cars', (req, res) => {
    res.json(cars);
});

// GET a single car by id
app.get('/cars/:id', (req, res) => {
    const car = cars.find(c => c.id === parseInt(req.params.id));
    if (!car) return res.status(404).send('Car not found');
    res.json(car);
});

// POST a new car
app.post('/cars', (req, res) => {
    const newCar = { id: cars.length + 1, brand: req.body.brand };
    cars.push(newCar);
    res.status(201).json(newCar);
});

// PUT update a car by id
app.put('/cars/:id', (req, res) => {
    const car = cars.find(c => c.id === parseInt(req.params.id));
    if (!car) return res.status(404).send('Car not found');
    car.brand = req.body.brand;
    res.json(car);
});

// DELETE a car by id
app.delete('/cars/:id', (req, res) => {
    const car = cars.find(c => c.id === parseInt(req.params.id));
    if (!car) return res.status(404).send('Car not found');
    cars = cars.filter(c => c.id !== parseInt(req.params.id));
    res.send('Car deleted');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
