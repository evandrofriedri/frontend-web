/* Responsavel por inicializar o axios e as requisições da url do HTTPS
*/

import axios from 'axios';
export default () => axios.create({
  baseURL: 'http://127.0.0.1:3000/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
});
