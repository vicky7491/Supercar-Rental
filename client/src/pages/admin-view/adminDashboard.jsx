function AdminApprovalPanel() {
  const [pendingCars, setPendingCars] = useState([]);

  useEffect(() => {
    const fetchPendingCars = async () => {
      const res = await axios.get('/api/admin/pending-cars');
      setPendingCars(res.data);
    };
    fetchPendingCars();
  }, []);

  const handleApprove = async (carId) => {
    try {
      await axios.patch(`/api/admin/approve-car/${carId}`);
      setPendingCars(pendingCars.filter(car => car._id !== carId));
    } catch (err) {
      alert('Approval failed');
    }
  };

  return (
    <div className="admin-panel">
      <h2>Pending Approvals</h2>
      <table>
        <thead>
          <tr>
            <th>Car</th>
            <th>Price</th>
            <th>Seller</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingCars.map(car => (
            <tr key={car._id}>
              <td>{car.make} {car.model}</td>
              <td>₹{car.pricePerDay}/day</td>
              <td>{car.seller.name}</td>
              <td>
                <button onClick={() => handleApprove(car._id)}>Approve</button>
                <button onClick={() => handleReject(car._id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}