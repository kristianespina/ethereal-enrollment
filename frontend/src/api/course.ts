import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const courseRead = async (token: string) => {
  return await axios.get(`${API_URL}/course`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
