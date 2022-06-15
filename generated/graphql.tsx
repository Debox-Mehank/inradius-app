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
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  name: Scalars['String'];
  type: AdminRole;
  updatedAt: Scalars['DateTime'];
};

export type AdminLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AdminRegisterInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  type: AdminRole;
};

/** Enum For Type of Admin Roles i.e. Master, Admin & Normal */
export enum AdminRole {
  Admin = 'admin',
  Master = 'master',
  Normal = 'normal'
}

export type Benefit = {
  __typename?: 'Benefit';
  _id: Scalars['ID'];
  active: Scalars['Boolean'];
  benefit: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type BenefitInput = {
  active: Scalars['Boolean'];
  benefit: Scalars['String'];
};

export type DashboardEmployee = {
  __typename?: 'DashboardEmployee';
  employeeId: Employee;
  score: Scalars['Float'];
  userId: User;
};

export type DashboardEmployer = {
  __typename?: 'DashboardEmployer';
  employerId: Employer;
  jobId: EmployerJob;
  score: Scalars['Float'];
  userId: User;
};

/** Enum For Designation of Employee */
export enum DesignationEnum {
  Director = 'director',
  Manager = 'manager',
  Techlead = 'techlead'
}

export type Domain = {
  __typename?: 'Domain';
  _id: Scalars['ID'];
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  domain: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type DomainInput = {
  active: Scalars['Boolean'];
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
  latitude?: Maybe<Scalars['Float']>;
  linkedIn?: Maybe<Scalars['String']>;
  location?: Maybe<Location>;
  longitude?: Maybe<Scalars['Float']>;
  panCard?: Maybe<Scalars['String']>;
  qualification?: Maybe<Qualification>;
  radius?: Maybe<Scalars['Float']>;
  relevantExp?: Maybe<UserExpInYearMonths>;
  resume?: Maybe<Scalars['String']>;
  shortDescription?: Maybe<Scalars['String']>;
  skills: Array<Skill>;
  subDomain: Array<SubDomain>;
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

export type Employer = {
  __typename?: 'Employer';
  _id: Scalars['ID'];
  attritionRate?: Maybe<Scalars['Float']>;
  benefits?: Maybe<Array<Benefit>>;
  companyImage?: Maybe<Scalars['String']>;
  companyLetterHead?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  currentAddress?: Maybe<Scalars['String']>;
  employerVerified?: Maybe<Scalars['Boolean']>;
  employerVerifyStatus?: Maybe<EmployerVerifyStatusEnum>;
  gstNo?: Maybe<Scalars['String']>;
  jobs?: Maybe<Array<EmployerJob>>;
  landline?: Maybe<Scalars['Float']>;
  lastTurnover?: Maybe<Scalars['Float']>;
  linkedIn?: Maybe<Scalars['String']>;
  noOfEmployees?: Maybe<Scalars['Float']>;
  noOfHiring?: Maybe<Scalars['Float']>;
  noOfLocations?: Maybe<Scalars['Float']>;
  panNo?: Maybe<Scalars['String']>;
  registeredAddress?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user: User;
  userSurvey: Array<UserSurvey>;
};

export type EmployerJob = {
  __typename?: 'EmployerJob';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  domain?: Maybe<Domain>;
  industry?: Maybe<Industry>;
  jobDesc?: Maybe<Scalars['String']>;
  jobStatus?: Maybe<EmployerJobStatusEnum>;
  jobTitle?: Maybe<Scalars['String']>;
  jobType?: Maybe<EmployerJobTypeEnum>;
  latitude?: Maybe<Scalars['Float']>;
  listingComplete?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Location>;
  longitude?: Maybe<Scalars['Float']>;
  maxPay?: Maybe<Scalars['Float']>;
  minPay?: Maybe<Scalars['Float']>;
  minRequiredExp?: Maybe<UserExpInYearMonths>;
  qualification?: Maybe<Qualification>;
  radius?: Maybe<Scalars['Float']>;
  skills: Array<Skill>;
  subDomain: Array<SubDomain>;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type EmployerJobInput = {
  _id?: InputMaybe<Scalars['ID']>;
  domain?: InputMaybe<Scalars['ID']>;
  industry?: InputMaybe<Scalars['ID']>;
  jobDesc?: InputMaybe<Scalars['String']>;
  jobStatus?: InputMaybe<EmployerJobStatusEnum>;
  jobTitle?: InputMaybe<Scalars['String']>;
  jobType?: InputMaybe<EmployerJobTypeEnum>;
  latitude?: InputMaybe<Scalars['Float']>;
  listingComplete?: InputMaybe<Scalars['Boolean']>;
  location?: InputMaybe<Scalars['ID']>;
  longitude?: InputMaybe<Scalars['Float']>;
  maxPay?: InputMaybe<Scalars['Float']>;
  minPay?: InputMaybe<Scalars['Float']>;
  minRequiredExp?: InputMaybe<UserExpInYearMonthsInput>;
  qualification?: InputMaybe<Scalars['ID']>;
  radius?: InputMaybe<Scalars['Float']>;
  skills?: InputMaybe<Array<Scalars['ID']>>;
  subDomain?: InputMaybe<Array<Scalars['ID']>>;
};

/** Enum For status of job like open or closed */
export enum EmployerJobStatusEnum {
  Closed = 'Closed',
  Open = 'Open'
}

/** Enum For Type of job like fulltime, part-time, contract, etc. */
export enum EmployerJobTypeEnum {
  Contract = 'Contract',
  Fulltime = 'Fulltime',
  Project = 'Project'
}

/** Enum for steps of employer profile verification */
export enum EmployerVerifyStatusEnum {
  DocumentsPending = 'DocumentsPending',
  DocumentsUploaded = 'DocumentsUploaded'
}

export type Industry = {
  __typename?: 'Industry';
  _id: Scalars['ID'];
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  industry: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type IndustryInput = {
  active: Scalars['Boolean'];
  industry: Scalars['String'];
};

export type Interests = {
  __typename?: 'Interests';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  employee?: Maybe<Scalars['Boolean']>;
  employeeId: Employee;
  employer?: Maybe<Scalars['Boolean']>;
  employerId: Employer;
  jobId: EmployerJob;
  updatedAt: Scalars['DateTime'];
};

export type Location = {
  __typename?: 'Location';
  _id: Scalars['ID'];
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  location: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type LocationInput = {
  active: Scalars['Boolean'];
  location: Scalars['String'];
};

export type LoginContent = {
  __typename?: 'LoginContent';
  _id: Scalars['ID'];
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  imageUrl: Scalars['String'];
  loginContent: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type LoginContentInput = {
  active: Scalars['Boolean'];
  imageUrl: Scalars['String'];
  loginContent: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBenefit: Benefit;
  addDomain: Domain;
  addEmployerJob: Scalars['String'];
  addIndustry: Industry;
  addLocation: Location;
  addLoginContent: LoginContent;
  addQualification: Qualification;
  addSkill: Skill;
  addSkills: Scalars['Boolean'];
  addSubDomain: SubDomain;
  addSurvey: Survey;
  adminRegister: Admin;
  markInterest: Scalars['Boolean'];
  register: User;
  updateBenefit: Benefit;
  updateDomain: Domain;
  updateEmployee: Employee;
  updateEmployer: Employer;
  updateEmployerJob: EmployerJob;
  updateIndustry: Industry;
  updateLocation: Location;
  updateLoginContent: LoginContent;
  updateQualification: Qualification;
  updateSkill: Skill;
  updateSubDomain: SubDomain;
  updateSurveyQuestion: Survey;
};


export type MutationAddBenefitArgs = {
  input: BenefitInput;
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


export type MutationAddLoginContentArgs = {
  input: LoginContentInput;
};


export type MutationAddQualificationArgs = {
  input: QualificationInput;
};


export type MutationAddSkillArgs = {
  input: SkillInput;
};


export type MutationAddSkillsArgs = {
  input: Array<SkillInput>;
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


export type MutationMarkInterestArgs = {
  employeeId?: InputMaybe<Scalars['String']>;
  employerId?: InputMaybe<Scalars['String']>;
  interest: Scalars['Boolean'];
  jobId?: InputMaybe<Scalars['String']>;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateBenefitArgs = {
  input: UpdateBenefitInput;
};


export type MutationUpdateDomainArgs = {
  input: UpdateDomainInput;
};


export type MutationUpdateEmployeeArgs = {
  input: UpdateEmployeeInput;
};


export type MutationUpdateEmployerArgs = {
  input: UpdateEmployerInput;
};


export type MutationUpdateEmployerJobArgs = {
  input: EmployerJobInput;
};


export type MutationUpdateIndustryArgs = {
  input: UpdateIndustryInput;
};


export type MutationUpdateLocationArgs = {
  input: UpdateLocationInput;
};


export type MutationUpdateLoginContentArgs = {
  input: UpdateLoginContentInput;
};


export type MutationUpdateQualificationArgs = {
  input: UpdateQualificationInput;
};


export type MutationUpdateSkillArgs = {
  input: UpdateSkillInput;
};


export type MutationUpdateSubDomainArgs = {
  input: UpdateSubDomainInput;
};


export type MutationUpdateSurveyQuestionArgs = {
  input: UpdateSurveyInput;
};

export type Qualification = {
  __typename?: 'Qualification';
  _id: Scalars['ID'];
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  qualification: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type QualificationInput = {
  active: Scalars['Boolean'];
  qualification: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  adminLogin: Scalars['String'];
  adminLogout: Scalars['Boolean'];
  allBenefits: Array<Benefit>;
  allDomains: Array<Domain>;
  allIndustries: Array<Industry>;
  allLocations: Array<Location>;
  allLoginContent: Array<LoginContent>;
  allQualifications: Array<Qualification>;
  allSkills: Array<Skill>;
  allSubDomains: Array<SubDomain>;
  allSurveyQuestion: Array<Survey>;
  employeeExplore: Array<DashboardEmployer>;
  employerExplore: Array<DashboardEmployee>;
  getAllEmployees: Array<Employee>;
  getAllEmployers: Array<Employer>;
  getEmployee: Employee;
  getEmployer: Employer;
  getEmployerAllJobs: Array<EmployerJob>;
  getJobDetails: EmployerJob;
  getMatched: Array<Interests>;
  getMyInterests: Array<Interests>;
  getShownInterests: Array<Interests>;
  login: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  resendVerifyEmail: Scalars['Boolean'];
  updateProfileStatus: Scalars['Boolean'];
  updateSurveyStatus: Scalars['Boolean'];
  updateUserImage: Scalars['Boolean'];
  user: User;
  verifyEmail: Scalars['Boolean'];
  verifyEmployer: Scalars['Boolean'];
};


export type QueryAdminLoginArgs = {
  input: AdminLoginInput;
};


export type QueryAllSurveyQuestionArgs = {
  type?: InputMaybe<SurveyType>;
};


export type QueryEmployerExploreArgs = {
  jobId: Scalars['String'];
};


export type QueryGetJobDetailsArgs = {
  jobId: Scalars['String'];
};


export type QueryGetMatchedArgs = {
  jobId?: InputMaybe<Scalars['String']>;
};


export type QueryGetMyInterestsArgs = {
  jobId?: InputMaybe<Scalars['String']>;
};


export type QueryGetShownInterestsArgs = {
  jobId?: InputMaybe<Scalars['String']>;
};


export type QueryLoginArgs = {
  input: LoginInput;
};


export type QueryResendVerifyEmailArgs = {
  input: EmailVerifyInput;
};


export type QueryUpdateUserImageArgs = {
  image: Scalars['String'];
};


export type QueryVerifyEmailArgs = {
  input: EmailVerifyInput;
};


export type QueryVerifyEmployerArgs = {
  input: UpdateEmployerVerifyInput;
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
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  skill: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type SkillInput = {
  active: Scalars['Boolean'];
  skill: Scalars['String'];
};

export type SubDomain = {
  __typename?: 'SubDomain';
  _id: Scalars['ID'];
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  domain: Domain;
  subDomain: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type SubDomainInput = {
  active: Scalars['Boolean'];
  domain: Scalars['String'];
  subDomain: Scalars['String'];
};

export type Survey = {
  __typename?: 'Survey';
  _id: Scalars['ID'];
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  options: Array<Scalars['String']>;
  question: Scalars['String'];
  type: SurveyType;
  updatedAt: Scalars['DateTime'];
};

export type SurveyInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  options: Array<Scalars['String']>;
  question: Scalars['String'];
  type: SurveyType;
};

/** Enum For Type of Survey User Roles i.e. Employer & Employee */
export enum SurveyType {
  Employee = 'employee',
  Employer = 'employer'
}

export type UpdateBenefitInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  benefit?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type UpdateDomainInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  domain?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

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
  shortDescription?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<Array<Scalars['ID']>>;
  subDomain?: InputMaybe<Array<Scalars['ID']>>;
  totalExp?: InputMaybe<UserExpInYearMonthsInput>;
  userSurvey?: InputMaybe<Array<UserSurveyInput>>;
  workExp?: InputMaybe<Array<UserWorkExpInput>>;
};

export type UpdateEmployerInput = {
  attritionRate?: InputMaybe<Scalars['Float']>;
  benefits?: InputMaybe<Array<Scalars['ID']>>;
  companyImage?: InputMaybe<Scalars['String']>;
  companyLetterHead?: InputMaybe<Scalars['String']>;
  companyName?: InputMaybe<Scalars['String']>;
  currentAddress?: InputMaybe<Scalars['String']>;
  employerVerifyStatus?: InputMaybe<EmployerVerifyStatusEnum>;
  gstNo?: InputMaybe<Scalars['String']>;
  landline?: InputMaybe<Scalars['Float']>;
  lastTurnover?: InputMaybe<Scalars['Float']>;
  linkedIn?: InputMaybe<Scalars['String']>;
  noOfEmployees?: InputMaybe<Scalars['Float']>;
  noOfHiring?: InputMaybe<Scalars['Float']>;
  noOfLocations?: InputMaybe<Scalars['Float']>;
  panNo?: InputMaybe<Scalars['String']>;
  registeredAddress?: InputMaybe<Scalars['String']>;
  userSurvey?: InputMaybe<Array<UserSurveyInput>>;
};

export type UpdateEmployerVerifyInput = {
  _id: Scalars['ID'];
  employerVerified: Scalars['Boolean'];
};

export type UpdateIndustryInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  industry?: InputMaybe<Scalars['String']>;
};

export type UpdateLocationInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  location?: InputMaybe<Scalars['String']>;
};

export type UpdateLoginContentInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  imageUrl?: InputMaybe<Scalars['String']>;
  loginContent?: InputMaybe<Scalars['String']>;
};

export type UpdateQualificationInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  qualification?: InputMaybe<Scalars['String']>;
};

export type UpdateSkillInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  skill?: InputMaybe<Scalars['String']>;
};

export type UpdateSubDomainInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  subDomain?: InputMaybe<Scalars['String']>;
};

export type UpdateSurveyInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  options?: InputMaybe<Array<Scalars['String']>>;
  question?: InputMaybe<Scalars['String']>;
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
  expectedJoinigDate?: Maybe<Scalars['DateTime']>;
  lastDateAtCurrentEmployer?: Maybe<Scalars['DateTime']>;
  onNotice: Scalars['Boolean'];
  start: Scalars['DateTime'];
};

export type UserWorkExpInput = {
  company: Scalars['String'];
  current: Scalars['Boolean'];
  desc: Scalars['String'];
  designation?: InputMaybe<DesignationEnum>;
  end?: InputMaybe<Scalars['DateTime']>;
  expectedJoinigDate?: InputMaybe<Scalars['DateTime']>;
  lastDateAtCurrentEmployer?: InputMaybe<Scalars['DateTime']>;
  onNotice: Scalars['Boolean'];
  start: Scalars['DateTime'];
};

export type EmployeeExploreQueryVariables = Exact<{ [key: string]: never; }>;


export type EmployeeExploreQuery = { __typename?: 'Query', employeeExplore: Array<{ __typename?: 'DashboardEmployer', score: number, employerId: { __typename?: 'Employer', _id: string, companyName?: string | null, companyImage?: string | null }, userId: { __typename?: 'User', firstName: string, lastName: string, image?: string | null }, jobId: { __typename?: 'EmployerJob', _id: string, jobTitle?: string | null, jobDesc?: string | null, jobType?: EmployerJobTypeEnum | null, minPay?: number | null, maxPay?: number | null, minRequiredExp?: { __typename?: 'UserExpInYearMonths', years: string, months: string } | null, location?: { __typename?: 'Location', _id: string, location: string } | null, domain?: { __typename?: 'Domain', domain: string } | null, subDomain: Array<{ __typename?: 'SubDomain', subDomain: string }>, skills: Array<{ __typename?: 'Skill', skill: string }> } }> };

export type EmployerExploreQueryVariables = Exact<{
  jobId: Scalars['String'];
}>;


export type EmployerExploreQuery = { __typename?: 'Query', employerExplore: Array<{ __typename?: 'DashboardEmployee', score: number, employeeId: { __typename?: 'Employee', _id: string, shortDescription?: string | null, expectedPay?: number | null, location?: { __typename?: 'Location', location: string } | null, domain?: { __typename?: 'Domain', domain: string } | null, subDomain: Array<{ __typename?: 'SubDomain', subDomain: string }>, skills: Array<{ __typename?: 'Skill', skill: string }> }, userId: { __typename?: 'User', firstName: string, lastName: string, image?: string | null } }> };

export type MarkInterestMutationVariables = Exact<{
  interest: Scalars['Boolean'];
  employeeId?: InputMaybe<Scalars['String']>;
  employerId?: InputMaybe<Scalars['String']>;
  jobId?: InputMaybe<Scalars['String']>;
}>;


export type MarkInterestMutation = { __typename?: 'Mutation', markInterest: boolean };

export type GetMyInterestsQueryVariables = Exact<{
  jobId?: InputMaybe<Scalars['String']>;
}>;


export type GetMyInterestsQuery = { __typename?: 'Query', getMyInterests: Array<{ __typename?: 'Interests', employeeId: { __typename?: 'Employee', _id: string, shortDescription?: string | null, expectedPay?: number | null, user: { __typename?: 'User', firstName: string, lastName: string, image?: string | null }, location?: { __typename?: 'Location', location: string } | null, domain?: { __typename?: 'Domain', domain: string } | null, subDomain: Array<{ __typename?: 'SubDomain', subDomain: string }>, skills: Array<{ __typename?: 'Skill', skill: string }> }, employerId: { __typename?: 'Employer', _id: string, companyImage?: string | null, companyName?: string | null }, jobId: { __typename?: 'EmployerJob', _id: string, jobTitle?: string | null, jobDesc?: string | null, jobType?: EmployerJobTypeEnum | null, minPay?: number | null, maxPay?: number | null, location?: { __typename?: 'Location', location: string } | null, domain?: { __typename?: 'Domain', domain: string } | null, subDomain: Array<{ __typename?: 'SubDomain', subDomain: string }>, skills: Array<{ __typename?: 'Skill', skill: string }>, minRequiredExp?: { __typename?: 'UserExpInYearMonths', years: string, months: string } | null } }> };

export type GetShownInterestsQueryVariables = Exact<{
  jobId?: InputMaybe<Scalars['String']>;
}>;


export type GetShownInterestsQuery = { __typename?: 'Query', getShownInterests: Array<{ __typename?: 'Interests', employeeId: { __typename?: 'Employee', _id: string, shortDescription?: string | null, expectedPay?: number | null, user: { __typename?: 'User', firstName: string, lastName: string, image?: string | null }, location?: { __typename?: 'Location', location: string } | null, domain?: { __typename?: 'Domain', domain: string } | null, subDomain: Array<{ __typename?: 'SubDomain', subDomain: string }>, skills: Array<{ __typename?: 'Skill', skill: string }> }, employerId: { __typename?: 'Employer', _id: string, companyImage?: string | null, companyName?: string | null }, jobId: { __typename?: 'EmployerJob', _id: string, jobTitle?: string | null, jobDesc?: string | null, jobType?: EmployerJobTypeEnum | null, minPay?: number | null, maxPay?: number | null, location?: { __typename?: 'Location', location: string } | null, domain?: { __typename?: 'Domain', domain: string } | null, subDomain: Array<{ __typename?: 'SubDomain', subDomain: string }>, skills: Array<{ __typename?: 'Skill', skill: string }>, minRequiredExp?: { __typename?: 'UserExpInYearMonths', years: string, months: string } | null } }> };

export type GetMatchedQueryVariables = Exact<{
  jobId?: InputMaybe<Scalars['String']>;
}>;


export type GetMatchedQuery = { __typename?: 'Query', getMatched: Array<{ __typename?: 'Interests', employeeId: { __typename?: 'Employee', _id: string, shortDescription?: string | null, expectedPay?: number | null, user: { __typename?: 'User', firstName: string, lastName: string, image?: string | null }, location?: { __typename?: 'Location', location: string } | null, domain?: { __typename?: 'Domain', domain: string } | null, subDomain: Array<{ __typename?: 'SubDomain', subDomain: string }>, skills: Array<{ __typename?: 'Skill', skill: string }> }, employerId: { __typename?: 'Employer', _id: string, companyImage?: string | null, companyName?: string | null }, jobId: { __typename?: 'EmployerJob', _id: string, jobTitle?: string | null, jobDesc?: string | null, jobType?: EmployerJobTypeEnum | null, minPay?: number | null, maxPay?: number | null, location?: { __typename?: 'Location', location: string } | null, domain?: { __typename?: 'Domain', domain: string } | null, subDomain: Array<{ __typename?: 'SubDomain', subDomain: string }>, skills: Array<{ __typename?: 'Skill', skill: string }>, minRequiredExp?: { __typename?: 'UserExpInYearMonths', years: string, months: string } | null } }> };

export type UpdateEmployeeMutationVariables = Exact<{
  input: UpdateEmployeeInput;
}>;


export type UpdateEmployeeMutation = { __typename?: 'Mutation', updateEmployee: { __typename?: 'Employee', user: { __typename?: 'User', email: string } } };

export type GetEmployeeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEmployeeQuery = { __typename?: 'Query', getEmployee: { __typename?: 'Employee', _id: string, shortDescription?: string | null, radius?: number | null, latitude?: number | null, longitude?: number | null, fresher?: boolean | null, currentPay?: number | null, expectedPay?: number | null, linkedIn?: string | null, resume?: string | null, gender?: EmployeeGenderEnum | null, currentAddress?: string | null, dob?: any | null, panCard?: string | null, aadharCard?: string | null, location?: { __typename?: 'Location', _id: string, location: string } | null, qualification?: { __typename?: 'Qualification', _id: string, qualification: string } | null, industry?: { __typename?: 'Industry', _id: string, industry: string } | null, domain?: { __typename?: 'Domain', _id: string, domain: string } | null, subDomain: Array<{ __typename?: 'SubDomain', _id: string, subDomain: string }>, skills: Array<{ __typename?: 'Skill', _id: string, skill: string }>, workExp: Array<{ __typename?: 'UserWorkExp', company: string, designation: DesignationEnum, desc: string, start: any, end?: any | null, current: boolean, onNotice: boolean, lastDateAtCurrentEmployer?: any | null, expectedJoinigDate?: any | null }>, totalExp?: { __typename?: 'UserExpInYearMonths', years: string, months: string } | null, relevantExp?: { __typename?: 'UserExpInYearMonths', years: string, months: string } | null } };

export type UpdateEmployerMutationVariables = Exact<{
  input: UpdateEmployerInput;
}>;


export type UpdateEmployerMutation = { __typename?: 'Mutation', updateEmployer: { __typename?: 'Employer', user: { __typename?: 'User', email: string } } };

export type GetEmployerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEmployerQuery = { __typename?: 'Query', getEmployer: { __typename?: 'Employer', _id: string, companyName?: string | null, companyImage?: string | null, companyLetterHead?: string | null, employerVerifyStatus?: EmployerVerifyStatusEnum | null, employerVerified?: boolean | null, linkedIn?: string | null, gstNo?: string | null, panNo?: string | null, registeredAddress?: string | null, currentAddress?: string | null, noOfLocations?: number | null, landline?: number | null, noOfEmployees?: number | null, lastTurnover?: number | null, noOfHiring?: number | null, attritionRate?: number | null, benefits?: Array<{ __typename?: 'Benefit', _id: string, benefit: string }> | null, jobs?: Array<{ __typename?: 'EmployerJob', _id: string, jobTitle?: string | null, jobDesc?: string | null, jobType?: EmployerJobTypeEnum | null, jobStatus?: EmployerJobStatusEnum | null, listingComplete?: boolean | null, radius?: number | null, latitude?: number | null, longitude?: number | null, minPay?: number | null, maxPay?: number | null, location?: { __typename?: 'Location', _id: string, location: string } | null, qualification?: { __typename?: 'Qualification', _id: string, qualification: string } | null, industry?: { __typename?: 'Industry', _id: string, industry: string } | null, domain?: { __typename?: 'Domain', _id: string, domain: string } | null, subDomain: Array<{ __typename?: 'SubDomain', _id: string, subDomain: string }>, skills: Array<{ __typename?: 'Skill', _id: string, skill: string }>, minRequiredExp?: { __typename?: 'UserExpInYearMonths', years: string, months: string } | null }> | null } };

export type UpdateEmployerJobMutationVariables = Exact<{
  input: EmployerJobInput;
}>;


export type UpdateEmployerJobMutation = { __typename?: 'Mutation', updateEmployerJob: { __typename?: 'EmployerJob', _id: string } };

export type GetJobDetailsQueryVariables = Exact<{
  jobId: Scalars['String'];
}>;


export type GetJobDetailsQuery = { __typename?: 'Query', getJobDetails: { __typename?: 'EmployerJob', _id: string, jobTitle?: string | null, jobDesc?: string | null, jobType?: EmployerJobTypeEnum | null, jobStatus?: EmployerJobStatusEnum | null, listingComplete?: boolean | null, radius?: number | null, latitude?: number | null, longitude?: number | null, minPay?: number | null, maxPay?: number | null, location?: { __typename?: 'Location', _id: string, location: string } | null, qualification?: { __typename?: 'Qualification', _id: string, qualification: string } | null, industry?: { __typename?: 'Industry', _id: string, industry: string } | null, domain?: { __typename?: 'Domain', _id: string, domain: string } | null, subDomain: Array<{ __typename?: 'SubDomain', _id: string, subDomain: string }>, skills: Array<{ __typename?: 'Skill', _id: string, skill: string }>, minRequiredExp?: { __typename?: 'UserExpInYearMonths', years: string, months: string } | null } };

export type AddEmployerJobMutationVariables = Exact<{ [key: string]: never; }>;


export type AddEmployerJobMutation = { __typename?: 'Mutation', addEmployerJob: string };

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


export type AllSkillsQuery = { __typename?: 'Query', allSkills: Array<{ __typename?: 'Skill', _id: string, skill: string }> };

export type AllSurveyQuestionQueryVariables = Exact<{
  type?: InputMaybe<SurveyType>;
}>;


export type AllSurveyQuestionQuery = { __typename?: 'Query', allSurveyQuestion: Array<{ __typename?: 'Survey', _id: string, question: string, options: Array<string>, type: SurveyType, createdAt: any, updatedAt: any, active: boolean }> };

export type AllBenefitsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllBenefitsQuery = { __typename?: 'Query', allBenefits: Array<{ __typename?: 'Benefit', _id: string, benefit: string }> };

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


export type LoginQuery = { __typename?: 'Query', login: boolean };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', user: { __typename?: 'User', _id: string, firstName: string, lastName: string, email: string, number: string, image?: string | null, type: UserRole, isAccountVerified: boolean, isSurveyCompleted: boolean, isProfileCompleted: boolean } };

export type UpdateSurveyStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type UpdateSurveyStatusQuery = { __typename?: 'Query', updateSurveyStatus: boolean };

export type UpdateUserImageQueryVariables = Exact<{
  image: Scalars['String'];
}>;


export type UpdateUserImageQuery = { __typename?: 'Query', updateUserImage: boolean };

export type UpdateProfileStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type UpdateProfileStatusQuery = { __typename?: 'Query', updateProfileStatus: boolean };


export const EmployeeExploreDocument = gql`
    query EmployeeExplore {
  employeeExplore {
    score
    employerId {
      _id
      companyName
      companyImage
    }
    userId {
      firstName
      lastName
      image
    }
    jobId {
      _id
      jobTitle
      jobDesc
      jobType
      minRequiredExp {
        years
        months
      }
      location {
        _id
        location
      }
      domain {
        domain
      }
      subDomain {
        subDomain
      }
      skills {
        skill
      }
      minPay
      maxPay
    }
  }
}
    `;

/**
 * __useEmployeeExploreQuery__
 *
 * To run a query within a React component, call `useEmployeeExploreQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmployeeExploreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmployeeExploreQuery({
 *   variables: {
 *   },
 * });
 */
export function useEmployeeExploreQuery(baseOptions?: Apollo.QueryHookOptions<EmployeeExploreQuery, EmployeeExploreQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EmployeeExploreQuery, EmployeeExploreQueryVariables>(EmployeeExploreDocument, options);
      }
export function useEmployeeExploreLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EmployeeExploreQuery, EmployeeExploreQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EmployeeExploreQuery, EmployeeExploreQueryVariables>(EmployeeExploreDocument, options);
        }
export type EmployeeExploreQueryHookResult = ReturnType<typeof useEmployeeExploreQuery>;
export type EmployeeExploreLazyQueryHookResult = ReturnType<typeof useEmployeeExploreLazyQuery>;
export type EmployeeExploreQueryResult = Apollo.QueryResult<EmployeeExploreQuery, EmployeeExploreQueryVariables>;
export const EmployerExploreDocument = gql`
    query EmployerExplore($jobId: String!) {
  employerExplore(jobId: $jobId) {
    employeeId {
      _id
      shortDescription
      location {
        location
      }
      domain {
        domain
      }
      subDomain {
        subDomain
      }
      skills {
        skill
      }
      expectedPay
    }
    userId {
      firstName
      lastName
      image
    }
    score
  }
}
    `;

/**
 * __useEmployerExploreQuery__
 *
 * To run a query within a React component, call `useEmployerExploreQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmployerExploreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmployerExploreQuery({
 *   variables: {
 *      jobId: // value for 'jobId'
 *   },
 * });
 */
export function useEmployerExploreQuery(baseOptions: Apollo.QueryHookOptions<EmployerExploreQuery, EmployerExploreQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EmployerExploreQuery, EmployerExploreQueryVariables>(EmployerExploreDocument, options);
      }
export function useEmployerExploreLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EmployerExploreQuery, EmployerExploreQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EmployerExploreQuery, EmployerExploreQueryVariables>(EmployerExploreDocument, options);
        }
export type EmployerExploreQueryHookResult = ReturnType<typeof useEmployerExploreQuery>;
export type EmployerExploreLazyQueryHookResult = ReturnType<typeof useEmployerExploreLazyQuery>;
export type EmployerExploreQueryResult = Apollo.QueryResult<EmployerExploreQuery, EmployerExploreQueryVariables>;
export const MarkInterestDocument = gql`
    mutation MarkInterest($interest: Boolean!, $employeeId: String, $employerId: String, $jobId: String) {
  markInterest(
    interest: $interest
    employeeId: $employeeId
    employerId: $employerId
    jobId: $jobId
  )
}
    `;
export type MarkInterestMutationFn = Apollo.MutationFunction<MarkInterestMutation, MarkInterestMutationVariables>;

/**
 * __useMarkInterestMutation__
 *
 * To run a mutation, you first call `useMarkInterestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkInterestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markInterestMutation, { data, loading, error }] = useMarkInterestMutation({
 *   variables: {
 *      interest: // value for 'interest'
 *      employeeId: // value for 'employeeId'
 *      employerId: // value for 'employerId'
 *      jobId: // value for 'jobId'
 *   },
 * });
 */
export function useMarkInterestMutation(baseOptions?: Apollo.MutationHookOptions<MarkInterestMutation, MarkInterestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkInterestMutation, MarkInterestMutationVariables>(MarkInterestDocument, options);
      }
export type MarkInterestMutationHookResult = ReturnType<typeof useMarkInterestMutation>;
export type MarkInterestMutationResult = Apollo.MutationResult<MarkInterestMutation>;
export type MarkInterestMutationOptions = Apollo.BaseMutationOptions<MarkInterestMutation, MarkInterestMutationVariables>;
export const GetMyInterestsDocument = gql`
    query GetMyInterests($jobId: String) {
  getMyInterests(jobId: $jobId) {
    employeeId {
      _id
      shortDescription
      user {
        firstName
        lastName
        image
      }
      location {
        location
      }
      domain {
        domain
      }
      subDomain {
        subDomain
      }
      skills {
        skill
      }
      expectedPay
    }
    employerId {
      _id
      companyImage
      companyName
    }
    jobId {
      _id
      jobTitle
      jobDesc
      jobType
      location {
        location
      }
      domain {
        domain
      }
      subDomain {
        subDomain
      }
      skills {
        skill
      }
      minRequiredExp {
        years
        months
      }
      minPay
      maxPay
    }
  }
}
    `;

/**
 * __useGetMyInterestsQuery__
 *
 * To run a query within a React component, call `useGetMyInterestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyInterestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyInterestsQuery({
 *   variables: {
 *      jobId: // value for 'jobId'
 *   },
 * });
 */
export function useGetMyInterestsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyInterestsQuery, GetMyInterestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyInterestsQuery, GetMyInterestsQueryVariables>(GetMyInterestsDocument, options);
      }
export function useGetMyInterestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyInterestsQuery, GetMyInterestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyInterestsQuery, GetMyInterestsQueryVariables>(GetMyInterestsDocument, options);
        }
