// Role-based access control
const sellerCheck = (req, res, next) => {
  if (req.user.role !== 'seller') return res.status(403).json({ error: "Seller access denied" });
  next();
};

const adminCheck = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: "Admin access denied" });
  next();
};