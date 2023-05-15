const API_URL = 'https://week03--posts--api.herokuapp.com/';

let serviceInstance = null;

const Fetch = function () {
  this.get = async function (url) {
    try {
      const response = await fetch(`${API_URL}${url}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  };

  this.post = async function (postData, url) {
    try {
      const response = await fetch(`${API_URL}${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  };
  this.put = async function (postData, url) {
    try {
      const response = await fetch(`${API_URL}${url}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  };

  this.patch = async function (patchData, url) {
    try {
      const response = await fetch(`${API_URL}${url}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patchData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  };
  this.delete = async function (url) {
    try {
      const response = await fetch(`${API_URL}${url}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  };
};

function getInstance() {
  if (!serviceInstance) {
    serviceInstance = new Fetch();
  }
  return serviceInstance;
}

export { getInstance };