export type GetMyInterestsQueryHookResult = ReturnType<typeof useGetMyInterestsQuery>;
export type GetMyInterestsLazyQueryHookResult = ReturnType<typeof useGetMyInterestsLazyQuery>;
export type GetMyInterestsQueryResult = Apollo.QueryResult<GetMyInterestsQuery, GetMyInterestsQueryVariables>;
export const GetShownInterestsDocument = gql`
    query GetShownInterests($jobId: String) {
  getShownInterests(jobId: $jobId) {
    employeeId {
      _id
      shortDescription
      user {
        firstName
        lastName
        image
      }
      location {
        location
      }
      domain {
        domain
      }
      subDomain {
        subDomain
      }
      skills {
        skill
      }
      expectedPay
    }
    employerId {
      _id
      companyImage
      companyName
    }
    jobId {
      _id
      jobTitle
      jobDesc
      jobType
      location {
        location
      }
      domain {
        domain
      }
      subDomain {
        subDomain
      }
      skills {
        skill
      }
      minRequiredExp {
        years
        months
      }
      minPay
      maxPay
    }
  }
}
    `;

/**
 * __useGetShownInterestsQuery__
 *
 * To run a query within a React component, call `useGetShownInterestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShownInterestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShownInterestsQuery({
 *   variables: {
 *      jobId: // value for 'jobId'
 *   },
 * });
 */
