import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost'

interface User {
    node: {
        id: string,
        email: string,
        login: string,
        name: string
    }
}

interface AssignableUsers {
    nodes: User[]
}

interface Repositorie {
    nodes: {
        name: string,
        assignableUsers: AssignableUsers[]
    }
}

interface RepositorieList {
    nodes: Repositorie[]
}

interface UserRepoAndAssignableUsersMap {
    node: {
        id: string,
        email: string,
        login: string,
        name: string
        repositories: RepositorieList
    }
}

interface UserLogin {
    userLogin: string;
}

const GET_USER_RELATION = gql`
  query getUserRelation($userLogin: String!) {
     user(login: $userLogin) {
        id
        name
        login
        avatarUrl(size: 10)
        repositories(first: 100, orderBy: {field: CREATED_AT, direction: DESC}, isFork: false) {
        nodes {
            name
            assignableUsers(first: 10) {
            nodes {
                id
                email
                name
                login
                avatarUrl(size: 10)
            }
            }
        }
        }
    }
}
`;

const UserRelationMap = (userLogin: UserLogin) => {

    const { loading, data } = useQuery<UserRepoAndAssignableUsersMap, UserLogin>(
        GET_USER_RELATION,
        { variables: userLogin }
    );

    return (
        <div>
            {loading ? (
            <p>Loading ...</p> ) :
            (<div>{JSON.stringify(data)}</div>)}
        </div>
    )
};

export default UserRelationMap;