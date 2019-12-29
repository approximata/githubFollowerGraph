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

interface SearchResult {
    search: {
        edges: User[]
    }
}

interface UserVars {
    loginSearch: string;
}

const GET_USER_RESULT = gql`
  query getUserResult($loginSearch: String!) {
    search(query: $loginSearch, type: USER, first: 10) {
      edges {
        node {
          ... on User {
            id
            email
            login
            name
          }
        }
      }
    }
  }
`;


const UserInventoryList = () => {

    const { loading, data } = useQuery<SearchResult, UserVars>(
        GET_USER_RESULT,
        { variables: { loginSearch: 'approxi' } }
    );

    return (
        <div>
            <h3>Avaiable user</h3>
            {loading ? (
                <p>Loading ...</p>
            ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.search && data.search.edges.map((user: User) => (
                                <tr key={user.node.id}>
                                    <td>{user.node.login}</td>
                                    <td>{user.node.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
        </div>
    )
};

export default UserInventoryList;