export function useGetShownInterestsQuery(baseOptions?: Apollo.QueryHookOptions<GetShownInterestsQuery, GetShownInterestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetShownInterestsQuery, GetShownInterestsQueryVariables>(GetShownInterestsDocument, options);
      }
export function useGetShownInterestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetShownInterestsQuery, GetShownInterestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetShownInterestsQuery, GetShownInterestsQueryVariables>(GetShownInterestsDocument, options);
        }
export type GetShownInterestsQueryHookResult = ReturnType<typeof useGetShownInterestsQuery>;
export type GetShownInterestsLazyQueryHookResult = ReturnType<typeof useGetShownInterestsLazyQuery>;
export type GetShownInterestsQueryResult = Apollo.QueryResult<GetShownInterestsQuery, GetShownInterestsQueryVariables>;
export const GetMatchedDocument = gql`
    query GetMatched($jobId: String) {
  getMatched(jobId: $jobId) {
    employeeId {
      _id
      shortDescription
      user {
        firstName
        lastName
        image
      }
      location {
        location
      }
      domain {
        domain
      }
      subDomain {
        subDomain
      }
      skills {
        skill
      }
      expectedPay
    }
    employerId {
      _id
      companyImage
      companyName
    }
    jobId {
      _id
      jobTitle
      jobDesc
      jobType
      location {
        location
      }
      domain {
        domain
      }
      subDomain {
        subDomain
      }
      skills {
        skill
      }
      minRequiredExp {
        years
        months
      }
      minPay
      maxPay
    }
  }
}
    `;

