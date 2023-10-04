import Api from './Api';

export default {
  /**
   * Metodo para listar configuração Id
   * GET
   */
  async getConfigurationID(id) {
    try {
      const response = await Api().get(`/configurations/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

};
