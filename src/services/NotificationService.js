import Api from './Api';

export default {

  /**
   * Metodo para enviar notificação Push para determinada conta
   * GET
   */
  async sendNotification(params) {
    try {
      const response = await Api().get(`/notifications/${params}`);
      return response.data;
    } catch (error) {
      return false;
    }
  },

  /**
   * Metodo para enviar notificação Push para determinada função
   * GET
   */
  async sendNotificationRole(params) {
    try {
      const response = await Api().get(`/notifications/roles/${params}`);
      return response.data;
    } catch (error) {
      return false;
    }
  },

  /**
   * Metodo para criar nova notificação
   * POST
   */
  async saveNotification(account) {
    try {
      const response = await Api().post('/notifications', account);
      return response.data;
    } catch (error) {
      return error;
    }
  },

};
