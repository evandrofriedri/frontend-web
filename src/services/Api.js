/* Responsavel por inicializar o axios e as requisições da url do HTTPS
*/

import axios from 'axios';

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
export default () => axios.create({
  // baseurl do back com o front
  baseURL: 'http://127.0.0.1:3000/api',
});
