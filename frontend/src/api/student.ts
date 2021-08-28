import axios from "axios";
import { Student } from "../types/student";

const API_URL = process.env.REACT_APP_API_URL;

export type StudentRequest = Student & {
  password: string;
};
export const postLogin = async (email: string, password: string) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const studentCreate = async ({
  firstName,
  lastName,
  middleName,
  birthDate,
  sex,
  email,
  password,
}: StudentRequest) => {
  return await axios.put(`${API_URL}/student`, {
    firstName,
    lastName,
    middleName,
    birthDate,
    sex,
    email,
    password,
  });
};

export const studentRead = async (token: string) => {
  return await axios.get(`${API_URL}/student`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const studentUpdate = async (
  payload: Partial<StudentRequest>,
  token: string
) => {
  return await axios.patch(`${API_URL}/student`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const studentDelete = async (token: string) => {
  return await axios.delete(`${API_URL}/student`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
