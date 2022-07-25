import { dropDownShape } from "../data/Shapes";

export function getYears() {
  let currentYear = new Date().getFullYear();
  let years: dropDownShape[] = [];
  for (let i = 1980; i <= currentYear; i++) {
    years.push({
      title: i.toString(),
      value: i,
    });
  }
  return years;
}
