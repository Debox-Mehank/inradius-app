import { gql } from "@apollo/client";

export const CREATE_USER = gql`
mutation createUser($userInfo: RegisterInput!){
    register(input: $userInfo){
      firstName
      lastName
      email
    }
  }
`