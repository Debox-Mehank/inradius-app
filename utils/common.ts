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
      backgroundColor: "#ff4100",
      color: "white",
    },
  }),
};

export const reactMultiSelectColorStyles: StylesConfig<
  any,
  true,
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
    padding: "6px 0",
  }),
  option: (styles) => ({
    ...styles,
    backgroundColor: "white",
    color: "black",
    fontSize: "14px",
    ":hover": {
      backgroundColor: "#ff4100",
      color: "white",
    },
  }),
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: "#ff4100",
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontSize: "12px",
    padding: "6px",
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: "white",
    ":hover": {
      backgroundColor: "transparent",
    },
  }),
};
