router.post('/list-car', auth, sellerCheck, async (req, res) => {
  try {
    const car = new Car({
      ...req.body,
      seller: req.user.id,
      location: {
        type: 'Point',
        coordinates: [req.body.longitude, req.body.latitude]
      }
    });
    await car.save();
    res.status(201).send(car);
  } catch (err) {
    res.status(400).send({ error: 'Listing failed' });
  }
});

router.get('/my-listings', auth, sellerCheck, async (req, res) => {
  try {
    const listings = await Car.find({ seller: req.user.id });
    res.send(listings);
  } catch (err) {
    res.status(500).send();
  }
});