export const getData = async <T>(path: string): Promise<T> => {
  const response = await fetch(path);
  return await response.json();
};
