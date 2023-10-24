import Api from './Api';

export default {
  /**
   * Metodo para listar todos os produtos
   * GET
   */
  async getProducts() {
    try {
      const response = await Api().get('/products');
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  /**
   * Metodo para criar novo produto
   * POST
   */
  async createProduct(product) {
    try {
      const response = await Api().post('/products', product);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  /**
   * Metodo para listar produto por categoriaID
   * GET
   */
  async getProductID(id) {
    try {
      const response = await Api().get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  /**
   * Metodo para atualizar produto por ID
   * PUT
   */
  async updateProduct(product) {
    try {
      const id = product.product_id;
      const response = await Api().put(`/products/${id}`, product);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  /**
   * Metodo para excluir produto por ID
   * DELETE
   */
  async deleteProduct(id) {
    try {
      const response = await Api().delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  /**
   * Metodo para criar novo produto_adicional
   * POST
   */
  async createProductAdditional(productId, additionalId) {
    try {
      const response = await Api().post(`/products/${productId}/additionals/${additionalId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  /**
   * Metodo para listar todos os produto_adicional
   * GET
   */
  async getProductAdditionals(productId) {
    try {
      const response = await Api().get(`/products/${productId}/additionals`);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  /**
   * Metodo para excluir produto_adicional por produtoId
   * DELETE
   */
  async deleteProductAdditionals(productId) {
    try {
      const response = await Api().delete(`/products/${productId}/additionals`);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

};
