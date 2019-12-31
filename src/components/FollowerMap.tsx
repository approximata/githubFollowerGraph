import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost'
import { UserLogin, UserData, GraphFormat } from '../interface/interface';
import { convertUserToD3Graph } from '../utils/Converter';


const GET_USER_FOLLOWERS = gql`
  query getUserFolowers($userLogin: String!) {
    user(login: $userLogin) {
        id
        name
        login
        avatarUrl(size: 10)
        followers(first: 10) {
        edges {
            node {
            id
            name
            login
            avatarUrl(size: 10)
            followers(first: 10) {
                edges {
                node {
                    id
                    name
                    login
                    avatarUrl(size: 10)
                }
                }
            }
            }
        }
        }
    }
}
`;

const FollowerMap = (userLogin: UserLogin) => {

    const [state, setState] = useState();

    const graph: GraphFormat = { nodes: [], links: [] };

    const { loading, data, error } = useQuery<UserData, UserLogin>(
        GET_USER_FOLLOWERS,
        { 
            variables: userLogin,
            onCompleted: data => {
                console.log(data)
                setState(convertUserToD3Graph(data.user, graph))
            }
        }
    );



    return (
        <div>
            {loading ? (
            <p>Loading ...</p> ) :
            (
            <div>
                <h2>original</h2>
                {
                    JSON.stringify(data)
                }
                <h2>formated</h2>
                {
                   JSON.stringify(state)
                }
            </div>
            )}
        </div>
    )
};

export default FollowerMap;