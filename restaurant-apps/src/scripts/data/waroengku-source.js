import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';

class WaroengKuSource {
  static async WaroengKuList() {
    const response = await fetch(API_ENDPOINT.LIST);
    return response.json();
  }

  static async Detail_WaroengKu(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }

  static async Review_WaroengKu(data) {
    const response = await fetch(API_ENDPOINT.POST_REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded | application/json',
        'X-Auth-Token': CONFIG.KEY,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}

export default WaroengKuSource;
