import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Admin = {
  __typename?: 'Admin';
  _id: Scalars['ID'];
  email: Scalars['String'];
  name: Scalars['String'];
  type: AdminRole;
};

export type AdminLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AdminRegisterInput = {
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  type: AdminRole;
  updatedAt: Scalars['DateTime'];
};

/** Enum For Type of Admin Roles i.e. Master, Admin & Normal */
export enum AdminRole {
  Admin = 'admin',
  Master = 'master',
  Normal = 'normal'
}

/** Enum For Designation of Employee */
export enum DesignationEnum {
  Director = 'director',
  Manager = 'manager',
  Techlead = 'techlead'
}

export type Domain = {
  __typename?: 'Domain';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  domain: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type DomainInput = {
  domain: Scalars['String'];
};

export type EmailVerifyInput = {
  id: Scalars['String'];
  token: Scalars['String'];
};

export type Employee = {
  __typename?: 'Employee';
  _id: Scalars['ID'];
  aadharCard?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  currentAddress?: Maybe<Scalars['String']>;
  currentPay?: Maybe<Scalars['Float']>;
  dob?: Maybe<Scalars['DateTime']>;
  domain?: Maybe<Domain>;
  expectedPay?: Maybe<Scalars['Float']>;
  fresher?: Maybe<Scalars['Boolean']>;
  gender?: Maybe<EmployeeGenderEnum>;
  industry?: Maybe<Industry>;
  interests: Array<User>;
  latitude?: Maybe<Scalars['Float']>;
  linkedIn?: Maybe<Scalars['String']>;
  location?: Maybe<Location>;
  longitude?: Maybe<Scalars['Float']>;
  panCard?: Maybe<Scalars['String']>;
  qualification?: Maybe<Qualification>;
  radius?: Maybe<Scalars['Float']>;
  relevantExp?: Maybe<UserExpInYearMonths>;
  resume?: Maybe<Scalars['String']>;
  skills: Array<Skill>;
  subDomain?: Maybe<SubDomain>;
  totalExp?: Maybe<UserExpInYearMonths>;
  updatedAt: Scalars['DateTime'];
  user: User;
  userSurvey: Array<UserSurvey>;
  workExp: Array<UserWorkExp>;
};

/** Enum For Gender of Employee */
export enum EmployeeGenderEnum {
  Female = 'Female',
  Male = 'Male',
  Other = 'Other'
}

export type Industry = {
  __typename?: 'Industry';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  industry: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type IndustryInput = {
  industry: Scalars['String'];
};

export type Location = {
  __typename?: 'Location';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  location: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type LocationInput = {
  location: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addDomain: Domain;
  addIndustry: Industry;
  addLocation: Location;
  addQualification: Qualification;
  addSkill: Skill;
  addSubDomain: SubDomain;
  addSurvey: Survey;
  adminRegister: Admin;
  register: User;
  updateEmployee: Employee;
};


export type MutationAddDomainArgs = {
  input: DomainInput;
};


export type MutationAddIndustryArgs = {
  input: IndustryInput;
};


export type MutationAddLocationArgs = {
  input: LocationInput;
};


export type MutationAddQualificationArgs = {
  input: QualificationInput;
};


export type MutationAddSkillArgs = {
  input: SkillInput;
};


export type MutationAddSubDomainArgs = {
  input: SubDomainInput;
};


export type MutationAddSurveyArgs = {
  input: SurveyInput;
};


export type MutationAdminRegisterArgs = {
  input: AdminRegisterInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateEmployeeArgs = {
  input: UpdateEmployeeInput;
};

export type Qualification = {
  __typename?: 'Qualification';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  qualification: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type QualificationInput = {
  qualification: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  adminLogin: Scalars['String'];
  allDomains: Array<Domain>;
  allIndustries: Array<Industry>;
  allLocations: Array<Location>;
  allQualifications: Array<Qualification>;
  allSkills: Array<Skill>;
  allSubDomains: Array<SubDomain>;
  allSurveyQuestion: Array<Survey>;
  getEmployee: Employee;
  login: Scalars['String'];
  resendVerifyEmail: Scalars['Boolean'];
  updateProfileStatus: Scalars['Boolean'];
  updateSurveyStatus: Scalars['Boolean'];
  user: User;
  verifyEmail: Scalars['Boolean'];
};


export type QueryAdminLoginArgs = {
  input: AdminLoginInput;
};


export type QueryAllSurveyQuestionArgs = {
  type?: InputMaybe<SurveyType>;
};


export type QueryLoginArgs = {
  input: LoginInput;
};


export type QueryResendVerifyEmailArgs = {
  input: EmailVerifyInput;
};


export type QueryVerifyEmailArgs = {
  input: EmailVerifyInput;
};

export type RegisterInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  number: Scalars['String'];
  password: Scalars['String'];
  type: UserRole;
};

export type Skill = {
  __typename?: 'Skill';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  skill: Scalars['String'];
  subDomain: SubDomain;
  updatedAt: Scalars['DateTime'];
};

export type SkillInput = {
  skill: Scalars['String'];
  subDomain: Scalars['String'];
};

export type SubDomain = {
  __typename?: 'SubDomain';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  domain: Domain;
  subDomain: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type SubDomainInput = {
  domain: Scalars['String'];
  subDomain: Scalars['String'];
};

export type Survey = {
  __typename?: 'Survey';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  options: Array<Scalars['String']>;
  question: Scalars['String'];
  type: SurveyType;
  updatedAt: Scalars['DateTime'];
};

export type SurveyInput = {
  options: Array<Scalars['String']>;
  question: Scalars['String'];
  type: SurveyType;
};

/** Enum For Type of Survey User Roles i.e. Employer & Employee */
export enum SurveyType {
  Employee = 'employee',
  Employer = 'employer'
}

export type UpdateEmployeeInput = {
  aadharCard?: InputMaybe<Scalars['String']>;
  currentAddress?: InputMaybe<Scalars['String']>;
  currentPay?: InputMaybe<Scalars['Float']>;
  dob?: InputMaybe<Scalars['DateTime']>;
  domain?: InputMaybe<Scalars['ID']>;
  expectedPay?: InputMaybe<Scalars['Float']>;
  fresher?: InputMaybe<Scalars['Boolean']>;
  gender?: InputMaybe<EmployeeGenderEnum>;
  industry?: InputMaybe<Scalars['ID']>;
  latitude?: InputMaybe<Scalars['Float']>;
  linkedIn?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['ID']>;
  longitude?: InputMaybe<Scalars['Float']>;
  panCard?: InputMaybe<Scalars['String']>;
  qualification?: InputMaybe<Scalars['ID']>;
  radius?: InputMaybe<Scalars['Float']>;
  relevantExp?: InputMaybe<UserExpInYearMonthsInput>;
  resume?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<Array<Scalars['ID']>>;
  subDomain?: InputMaybe<Scalars['ID']>;
  totalExp?: InputMaybe<UserExpInYearMonthsInput>;
  userSurvey?: InputMaybe<Array<UserSurveyInput>>;
  workExp?: InputMaybe<Array<UserWorkExpInput>>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  isAccountVerified: Scalars['Boolean'];
  isProfileCompleted: Scalars['Boolean'];
  isSurveyCompleted: Scalars['Boolean'];
  lastName: Scalars['String'];
  number: Scalars['String'];
  type: UserRole;
  updatedAt: Scalars['DateTime'];
};

export type UserExpInYearMonths = {
  __typename?: 'UserExpInYearMonths';
  months: Scalars['String'];
  years: Scalars['String'];
};

export type UserExpInYearMonthsInput = {
  months: Scalars['String'];
  years: Scalars['String'];
};

/** Enum For Type of User Roles i.e. Employer & Employee */
export enum UserRole {
  Employee = 'employee',
  Employer = 'employer'
}

export type UserSurvey = {
  __typename?: 'UserSurvey';
  selectedOption: Scalars['String'];
  survey: Survey;
};

export type UserSurveyInput = {
  selectedOption: Scalars['String'];
  survey: Scalars['String'];
};

export type UserWorkExp = {
  __typename?: 'UserWorkExp';
  company: Scalars['String'];
  current: Scalars['Boolean'];
  desc: Scalars['String'];
  designation: DesignationEnum;
  end?: Maybe<Scalars['DateTime']>;
  start: Scalars['DateTime'];
};

export type UserWorkExpInput = {
  company: Scalars['String'];
  current: Scalars['Boolean'];
  desc: Scalars['String'];
  designation: DesignationEnum;
  end: Scalars['DateTime'];
  start: Scalars['DateTime'];
};

export type UpdateEmployeeMutationVariables = Exact<{
  input: UpdateEmployeeInput;
}>;


export type UpdateEmployeeMutation = { __typename?: 'Mutation', updateEmployee: { __typename?: 'Employee', user: { __typename?: 'User', email: string } } };

export type GetEmployeeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEmployeeQuery = { __typename?: 'Query', getEmployee: { __typename?: 'Employee', _id: string, radius?: number | null, latitude?: number | null, longitude?: number | null, fresher?: boolean | null, currentPay?: number | null, expectedPay?: number | null, linkedIn?: string | null, resume?: string | null, gender?: EmployeeGenderEnum | null, currentAddress?: string | null, dob?: any | null, panCard?: string | null, aadharCard?: string | null, location?: { __typename?: 'Location', _id: string, location: string } | null, qualification?: { __typename?: 'Qualification', _id: string, qualification: string } | null, industry?: { __typename?: 'Industry', _id: string, industry: string } | null, domain?: { __typename?: 'Domain', _id: string, domain: string } | null, subDomain?: { __typename?: 'SubDomain', _id: string, subDomain: string } | null, skills: Array<{ __typename?: 'Skill', _id: string, skill: string }>, workExp: Array<{ __typename?: 'UserWorkExp', company: string, designation: DesignationEnum, desc: string, start: any, end?: any | null, current: boolean }>, totalExp?: { __typename?: 'UserExpInYearMonths', years: string, months: string } | null, relevantExp?: { __typename?: 'UserExpInYearMonths', years: string, months: string } | null, interests: Array<{ __typename?: 'User', _id: string }> } };

export type AllLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllLocationsQuery = { __typename?: 'Query', allLocations: Array<{ __typename?: 'Location', _id: string, location: string }> };

export type AllQualificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllQualificationsQuery = { __typename?: 'Query', allQualifications: Array<{ __typename?: 'Qualification', _id: string, qualification: string }> };

export type AllIndustriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllIndustriesQuery = { __typename?: 'Query', allIndustries: Array<{ __typename?: 'Industry', _id: string, industry: string }> };

export type AllDomainsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllDomainsQuery = { __typename?: 'Query', allDomains: Array<{ __typename?: 'Domain', _id: string, domain: string }> };

export type AllSubDomainsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSubDomainsQuery = { __typename?: 'Query', allSubDomains: Array<{ __typename?: 'SubDomain', _id: string, subDomain: string, domain: { __typename?: 'Domain', _id: string, domain: string } }> };

export type AllSkillsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSkillsQuery = { __typename?: 'Query', allSkills: Array<{ __typename?: 'Skill', _id: string, skill: string, subDomain: { __typename?: 'SubDomain', _id: string, subDomain: string } }> };

export type AllSurveyQuestionQueryVariables = Exact<{
  type?: InputMaybe<SurveyType>;
}>;


export type AllSurveyQuestionQuery = { __typename?: 'Query', allSurveyQuestion: Array<{ __typename?: 'Survey', _id: string, question: string, options: Array<string>, type: SurveyType, createdAt: any, updatedAt: any }> };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', _id: string } };

export type VerifyEmailQueryVariables = Exact<{
  input: EmailVerifyInput;
}>;


export type VerifyEmailQuery = { __typename?: 'Query', verifyEmail: boolean };

export type ResendVerifyEmailQueryVariables = Exact<{
  input: EmailVerifyInput;
}>;


export type ResendVerifyEmailQuery = { __typename?: 'Query', resendVerifyEmail: boolean };

export type LoginQueryVariables = Exact<{
  input: LoginInput;
}>;


export type LoginQuery = { __typename?: 'Query', login: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', user: { __typename?: 'User', _id: string, firstName: string, lastName: string, email: string, number: string, image?: string | null, type: UserRole, isAccountVerified: boolean, isSurveyCompleted: boolean, isProfileCompleted: boolean } };

export type UpdateSurveyStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type UpdateSurveyStatusQuery = { __typename?: 'Query', updateSurveyStatus: boolean };

export type UpdateProfileStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type UpdateProfileStatusQuery = { __typename?: 'Query', updateProfileStatus: boolean };


export const UpdateEmployeeDocument = gql`
    mutation UpdateEmployee($input: UpdateEmployeeInput!) {
  updateEmployee(input: $input) {
    user {
      email
    }
  }
}
    `;
export type UpdateEmployeeMutationFn = Apollo.MutationFunction<UpdateEmployeeMutation, UpdateEmployeeMutationVariables>;

/**
 * __useUpdateEmployeeMutation__
 *
 * To run a mutation, you first call `useUpdateEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEmployeeMutation, { data, loading, error }] = useUpdateEmployeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEmployeeMutation, UpdateEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEmployeeMutation, UpdateEmployeeMutationVariables>(UpdateEmployeeDocument, options);
      }
export type UpdateEmployeeMutationHookResult = ReturnType<typeof useUpdateEmployeeMutation>;
export type UpdateEmployeeMutationResult = Apollo.MutationResult<UpdateEmployeeMutation>;
export type UpdateEmployeeMutationOptions = Apollo.BaseMutationOptions<UpdateEmployeeMutation, UpdateEmployeeMutationVariables>;
export const GetEmployeeDocument = gql`
    query GetEmployee {
  getEmployee {
    _id
    radius
    latitude
    longitude
    location {
      _id
      location
    }
    qualification {
      _id
      qualification
    }
    industry {
      _id
      industry
    }
    domain {
      _id
      domain
    }
    subDomain {
      _id
      subDomain
    }
    skills {
      _id
      skill
    }
    fresher
    workExp {
      company
      designation
      desc
      start
      end
      current
    }
    totalExp {
      years
      months
    }
    relevantExp {
      years
      months
    }
    currentPay
    expectedPay
    linkedIn
    resume
    gender
    currentAddress
    dob
    panCard
    aadharCard
    interests {
      _id
    }
  }
}
    `;

/**
 * __useGetEmployeeQuery__
 *
 * To run a query within a React component, call `useGetEmployeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmployeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmployeeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEmployeeQuery(baseOptions?: Apollo.QueryHookOptions<GetEmployeeQuery, GetEmployeeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEmployeeQuery, GetEmployeeQueryVariables>(GetEmployeeDocument, options);
      }
export function useGetEmployeeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEmployeeQuery, GetEmployeeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEmployeeQuery, GetEmployeeQueryVariables>(GetEmployeeDocument, options);
        }
export type GetEmployeeQueryHookResult = ReturnType<typeof useGetEmployeeQuery>;
export type GetEmployeeLazyQueryHookResult = ReturnType<typeof useGetEmployeeLazyQuery>;
export type GetEmployeeQueryResult = Apollo.QueryResult<GetEmployeeQuery, GetEmployeeQueryVariables>;
export const AllLocationsDocument = gql`
    query AllLocations {
  allLocations {
    _id
    location
  }
}
    `;

/**
 * __useAllLocationsQuery__
 *
 * To run a query within a React component, call `useAllLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllLocationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllLocationsQuery(baseOptions?: Apollo.QueryHookOptions<AllLocationsQuery, AllLocationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllLocationsQuery, AllLocationsQueryVariables>(AllLocationsDocument, options);
      }
export function useAllLocationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllLocationsQuery, AllLocationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllLocationsQuery, AllLocationsQueryVariables>(AllLocationsDocument, options);
        }
export type AllLocationsQueryHookResult = ReturnType<typeof useAllLocationsQuery>;
export type AllLocationsLazyQueryHookResult = ReturnType<typeof useAllLocationsLazyQuery>;
export type AllLocationsQueryResult = Apollo.QueryResult<AllLocationsQuery, AllLocationsQueryVariables>;
export const AllQualificationsDocument = gql`
    query AllQualifications {
  allQualifications {
    _id
    qualification
  }
}
    `;

/**
 * __useAllQualificationsQuery__
 *
 * To run a query within a React component, call `useAllQualificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllQualificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllQualificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllQualificationsQuery(baseOptions?: Apollo.QueryHookOptions<AllQualificationsQuery, AllQualificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllQualificationsQuery, AllQualificationsQueryVariables>(AllQualificationsDocument, options);
      }
export function useAllQualificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllQualificationsQuery, AllQualificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllQualificationsQuery, AllQualificationsQueryVariables>(AllQualificationsDocument, options);
        }
export type AllQualificationsQueryHookResult = ReturnType<typeof useAllQualificationsQuery>;
export type AllQualificationsLazyQueryHookResult = ReturnType<typeof useAllQualificationsLazyQuery>;
export type AllQualificationsQueryResult = Apollo.QueryResult<AllQualificationsQuery, AllQualificationsQueryVariables>;
export const AllIndustriesDocument = gql`
    query AllIndustries {
  allIndustries {
    _id
    industry
  }
}
    `;

/**
 * __useAllIndustriesQuery__
 *
 * To run a query within a React component, call `useAllIndustriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllIndustriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllIndustriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllIndustriesQuery(baseOptions?: Apollo.QueryHookOptions<AllIndustriesQuery, AllIndustriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllIndustriesQuery, AllIndustriesQueryVariables>(AllIndustriesDocument, options);
      }
export function useAllIndustriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllIndustriesQuery, AllIndustriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllIndustriesQuery, AllIndustriesQueryVariables>(AllIndustriesDocument, options);
        }
export type AllIndustriesQueryHookResult = ReturnType<typeof useAllIndustriesQuery>;
export type AllIndustriesLazyQueryHookResult = ReturnType<typeof useAllIndustriesLazyQuery>;
export type AllIndustriesQueryResult = Apollo.QueryResult<AllIndustriesQuery, AllIndustriesQueryVariables>;
export const AllDomainsDocument = gql`
    query AllDomains {
  allDomains {
    _id
    domain
  }
}
    `;

/**
 * __useAllDomainsQuery__
 *
 * To run a query within a React component, call `useAllDomainsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllDomainsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllDomainsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllDomainsQuery(baseOptions?: Apollo.QueryHookOptions<AllDomainsQuery, AllDomainsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllDomainsQuery, AllDomainsQueryVariables>(AllDomainsDocument, options);
      }
export function useAllDomainsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllDomainsQuery, AllDomainsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllDomainsQuery, AllDomainsQueryVariables>(AllDomainsDocument, options);
        }
export type AllDomainsQueryHookResult = ReturnType<typeof useAllDomainsQuery>;
export type AllDomainsLazyQueryHookResult = ReturnType<typeof useAllDomainsLazyQuery>;
export type AllDomainsQueryResult = Apollo.QueryResult<AllDomainsQuery, AllDomainsQueryVariables>;
export const AllSubDomainsDocument = gql`
    query AllSubDomains {
  allSubDomains {
    _id
    subDomain
    domain {
      _id
      domain
    }
  }
}
    `;

/**
 * __useAllSubDomainsQuery__
 *
 * To run a query within a React component, call `useAllSubDomainsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllSubDomainsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllSubDomainsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllSubDomainsQuery(baseOptions?: Apollo.QueryHookOptions<AllSubDomainsQuery, AllSubDomainsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllSubDomainsQuery, AllSubDomainsQueryVariables>(AllSubDomainsDocument, options);
      }
export function useAllSubDomainsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllSubDomainsQuery, AllSubDomainsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllSubDomainsQuery, AllSubDomainsQueryVariables>(AllSubDomainsDocument, options);
        }
export type AllSubDomainsQueryHookResult = ReturnType<typeof useAllSubDomainsQuery>;
export type AllSubDomainsLazyQueryHookResult = ReturnType<typeof useAllSubDomainsLazyQuery>;
export type AllSubDomainsQueryResult = Apollo.QueryResult<AllSubDomainsQuery, AllSubDomainsQueryVariables>;
export const AllSkillsDocument = gql`
    query AllSkills {
  allSkills {
    _id
    skill
    subDomain {
      _id
      subDomain
    }
  }
}
    `;

/**
 * __useAllSkillsQuery__
 *
 * To run a query within a React component, call `useAllSkillsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllSkillsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllSkillsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllSkillsQuery(baseOptions?: Apollo.QueryHookOptions<AllSkillsQuery, AllSkillsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllSkillsQuery, AllSkillsQueryVariables>(AllSkillsDocument, options);
      }
export function useAllSkillsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllSkillsQuery, AllSkillsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllSkillsQuery, AllSkillsQueryVariables>(AllSkillsDocument, options);
        }
export type AllSkillsQueryHookResult = ReturnType<typeof useAllSkillsQuery>;
export type AllSkillsLazyQueryHookResult = ReturnType<typeof useAllSkillsLazyQuery>;
export type AllSkillsQueryResult = Apollo.QueryResult<AllSkillsQuery, AllSkillsQueryVariables>;
export const AllSurveyQuestionDocument = gql`
    query AllSurveyQuestion($type: SurveyType) {
  allSurveyQuestion(type: $type) {
    _id
    question
    options
    type
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useAllSurveyQuestionQuery__
 *
 * To run a query within a React component, call `useAllSurveyQuestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllSurveyQuestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllSurveyQuestionQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useAllSurveyQuestionQuery(baseOptions?: Apollo.QueryHookOptions<AllSurveyQuestionQuery, AllSurveyQuestionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllSurveyQuestionQuery, AllSurveyQuestionQueryVariables>(AllSurveyQuestionDocument, options);
      }
export function useAllSurveyQuestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllSurveyQuestionQuery, AllSurveyQuestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllSurveyQuestionQuery, AllSurveyQuestionQueryVariables>(AllSurveyQuestionDocument, options);
        }
export type AllSurveyQuestionQueryHookResult = ReturnType<typeof useAllSurveyQuestionQuery>;
export type AllSurveyQuestionLazyQueryHookResult = ReturnType<typeof useAllSurveyQuestionLazyQuery>;
export type AllSurveyQuestionQueryResult = Apollo.QueryResult<AllSurveyQuestionQuery, AllSurveyQuestionQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    _id
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const VerifyEmailDocument = gql`
    query VerifyEmail($input: EmailVerifyInput!) {
  verifyEmail(input: $input)
}
    `;

/**
 * __useVerifyEmailQuery__
 *
 * To run a query within a React component, call `useVerifyEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyEmailQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyEmailQuery(baseOptions: Apollo.QueryHookOptions<VerifyEmailQuery, VerifyEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VerifyEmailQuery, VerifyEmailQueryVariables>(VerifyEmailDocument, options);
      }
export function useVerifyEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VerifyEmailQuery, VerifyEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VerifyEmailQuery, VerifyEmailQueryVariables>(VerifyEmailDocument, options);
        }
export type VerifyEmailQueryHookResult = ReturnType<typeof useVerifyEmailQuery>;
export type VerifyEmailLazyQueryHookResult = ReturnType<typeof useVerifyEmailLazyQuery>;
export type VerifyEmailQueryResult = Apollo.QueryResult<VerifyEmailQuery, VerifyEmailQueryVariables>;
export const ResendVerifyEmailDocument = gql`
    query ResendVerifyEmail($input: EmailVerifyInput!) {
  resendVerifyEmail(input: $input)
}
    `;

/**
 * __useResendVerifyEmailQuery__
 *
 * To run a query within a React component, call `useResendVerifyEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useResendVerifyEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResendVerifyEmailQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResendVerifyEmailQuery(baseOptions: Apollo.QueryHookOptions<ResendVerifyEmailQuery, ResendVerifyEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ResendVerifyEmailQuery, ResendVerifyEmailQueryVariables>(ResendVerifyEmailDocument, options);
      }
export function useResendVerifyEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ResendVerifyEmailQuery, ResendVerifyEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ResendVerifyEmailQuery, ResendVerifyEmailQueryVariables>(ResendVerifyEmailDocument, options);
        }
export type ResendVerifyEmailQueryHookResult = ReturnType<typeof useResendVerifyEmailQuery>;
export type ResendVerifyEmailLazyQueryHookResult = ReturnType<typeof useResendVerifyEmailLazyQuery>;
export type ResendVerifyEmailQueryResult = Apollo.QueryResult<ResendVerifyEmailQuery, ResendVerifyEmailQueryVariables>;
export const LoginDocument = gql`
    query Login($input: LoginInput!) {
  login(input: $input)
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const MeDocument = gql`
    query Me {
  user {
    _id
    firstName
    lastName
    email
    number
    image
    type
    isAccountVerified
    isSurveyCompleted
    isProfileCompleted
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UpdateSurveyStatusDocument = gql`
    query UpdateSurveyStatus {
  updateSurveyStatus
}
    `;

/**
 * __useUpdateSurveyStatusQuery__
 *
 * To run a query within a React component, call `useUpdateSurveyStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useUpdateSurveyStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdateSurveyStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useUpdateSurveyStatusQuery(baseOptions?: Apollo.QueryHookOptions<UpdateSurveyStatusQuery, UpdateSurveyStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UpdateSurveyStatusQuery, UpdateSurveyStatusQueryVariables>(UpdateSurveyStatusDocument, options);
      }
export function useUpdateSurveyStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UpdateSurveyStatusQuery, UpdateSurveyStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UpdateSurveyStatusQuery, UpdateSurveyStatusQueryVariables>(UpdateSurveyStatusDocument, options);
        }
export type UpdateSurveyStatusQueryHookResult = ReturnType<typeof useUpdateSurveyStatusQuery>;
export type UpdateSurveyStatusLazyQueryHookResult = ReturnType<typeof useUpdateSurveyStatusLazyQuery>;
export type UpdateSurveyStatusQueryResult = Apollo.QueryResult<UpdateSurveyStatusQuery, UpdateSurveyStatusQueryVariables>;
export const UpdateProfileStatusDocument = gql`
    query UpdateProfileStatus {
  updateProfileStatus
}
    `;

/**
 * __useUpdateProfileStatusQuery__
 *
 * To run a query within a React component, call `useUpdateProfileStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdateProfileStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useUpdateProfileStatusQuery(baseOptions?: Apollo.QueryHookOptions<UpdateProfileStatusQuery, UpdateProfileStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UpdateProfileStatusQuery, UpdateProfileStatusQueryVariables>(UpdateProfileStatusDocument, options);
      }
export function useUpdateProfileStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UpdateProfileStatusQuery, UpdateProfileStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UpdateProfileStatusQuery, UpdateProfileStatusQueryVariables>(UpdateProfileStatusDocument, options);
        }
export type UpdateProfileStatusQueryHookResult = ReturnType<typeof useUpdateProfileStatusQuery>;
export type UpdateProfileStatusLazyQueryHookResult = ReturnType<typeof useUpdateProfileStatusLazyQuery>;
export type UpdateProfileStatusQueryResult = Apollo.QueryResult<UpdateProfileStatusQuery, UpdateProfileStatusQueryVariables>;