import axios from 'axios'

const axiosFetch  = axios.create({
  baseURL: "https://server-express-pay-houy.vercel.app/",
  withCredentials: true,
});

export default axiosFetch;