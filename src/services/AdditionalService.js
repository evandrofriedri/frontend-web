import Api from './Api';

export default {
  /**
   * Metodo para listar todos os adicionais
   * GET
   */
  async getAdditionals() {
    try {
      const response = await Api().get('/additionals');
      return response.data;
    } catch (error) {
      return false;
    }
  },

  /**
   * Metodo para criar novo adicional
   * POST
   */
  async createAdditional(additional) {
    try {
      const response = await Api().post('/additionals', additional);
      return response.data;
    } catch (error) {
      return false;
    }
  },

  /**
   * Metodo para listar adicional por ID
   * GET
   */
  async getAdditionalID(id) {
    try {
      const response = await Api().get(`/additionals/${id}`);
      return response.data;
    } catch (error) {
      return false;
    }
  },

  /**
   * Metodo para atualizar adicional por ID
   * PUT
   */
  async updateAdditional(additional) {
    try {
      const id = additional.additional_id;
      const response = await Api().put(`/additionals/${id}`, additional);
      return response.data;
    } catch (error) {
      return false;
    }
  },
  /**
   * Metodo para excluir adicional por ID
   * DELETE
   */
  async deleteAdditional(id) {
    try {
      const response = await Api().delete(`/additionals/${id}`);
      return response.data;
    } catch (error) {
      return false;
    }
  },

};
