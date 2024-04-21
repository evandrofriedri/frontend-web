import Api from './Api';

export default {
  /**
   * Metodo para buscar estatísticas
   * GET
   */
  async getStats(params) {
    try {
      const response = await Api().get(`/statistics/${params}`);
      return response.data;
    } catch (error) {
      return false;
    }
  },
};
