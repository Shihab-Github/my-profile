import { object, string, number } from "yup";

export const basicInfoSchema = object({
  name: string().required("Name is required"),
  age: number().required("Age is required"),
});
