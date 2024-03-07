import Api from './Api';

export default {
  /**
   * Metodo para listar todos as formas de pagto
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
   * Metodo para criar nova forma de pagto
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
   * Metodo para listar forma de pagto por ID
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
   * Metodo para listar forma de pagto por nome
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
   * Metodo para atualizar forma de pagto por ID
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
   * Metodo para excluir forma de pagto por ID
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
