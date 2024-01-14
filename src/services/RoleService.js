import Api from './Api';

export default {
  /**
   * Metodo para listar todos as funções
   * GET
   */
  async getRoles() {
    try {
      const response = await Api().get('/roles');
      return response.data;
    } catch (error) {
      return false;
    }
  },

  /**
   * Metodo para criar nova função
   * POST
   */
  async createRole(role) {
    try {
      const response = await Api().post('/roles', role);
      return response.data;
    } catch (error) {
      return false;
    }
  },

  /**
   * Metodo para listar função por ID
   * GET
   */
  async getRoleID(id) {
    try {
      const response = await Api().get(`/roles/${id}`);
      return response.data;
    } catch (error) {
      return false;
    }
  },

  /**
   * Metodo para atualizar função por ID
   * PUT
   */
  async updateRole(role) {
    try {
      const id = role.role_id;
      const response = await Api().put(`/roles/${id}`, role);
      return response.data;
    } catch (error) {
      return false;
    }
  },
  /**
   * Metodo para excluir função por ID
   * DELETE
   */
  async deleteRole(id) {
    try {
      const response = await Api().delete(`/roles/${id}`);
      return response.data;
    } catch (error) {
      return false;
    }
  },

};
