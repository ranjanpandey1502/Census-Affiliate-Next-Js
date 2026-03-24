class LocalStorage {
  setStorageItem = (key: string, data: string) => {
    localStorage.setItem(key, data);
  };

  getStorageItem = (key: string):string | null => {
    return localStorage.getItem(key);
  };

  removeStorageItem = (key: string) => {
    return localStorage.removeItem(key);
  };
}

export default new LocalStorage()