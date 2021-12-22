import { makeRequest } from "./utils/makeRequest";

export class API {
  
  async uploadModel(formData, params, headers) {
    return await makeRequest('POST', params, formData, headers );
  }

  async compressModelByPath(params, headers) {
    return await makeRequest('POST', params, null, headers);
  }
}

