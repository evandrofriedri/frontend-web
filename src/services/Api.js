/* Responsavel por inicializar o axios e as requisições da url do HTTPS
*/

import axios from 'axios';
console.log('PASSSOU NO AXIOSS');
export default () => axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
});
