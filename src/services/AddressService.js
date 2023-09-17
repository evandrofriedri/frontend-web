// import Api from './Api';

// export default {
//   /**
//    * Metodo para listar todos os endereços
//    * GET
//    */
//   async getAddresses() {
//     try {
//       const response = await Api().get('/addresses');
//       return response.data;
//     } catch (error) {
//       console.log(error);
//     }
//   },

//   /**
//    * Metodo para criar novo endereço
//    * POST
//    */
//   async createAddress(address) {
//     try {
//       const response = await Api().post('/addresses', address);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//     }
//   },

//   /**
//    * Metodo para listar endereço por ID
//    * GET
//    */
//   async getAddressID(id) {
//     try {
//       const response = await Api().get(`/addresses/${id}`);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//     }
//   },

//   /**
//    * Metodo para listar endereço por ID
//    * PUT
//    */
//   async updateAddress(id) {
//     try {
//       const response = await Api().put(`/addresses/${id}`);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//     }
//   },
//   /**
//    * Metodo para excluir endereço por ID
//    * DELETE
//    */
//   async deleteAddress(id) {
//     try {
//       const response = await Api().delete(`/addresses/${id}`);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//     }
//   },

// };