/**
 * __useGetMatchedQuery__
 *
 * To run a query within a React component, call `useGetMatchedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMatchedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMatchedQuery({
 *   variables: {
 *      jobId: // value for 'jobId'
 *   },
 * });
 */
export function useGetMatchedQuery(baseOptions?: Apollo.QueryHookOptions<GetMatchedQuery, GetMatchedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMatchedQuery, GetMatchedQueryVariables>(GetMatchedDocument, options);
      }
export function useGetMatchedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMatchedQuery, GetMatchedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMatchedQuery, GetMatchedQueryVariables>(GetMatchedDocument, options);
        }
export type GetMatchedQueryHookResult = ReturnType<typeof useGetMatchedQuery>;
export type GetMatchedLazyQueryHookResult = ReturnType<typeof useGetMatchedLazyQuery>;
export type GetMatchedQueryResult = Apollo.QueryResult<GetMatchedQuery, GetMatchedQueryVariables>;
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
    shortDescription
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
      onNotice
      lastDateAtCurrentEmployer
      expectedJoinigDate
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
export const UpdateEmployerDocument = gql`
    mutation UpdateEmployer($input: UpdateEmployerInput!) {
  updateEmployer(input: $input) {
    user {
      email
    }
  }
}
    `;
export type UpdateEmployerMutationFn = Apollo.MutationFunction<UpdateEmployerMutation, UpdateEmployerMutationVariables>;

