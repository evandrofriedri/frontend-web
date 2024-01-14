import Api from './Api';

export default {
  /**
   * Metodo para listar todos os status
   * GET
   */
  async getStatuses() {
    try {
      const response = await Api().get('/statuses');
      return response.data;
    } catch (error) {
      return false;
    }
  },

  /**
   * Metodo para criar novo status
   * POST
   */
  async createStatus(status) {
    try {
      const response = await Api().post('/statuses', status);
      return response.data;
    } catch (error) {
      return false;
    }
  },

  /**
   * Metodo para listar status por ID
   * GET
   */
  async getStatusID(id) {
    try {
      const response = await Api().get(`/statuses/${id}`);
      return response.data;
    } catch (error) {
      return false;
    }
  },

  /**
   * Metodo para atualizar status por ID
   * PUT
   */
  async updateStatus(status) {
    try {
      const id = status.status_id;
      const response = await Api().put(`/statuses/${id}`, status);
      return response.data;
    } catch (error) {
      return false;
    }
  },
  /**
   * Metodo para excluir status por ID
   * DELETE
   */
  async deleteStatus(id) {
    try {
      const response = await Api().delete(`/statuses/${id}`);
      return response.data;
    } catch (error) {
      return false;
    }
  },

};
