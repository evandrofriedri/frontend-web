import Api from './Api';

export default {
  /**
   * Metodo para listar todos os endereços
   * GET
   */
  async getAddresses() {
    try {
      const response = await Api().get('/addresses');
      return response.data;
    } catch (error) {
      return false;
    }
  },

  /**
   * Metodo para criar novo endereço
   * POST
   */
  async createAddress(address) {
    try {
      const response = await Api().post('/addresses', address);
      return response.data;
    } catch (error) {
      return false;
    }
  },

  /**
   * Metodo para listar endereço por contaID
   * GET
   */
  async getAddressID(id) {
    try {
      const response = await Api().get(`/addresses/${id}`);
      return response.data;
    } catch (error) {
      return false;
    }
  },

   /**
   * Metodo para listar endereço da contaID por nome
   * GET
   */
   async getAddressName(params) {
    try {
      const response = await Api().get(`/addresses/search/${params}`);
      return response.data;
    } catch (error) {
      return false;
    }
  },

  /**
   * Metodo para listar endereço padrão por contaID
   * GET
   */
  async getFavoriteAddressID(id) {
    try {
      const response = await Api().get(`/addresses/unique/${id}`);
      return response.data;
    } catch (error) {
      return false;
    }
  },

  /**
   * Metodo para atualizar endereço por ID
   * PUT
   */
  async updateAddress(address) {
    try {
      const id = address.address_id;
      const response = await Api().put(`/addresses/${id}`, address);
      return response.data;
    } catch (error) {
      return false;
    }
  },
  /**
   * Metodo para excluir endereço por ID
   * DELETE
   */
  async deleteAddress(id) {
    try {
      const response = await Api().delete(`/addresses/${id}`);
      return response.data;
    } catch (error) {
      return false;
    }
  },

};