/**
 * __useUpdateEmployerMutation__
 *
 * To run a mutation, you first call `useUpdateEmployerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEmployerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEmployerMutation, { data, loading, error }] = useUpdateEmployerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEmployerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEmployerMutation, UpdateEmployerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEmployerMutation, UpdateEmployerMutationVariables>(UpdateEmployerDocument, options);
      }
export type UpdateEmployerMutationHookResult = ReturnType<typeof useUpdateEmployerMutation>;
export type UpdateEmployerMutationResult = Apollo.MutationResult<UpdateEmployerMutation>;
export type UpdateEmployerMutationOptions = Apollo.BaseMutationOptions<UpdateEmployerMutation, UpdateEmployerMutationVariables>;
export const GetEmployerDocument = gql`
    query GetEmployer {
  getEmployer {
    _id
    companyName
    companyImage
    companyLetterHead
    employerVerifyStatus
    employerVerified
    benefits {
      _id
      benefit
    }
    linkedIn
    gstNo
    panNo
    registeredAddress
    currentAddress
    noOfLocations
    landline
    noOfEmployees
    lastTurnover
    noOfHiring
    attritionRate
    jobs {
      _id
      jobTitle
      jobDesc
      jobType
      jobStatus
      listingComplete
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
      minRequiredExp {
        years
        months
      }
      minPay
      maxPay
    }
  }
}
    `;

/**
 * __useGetEmployerQuery__
 *
 * To run a query within a React component, call `useGetEmployerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmployerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmployerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEmployerQuery(baseOptions?: Apollo.QueryHookOptions<GetEmployerQuery, GetEmployerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEmployerQuery, GetEmployerQueryVariables>(GetEmployerDocument, options);
      }
export function useGetEmployerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEmployerQuery, GetEmployerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEmployerQuery, GetEmployerQueryVariables>(GetEmployerDocument, options);
        }
export type GetEmployerQueryHookResult = ReturnType<typeof useGetEmployerQuery>;
export type GetEmployerLazyQueryHookResult = ReturnType<typeof useGetEmployerLazyQuery>;
export type GetEmployerQueryResult = Apollo.QueryResult<GetEmployerQuery, GetEmployerQueryVariables>;
export const UpdateEmployerJobDocument = gql`
    mutation UpdateEmployerJob($input: EmployerJobInput!) {
  updateEmployerJob(input: $input) {
    _id
  }
}
    `;
export type UpdateEmployerJobMutationFn = Apollo.MutationFunction<UpdateEmployerJobMutation, UpdateEmployerJobMutationVariables>;

/**
 * __useUpdateEmployerJobMutation__
 *
 * To run a mutation, you first call `useUpdateEmployerJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEmployerJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEmployerJobMutation, { data, loading, error }] = useUpdateEmployerJobMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEmployerJobMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEmployerJobMutation, UpdateEmployerJobMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEmployerJobMutation, UpdateEmployerJobMutationVariables>(UpdateEmployerJobDocument, options);
      }
export type UpdateEmployerJobMutationHookResult = ReturnType<typeof useUpdateEmployerJobMutation>;
export type UpdateEmployerJobMutationResult = Apollo.MutationResult<UpdateEmployerJobMutation>;
export type UpdateEmployerJobMutationOptions = Apollo.BaseMutationOptions<UpdateEmployerJobMutation, UpdateEmployerJobMutationVariables>;
export const GetJobDetailsDocument = gql`
    query GetJobDetails($jobId: String!) {
  getJobDetails(jobId: $jobId) {
    _id
    jobTitle
    jobDesc
    jobType
    jobStatus
    listingComplete
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
    minRequiredExp {
      years
      months
    }
    minPay
    maxPay
  }
}
    `;

/**
 * __useGetJobDetailsQuery__
 *
 * To run a query within a React component, call `useGetJobDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJobDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJobDetailsQuery({
 *   variables: {
 *      jobId: // value for 'jobId'
 *   },
 * });
 */
