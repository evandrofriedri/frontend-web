import Api from './Api';

export default {
  /**
   * Metodo para listar todos os usuários
   * GET
   */
  async getUsers() {
    try {
      const response = await Api().get('/users');
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  /**
   * Metodo para criar nova usuário
   * POST
   */
  async createUser(user) {
    try {
      const response = await Api().post('/users', user);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  /**
   * Metodo para listar usuário por ID
   * GET
   */
  async getUserID(id) {
    try {
      const response = await Api().get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  /**
   * Metodo para atualizar usuário por ID
   * PUT
   */
  async updateUser(id) {
    try {
      const response = await Api().put(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  /**
   * Metodo para excluir usuário por ID
   * DELETE
   */
  async deleteUser(id) {
    try {
      const response = await Api().delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

};
