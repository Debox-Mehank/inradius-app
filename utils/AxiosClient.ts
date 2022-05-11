import axios from "axios"
console.log(process.env.BASE_URL)
export const api = axios.create({
  baseURL: process.env.BASE_URL
});