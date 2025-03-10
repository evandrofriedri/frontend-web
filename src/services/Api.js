/* Responsavel por inicializar o axios e as requisições da url do HTTPS
*/

import axios from 'axios';
export default () => axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt') !== null ? JSON.parse(localStorage.getItem('jwt')).value : null}`,
  },
});
