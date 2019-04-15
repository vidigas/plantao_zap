import axios from 'axios';

export const getUser = (phone) => {
  return axios.get(`http://localhost:8080/users/${phone}`);
};

export const createUser = (phone, role) => {
	const data = { phone, role}
	return axios.post('http://localhost:8080/users', data);
}


export const getPrices = (id, items) => {
  return axios.put(`/customers/${id}/prices`, items);
}