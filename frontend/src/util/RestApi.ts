import Axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || `${window.location.origin}/api`;

export const RestApi = {
  file: {
    async getInfo(): Promise<any> {
      return (await Axios.get(`${API_URL}/file/info`)).data.response;
    },
  },
};
