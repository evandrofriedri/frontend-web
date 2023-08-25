/* Responsavel por inicializar o axios e as requisições da url do HTTPS
*/

import axios from 'axios';

export default () => axios.create({
  // baseurl do back com o front
  baseURL: 'http:localhost:3000/api',
});
