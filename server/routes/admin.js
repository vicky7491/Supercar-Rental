router.patch('/approve-car/:id', auth, adminCheck, async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    // Send notification to seller
    sendApprovalEmail(car.seller.email);
    res.send(car);
  } catch (err) {
    res.status(400).send();
  }
});