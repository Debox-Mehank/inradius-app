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

export interface ReactSelectOptionType {
    value: string,
    label: string
}

export interface ReactSelectIndustryDependentOptionType {
    value: string,
    label: string,
    industry: string
}

export interface WorkExpType {
    company: string,
    designation: ReactSelectOptionType,
    desc: string,
    start: number,
    end: number
}