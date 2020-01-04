import { gql } from 'apollo-boost';

const config = {
    avatarSize: 48,
    first: 10
}


export const GET_USER_FOLLOWERS = gql`
  query getUserFolowers($userLogin: String!) {
    user(login: $userLogin) {
        id
        name
        login
        avatarUrl(size: ${config.avatarSize})
        followers(first: ${config.first}) {
        edges {
            node {
            id
            name
            login
            avatarUrl(size: ${config.avatarSize})
            followers(first: ${config.first}) {
                edges {
                node {
                    id
                    name
                    login
                    avatarUrl(size: ${config.avatarSize})
                }
                }
            }
            }
        }
        }
    }
}
`;

export const GET_USER_RESULT = gql`
  query getUserResult($loginSearch: String!) {
    search(query: $loginSearch, type: USER, first: ${config.first}) {
      edges {
        node {
          ... on User {
            id
            login
            name
            avatarUrl(size: ${config.avatarSize})
          }
        }
      }
    }
  }
`;