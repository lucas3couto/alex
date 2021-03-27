import axios from 'axios';

// const url = 'https://enigmatic-shore-43701.herokuapp.com/sistema';

const url = 'http://localhost:3333/sistema';

const api = axios.create({
  baseURL: url,
  headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
  },
});

export default api;
