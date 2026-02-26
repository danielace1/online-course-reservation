import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

export const fetchSampleCourses = async () => {
  const res = await API.get("/courses/sample");
  console.log(res.data);

  return res.data || [];
};
