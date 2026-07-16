console.log("========== import.meta.env ==========");
console.log(import.meta.env);

const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
};

console.log("Loaded API URL:", env.API_BASE_URL);

export default env;