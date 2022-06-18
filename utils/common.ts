import { GroupBase, StylesConfig } from "react-select";

export const mapLibs: (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[] = ["places"];

export const reactSelectColorStyles: StylesConfig<
  any,
  false,
  GroupBase<any>
> = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: "#e7e7e7",
    border: "none",
    fontSize: "12px",
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
    fontSize: "12px",
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
    fontSize: "12px",
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
    fontSize: "12px",
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

export const formatText = (text: string): string => {
  return (
    text
      // bold
      .replace(/(?:\*)(?:(?!\s))((?:(?!\*|\n).)+)(?:\*)/g, "<b>$1</b>")
      // italics
      .replace(/(?:_)(?:(?!\s))((?:(?!\n|_).)+)(?:_)/g, "<i>$1</i>")
      // strikethrough
      .replace(/(?:~)(?:(?!\s))((?:(?!\n|~).)+)(?:~)/g, "<s>$1</s>")
      // underline
      .replace(/(?:--)(?:(?!\s))((?:(?!\n|--).)+)(?:--)/g, "<u>$1</u>")
      // monospace
      .replace(/(?:```)(?:(?!\s))((?:(?!\n|```).)+)(?:```)/g, "<tt>$1</tt>")
      // primary color
      .replace(
        /(?:!)(?:(?!\s))((?:(?!\n|!).)+)(?:!)/g,
        "<span style='color: #ff4100;'>$1</span>"
      )
  );
};
