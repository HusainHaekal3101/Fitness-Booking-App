import axios from "axios";

const BookingList = ({ bookings, onBookingSuccess }) => {
    const deleteBooking = async (id) => {
        if (window.confirm("Delete this booking?")) {
            await axios.delete(`https://1762d50c-449e-4843-b275-9dd754e42424-00-3vee5g0j07kp2.pike.replit.dev/bookings/${id}`);
            if (onBookingSuccess) {
                onBookingSuccess();
            }
        }
    };

    return (
        <div>
            <h4 className="mb-3">📋 All Bookings</h4>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Trainer</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td>{booking.id}</td>
                            <td>{booking.title}</td>
                            <td>{booking.date}</td>
                            <td>{booking.time}</td>
                            <td>{booking.email}</td>
                            <td>{booking.phone_number}</td>
                            <td>{booking.instructor}</td>
                            <td>
                                <button onClick={() => deleteBooking(booking.id)} className="btn btn-danger btn-sm">
                                    🗑 Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingList;
