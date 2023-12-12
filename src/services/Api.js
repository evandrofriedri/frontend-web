/* Responsavel por inicializar o axios e as requisições da url do HTTPS
*/

import axios from 'axios';
export default () => axios.create({
  baseURL: 'https://deliveryapi.vercel.app/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
});
