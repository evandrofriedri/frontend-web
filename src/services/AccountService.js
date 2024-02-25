import Api from './Api';

export default {

  /**
   * Metodo para validar login
   * POST
   */
  async validateLogin(account) {
    try {
      const response = await Api().post('/login', account);
      return response.data;
    } catch (error) {
      return error;
    }
  },

    /**
   * Metodo para validar google login
   * POST
   */
    async validateGoogleLogin(account) {
      try {
        const response = await Api().post('/googleLogin', account);
        return response.data;
      } catch (error) {
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
      return response.data;
    } catch (error) {
      return false;
    }
  },

  /**
   * Metodo para listar todas as contas
   * GET
   */
  async getAccounts(params) {
    try {
      const response = await Api().get(`/accounts/all/${params}`);
      return response.data;
    } catch (error) {
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
      return response.data;
    } catch (error) {
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
      return false;
    }
  },

    /**
   * Metodo para listar conta por Nome
   * GET
   */
    async getAccountName(name) {
      try {
        const response = await Api().get(`/accounts/search/${name}`);
        return response.data;
      } catch (error) {
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
      return false;
    }
  },

};
