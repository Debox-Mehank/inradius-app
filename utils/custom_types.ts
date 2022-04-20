import React from "react";
import { RegisterOptions } from "react-hook-form"

export enum FieldTypes {
    text = "text",
    email = "email",
    password = "password"
}

interface FormFieldsType {
    title: string,
    name: string,
    type: FieldTypes,
    validation?: RegisterOptions,
    cols: string,
    desc?: React.ReactNode,
}

export interface FormTemplateType {
    title: string,
    fields: FormFieldsType[],
    buttonText: string,
}