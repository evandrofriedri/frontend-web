import Api from './Api';

export default {
  /**
   * Metodo para listar todos as formas de pagamento
   * GET
   */
  async getPayments() {
    try {
      const response = await Api().get('/payments');
      return response.data;
    } catch (error) {
      return false;
    }
  },

  /**
   * Metodo para criar nova forma de pagamento
   * POST
   */
  async createPayment(payment) {
    try {
      const response = await Api().post('/payments', payment);
      return response.data;
    } catch (error) {
      return false;
    }
  },

  /**
   * Metodo para listar forma de pagamento por ID
   * GET
   */
  async getPaymentID(id) {
    try {
      const response = await Api().get(`/payments/${id}`);
      return response.data;
    } catch (error) {
      return false;
    }
  },

   /**
   * Metodo para listar forma de pagamento por nome
   * GET
   */
   async getPaymentName(name) {
    try {
      const response = await Api().get(`/payments/search/${name}`);
      return response.data;
    } catch (error) {
      return false;
    }
  },

  /**
   * Metodo para atualizar forma de pagamento por ID
   * PUT
   */
  async updatePayment(payment) {
    try {
      const id = payment.payment_id;
      const response = await Api().put(`/payments/${id}`, payment);
      return response.data;
    } catch (error) {
      return false;
    }
  },
  /**
   * Metodo para excluir forma de pagamento por ID
   * DELETE
   */
  async deletePayment(id) {
    try {
      const response = await Api().delete(`/payments/${id}`);
      return response.data;
    } catch (error) {
      return false;
    }
  },

};