export function useGetJobDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetJobDetailsQuery, GetJobDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetJobDetailsQuery, GetJobDetailsQueryVariables>(GetJobDetailsDocument, options);
      }
export function useGetJobDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetJobDetailsQuery, GetJobDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetJobDetailsQuery, GetJobDetailsQueryVariables>(GetJobDetailsDocument, options);
        }
export type GetJobDetailsQueryHookResult = ReturnType<typeof useGetJobDetailsQuery>;
export type GetJobDetailsLazyQueryHookResult = ReturnType<typeof useGetJobDetailsLazyQuery>;
export type GetJobDetailsQueryResult = Apollo.QueryResult<GetJobDetailsQuery, GetJobDetailsQueryVariables>;
export const AddEmployerJobDocument = gql`
    mutation AddEmployerJob {
  addEmployerJob
}
    `;
export type AddEmployerJobMutationFn = Apollo.MutationFunction<AddEmployerJobMutation, AddEmployerJobMutationVariables>;

/**
 * __useAddEmployerJobMutation__
 *
 * To run a mutation, you first call `useAddEmployerJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEmployerJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEmployerJobMutation, { data, loading, error }] = useAddEmployerJobMutation({
 *   variables: {
 *   },
 * });
 */
export function useAddEmployerJobMutation(baseOptions?: Apollo.MutationHookOptions<AddEmployerJobMutation, AddEmployerJobMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddEmployerJobMutation, AddEmployerJobMutationVariables>(AddEmployerJobDocument, options);
      }
