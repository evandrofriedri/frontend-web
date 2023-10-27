import Api from './Api';

export default {
  /**
   * Metodo para listar todos os pedidos
   * GET
   */
  async getOrders() {
    try {
      const response = await Api().get('/orders');
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  /**
   * Metodo para criar novo pedido
   * POST
   */
  async createOrder(order) {
    try {
      const response = await Api().post('/orders', order);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  /**
   * Metodo para listar pedido por contaID
   * GET
   */
  async getOrderID(id) {
    try {
      const response = await Api().get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  /**
   * Metodo para atualizar pedido por ID
   * PUT
   */
  async updateOrder(order) {
    try {
      const id = order.order_id;
      const response = await Api().put(`/orders/${id}`, order);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  /**
   * Metodo para excluir pedido por ID
   * DELETE
   */
  async deleteOrder(id) {
    try {
      const response = await Api().delete(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  /**
   * Metodo para criar novo pedido_produto
   * POST
   */
  async createOrderProduct(orderId, productId, product) {
    try {
      const response = await Api().post(`/orders/${orderId}/products/${productId}`, product);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  /**
   * Metodo para listar todos os pedido_produto
   * GET
   */
  async getOrderProducts(orderId) {
    try {
      const response = await Api().get(`/orders/${orderId}/products`);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  /**
   * Metodo para excluir pedido_produto por pedidoId
   * DELETE
   */
  async deleteOrderProducts(orderId) {
    try {
      const response = await Api().delete(`/orders/${orderId}/products`);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  /**
   * Metodo para criar novo pedido_status
   * POST
   */
  async createOrderStatus(orderId, statusId) {
    try {
      const response = await Api().post(`/orders/${orderId}/statuses/${statusId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  /**
   * Metodo para listar todos os pedido_status
   * GET
   */
  async getOrderStatuses(orderId) {
    try {
      const response = await Api().get(`/orders/${orderId}/statuses`);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  /**
   * Metodo para excluir pedido_status por pedidoId
   * DELETE
   */
  async deleteOrderStatuses(orderId) {
    try {
      const response = await Api().delete(`/orders/${orderId}/statuses`);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  /**
   * Metodo para criar novo pedido_produto_adicional
   * POST
   */
  async createOrderProductAdditional(orderProductId, additionalId, additional) {
    try {
      const response = await Api().post(`/orders/${orderProductId}/additionals/${additionalId}`, additional);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  /**
   * Metodo para listar todos os pedido_produto_adicional
   * GET
   */
  async getOrderProductAdditionals(orderProductId) {
    try {
      const response = await Api().get(`/orders/${orderProductId}/additionals`);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  /**
   * Metodo para excluir pedido_status por pedidoId
   * DELETE
   */
  async deleteOrderProductAdditionals(orderProductId) {
    try {
      const response = await Api().delete(`/orders/${orderProductId}/additionals`);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

};
