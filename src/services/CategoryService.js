import Api from './Api';

export default {
  /**
   * Metodo para listar todos as categorias
   * GET
   */
  async getCategories() {
    try {
      const response = await Api().get('/categories');
      return response.data;
    } catch (error) {
      return false;
    }
  },

  /**
   * Metodo para criar nova categoria
   * POST
   */
  async createCategory(category) {
    try {
      const response = await Api().post('/categories', category);
      return response.data;
    } catch (error) {
      return false;
    }
  },

  /**
   * Metodo para listar categoria por Nome
   * GET
   */
  async getCategoryName(name) {
    try {
      const response = await Api().get(`/categories/search/${name}`);
      return response.data;
    } catch (error) {
      return false;
    }
  },

  /**
   * Metodo para atualizar categoria por ID
   * PUT
   */
  async updateCategory(category) {
    try {
      const id = category.category_id;
      const response = await Api().put(`/categories/${id}`, category);
      return response.data;
    } catch (error) {
      return false;
    }
  },

  /**
   * Metodo para excluir categoria por ID
   * DELETE
   */
  async deleteCategory(id) {
    try {
      const response = await Api().delete(`/categories/${id}`);
      return response.data;
    } catch (error) {
      return false;
    }
  },

    /**
   * Metodo para listar todos as categorias com produtos e adicionais
   * GET
   */
    async getCategoriesWithProducts() {
      try {
        const response = await Api().get('/categories/all');
        return response.data;
      } catch (error) {
        return false;
      }
    },

};
