import axios from 'axios'

const axiosFetch  = axios.create({
  baseURL: "https://server-express-pay.vercel.app/",
  withCredentials: true,
});

export default axiosFetch;