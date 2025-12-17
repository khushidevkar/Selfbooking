// export const storage = {
//   set: (key: string, value: any) =>
//     sessionStorage.setItem(key, JSON.stringify(value)),
//   get: (key: string) =>
//     JSON.parse(sessionStorage.getItem(key) || "null"),
//   remove: (key: string) => sessionStorage.removeItem(key),
// };



export const storage = {
  set<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  },

  get<T>(key: string): T | null {
    const item = sessionStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  },

  remove(key: string): void {
    sessionStorage.removeItem(key);
  },
};
