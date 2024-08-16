import axios from "axios";
import { IResponse, IUser, PartialUser } from "./types";
export const Axios = axios.create({
  baseURL: "http://localhost:4002",
  withCredentials: true,
});

export const handleSignupRequest = async (user: IUser): Promise<IResponse> => {
  const response = await Axios.post("/signup", user);
  return response.data;
};

export const handleLogin = async (user: PartialUser): Promise<IResponse> => {
  const response = await Axios.post("/login", user);
  return response.data;
};
export const verifyUser = async (): Promise<IResponse> => {
  const response = await Axios.get("/verify");
  return response.data;
};

export const handleLogout = async (): Promise<IResponse> => {
  const response = await Axios.post("/logout");
  return response.data;
};

export const handleUpload = async (form: FormData): Promise<IResponse> => {
  const response = await Axios.patch("/profile/upload", form);
  return response.data;
};

export const AddPost = async (form: FormData): Promise<IResponse> => {
  const response = await Axios.post("posts", form);
  return response.data;
};

export const getAllPosts = async (): Promise<IResponse> => {
  const response = await Axios.get("/posts");
  return response.data;
};

export const deletePostById = async (id: number): Promise<IResponse> => {
  const response = await Axios.delete(`/posts/${id}`);
  return response.data;
};

export const updateAccountPrivacy = async (
  isPrivate: number
): Promise<IResponse> => {
  const response = await Axios.patch("/account/set", { isPrivate });
  return response.data;
};

export const updatePassword = async (
  old: string,
  newpwd: string
): Promise<IResponse> => {
  const response = await Axios.patch("/update/password", { old, newpwd });
  return response.data;
};

export const updateLogin = async (
  password: string,
  login: string
): Promise<IResponse> => {
  const response = await Axios.patch("/update/login", { password, login });
  return response.data;
};
