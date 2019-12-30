import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost'
import UserRelationMap from './UserRelationMap';


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

interface UserLogin {
    userLogin: string;
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
`

const UserSearch = () => {

    const [searchTerm, setSearchTerm] = React.useState('')

    const [selectedUserLogin, setSelectedUserLogin] = React.useState('')

    const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setSearchTerm(event.target.value)
    };

    const { loading, data } = useQuery<SearchResult, UserVars>(
        GET_USER_RESULT,
        { variables: { loginSearch: searchTerm } }
    );

    return (
        <div>
            <div>
                <h3>Search for user</h3>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleChange}
                />
                <h3>Avaiable user</h3>
                {loading ? (
                    <p>Loading ...</p>
                ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>login</th>
                                    <th>name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.search && data.search.edges.map((user: User) => (
                                    <tr key={user.node.id}
                                        onClick={() => setSelectedUserLogin(user.node.login)}
                                    >
                                        <td>{user.node.login}</td>
                                        <td>{user.node.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
            </div>
            <div>
                {selectedUserLogin ? (<UserRelationMap userLogin={selectedUserLogin}/>) : <></>}
            </div>
           
        </div>
    )
};

export default UserSearch;