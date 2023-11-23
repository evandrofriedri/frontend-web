import Api from './Api';

export default {

  /**
   * Metodo para validar login
   * POST
   */
  async validateLogin(account) {
    try {
      const response = await Api().post('/login', account);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  /**
   * Metodo para atualizar token
   * GET
   */
  async userProfile() {
    try {
      const response = await Api().get('/userProfile');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  /**
   * Metodo para listar todas as contas
   * GET
   */
  async getAccounts() {
    try {
      const response = await Api().get('/accounts');
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  /**
   * Metodo para criar nova conta
   * POST
   */
  async createAccount(account) {
    try {
      const response = await Api().post('/accounts', account);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  /**
   * Metodo para listar conta por ID
   * GET
   */
  async getAccountID(id) {
    try {
      const response = await Api().get(`/accounts/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  /**
   * Metodo para atualizar conta por ID
   * PUT
   */
  async updateAccount(account) {
    try {
      const id = account.account_id;
      const response = await Api().put(`/accounts/${id}`, account);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  /**
   * Metodo para excluir conta por ID
   * DELETE
   */
  async deleteAccount(id) {
    try {
      const response = await Api().delete(`/accounts/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

};
