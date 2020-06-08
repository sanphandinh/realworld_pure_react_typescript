export const getItem = (id: string): any => {
  const _item = localStorage.getItem(id);
  if (_item) return JSON.parse(_item);
  return null;
};

export const setItem = (id: string, value: any) => {
  localStorage.setItem(id, JSON.stringify(value));
};

export const deleteItem = (id: string) => {
  const _item = getItem(id);
  if (!_item) localStorage.removeItem(id);
};

export const clear = (): void => {
  localStorage.clear();
};
