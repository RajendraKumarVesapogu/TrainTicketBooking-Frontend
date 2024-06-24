import axios from 'axios';

const API = axios.create({ baseURL: 'http://127.0.0.1:8000/api/' }); // Adjust the baseURL to match your Django server
const token = localStorage.getItem('token');
if (token) {
  API.defaults.headers.common['Authorization'] = `token ${token}`;
}

export const adminLogin = (data) => API.post('/adminlogin/', data);
export const userLogin = (data) => API.post('/login/', data);
export const userLogout = () => API.post('/logout/');
export const registerUser = (data) => API.post('/register/', data);
export const getUser = () => API.get('/user/');
export const testToken = () => API.get('/test_token/');

// Route, Train, Schedule, Station, Seat, Ticket, Payment, Halt
export const fetchRoutes = () => API.get('/routes/');
export const fetchRouteDetails = (id) => API.get(`/routes/${id}/`);
export const fetchSchedules = () => API.get('/schedules/');
export const fetchScheduleDetails = (id) => API.get(`/schedules/${id}/`);
export const fetchTrains = () => API.get('/trains/');
export const fetchTrainDetails = (id) => API.get(`/trains/${id}/`);
export const fetchStations = () => API.get('/stations/');
export const fetchStationDetails = (id) => API.get(`/stations/${id}/`);
export const fetchSeats = () => API.get('/seats/');
export const fetchSeatDetails = (id) => API.get(`/seats/${id}/`);
export const fetchTickets = () => API.get('/tickets/');
export const fetchTicketDetails = (id) => API.get(`/tickets/${id}/`);
export const fetchPayments = () => API.get('/payments/');
export const fetchPaymentDetails = (id) => API.get(`/payments/${id}/`);
export const fetchHalts = () => API.get('/halts/');
export const fetchHaltDetails = (id) => API.get(`/halts/${id}/`);

// Custom Views
export const getTrainsByRoute = (data) => API.post('/trains/route/', data);
export const getTrainDetails = (train_no) => API.get(`/train/details/${train_no}/`);
export const getAvailableSeats = (train_no) => API.get(`/train/available-seats/${train_no}/`);
export const bookTicket = (train_no, data) => API.post(`/train/book-ticket/${train_no}/`, data);
export const cancelTicket = (train_no, ticket_id) => API.post(`/train/cancel-ticket/${train_no}/${ticket_id}/`);
export const listUserTickets = () => API.get('/tickets/');
export const getUserTicketDetails = (train_no, ticket_id) => API.get(`/tickets/${train_no}/${ticket_id}/`);
export const makePayment = (train_no, ticket_id, data) => API.post(`/tickets/${train_no}/${ticket_id}/make-payment/`, data);
export const getPaymentDetails = (train_no, ticket_id) => API.get(`/tickets/${train_no}/${ticket_id}/payment-details/`);
export const listHaltsForTrain = (train_no) => API.get(`/trains/${train_no}/halts/`);
export const listTrainsForStation = (station_id) => API.get(`/stations/${station_id}/trains/`);
