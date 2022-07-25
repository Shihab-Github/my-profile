import { object, string, number, boolean, ref } from "yup";

export interface FromDate {
  month: string;
  year: number;
}

export interface ToDate {
  month: string;
  year: number;
}

export interface experience {
  id: string;
  jobTitle: string;
  company: string;
  current: boolean;
  fromDate: FromDate;
  toDate: ToDate | null;
  jd: string | null
}

export const experienceSchema = object({
  jobTitle: string().required("Job title is required"),
  company: string().required("Company name is required"),
  current: boolean(),
  fromMonth: number().required("Start month is required"),
  fromYear: number().required("Start year is required"),
  toMonth: number()
    .nullable()
    .when(["toYear"], {
      is: (toYear: Number) => toYear,
      then: number().required("End Month is requried"),
    }),
  toYear: number()
    .nullable()
    .min(ref("fromYear"), "End year can't be before start year"),
  jd: string().nullable(),
});
