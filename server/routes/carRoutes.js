import express from 'express';
import Car from '../models/Car.js'; // Your existing schema
import authenticate from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Create new car listing (protected route)
router.post('/',
  authenticate,
  [
    body('make').notEmpty().withMessage('Make is required'),
    body('model').notEmpty().withMessage('Model is required'),
    body('year').isInt({ min: 2000 }).withMessage('Invalid year'),
    body('pricePerDay').isFloat({ min: 1 }).withMessage('Invalid price'),
    body('location.coordinates').isArray({ min: 2, max: 2 }),
    body('images').isArray({ min: 1 }).withMessage('At least 1 image required')
  ],
  async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Automatically set seller to logged-in user
      const newCar = new Car({
        ...req.body,
        seller: req.user.id // From auth middleware
      });

      await newCar.save();
      res.status(201).json(newCar);
    } catch (err) {
      res.status(500).json({ error: 'Server error: ' + err.message });
    }
  }
);

export default router;