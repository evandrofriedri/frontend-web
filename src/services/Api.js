/* Responsavel por inicializar o axios e as requisições da url do HTTPS
*/

import axios from 'axios';
export default () => axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`,
  },
});
