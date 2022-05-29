import { GroupBase, StylesConfig } from "react-select";

export const reactSelectColorStyles: StylesConfig<
  any,
  false,
  GroupBase<any>
> = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: "#e7e7e7",
    border: "none",
    fontSize: "14px",
    fontWeight: 600,
    ":hover": {
      border: "none",
      boxShadow: "none",
      outline: "none",
    },
  }),
  option: (styles) => ({
    ...styles,
    backgroundColor: "white",
    color: "black",
    fontSize: "14px",
    ":hover": {
      backgroundColor: "#e55d29",
      color: "white",
    },
  }),
};