export type AddEmployerJobMutationHookResult = ReturnType<typeof useAddEmployerJobMutation>;
export type AddEmployerJobMutationResult = Apollo.MutationResult<AddEmployerJobMutation>;
export type AddEmployerJobMutationOptions = Apollo.BaseMutationOptions<AddEmployerJobMutation, AddEmployerJobMutationVariables>;
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
    active
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
export const AllBenefitsDocument = gql`
    query AllBenefits {
  allBenefits {
    _id
    benefit
  }
}
    `;

/**
 * __useAllBenefitsQuery__
 *
 * To run a query within a React component, call `useAllBenefitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllBenefitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllBenefitsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllBenefitsQuery(baseOptions?: Apollo.QueryHookOptions<AllBenefitsQuery, AllBenefitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllBenefitsQuery, AllBenefitsQueryVariables>(AllBenefitsDocument, options);
      }
export function useAllBenefitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllBenefitsQuery, AllBenefitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllBenefitsQuery, AllBenefitsQueryVariables>(AllBenefitsDocument, options);
        }
export type AllBenefitsQueryHookResult = ReturnType<typeof useAllBenefitsQuery>;
export type AllBenefitsLazyQueryHookResult = ReturnType<typeof useAllBenefitsLazyQuery>;
export type AllBenefitsQueryResult = Apollo.QueryResult<AllBenefitsQuery, AllBenefitsQueryVariables>;
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
export const LogoutDocument = gql`
    query Logout {
  logout
}
    `;

/**
 * __useLogoutQuery__
 *
 * To run a query within a React component, call `useLogoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useLogoutQuery(baseOptions?: Apollo.QueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
      }
export function useLogoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export type LogoutQueryHookResult = ReturnType<typeof useLogoutQuery>;
export type LogoutLazyQueryHookResult = ReturnType<typeof useLogoutLazyQuery>;
export type LogoutQueryResult = Apollo.QueryResult<LogoutQuery, LogoutQueryVariables>;
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
export const UpdateUserImageDocument = gql`
    query UpdateUserImage($image: String!) {
  updateUserImage(image: $image)
}
    `;

/**
 * __useUpdateUserImageQuery__
 *
 * To run a query within a React component, call `useUpdateUserImageQuery` and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserImageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdateUserImageQuery({
 *   variables: {
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUpdateUserImageQuery(baseOptions: Apollo.QueryHookOptions<UpdateUserImageQuery, UpdateUserImageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UpdateUserImageQuery, UpdateUserImageQueryVariables>(UpdateUserImageDocument, options);
      }
export function useUpdateUserImageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UpdateUserImageQuery, UpdateUserImageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UpdateUserImageQuery, UpdateUserImageQueryVariables>(UpdateUserImageDocument, options);
        }
export type UpdateUserImageQueryHookResult = ReturnType<typeof useUpdateUserImageQuery>;
export type UpdateUserImageLazyQueryHookResult = ReturnType<typeof useUpdateUserImageLazyQuery>;
export type UpdateUserImageQueryResult = Apollo.QueryResult<UpdateUserImageQuery, UpdateUserImageQueryVariables>;
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