const key = [
  "81a0a83025df44898b4483e411597804",
  "e97a800aec024e56a67074d3a06d6470",
  "2f667881858a4acabd9f3cc1359e4826",
  "11e30b29cb6d47c082e3b57e8efdc467",
];

export const getDataSearchBar = async <T>(path: string): Promise<T> => {
  const max = key.length - 1;
  const idxString = localStorage.getItem("idx");
  if (!idxString) {
    localStorage.setItem("idx", "0");
    return getDataSearchBar(path);
  }
  const response = await fetch(path + `&apiKey=${key[parseInt(idxString!)]}`);
  // if(response.status >= 500) return await response
  if (response.status === 401 || response.status === 402) {
    const idxNumber = parseInt(idxString!);
    if (idxNumber < max) {
      localStorage.setItem("idx", `${idxNumber + 1}`);
      return getDataSearchBar(path);
    }
    if (idxNumber === max) {
      localStorage.setItem("tries", "1");
      return response.json();
    }
  }
  return await response.json();
};
