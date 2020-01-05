import React, { useRef, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { UserLogin, UserData, GraphFormat } from '../interface/interface';
import { convertUserToD3Graph } from '../utils/Converter';
import { drawNetwork } from '../utils/Drawer';
import { GET_USER_FOLLOWERS } from '../querys/userQuerys';


const FollowerMap = (userLogin: UserLogin) => {
    
    const refContainer = useRef<HTMLDivElement>(null);

    const graph: GraphFormat = { nodes: [], links: [] };

    const { loading } = useQuery<UserData, UserLogin>(
        GET_USER_FOLLOWERS,
        { 
            variables: userLogin,
            onCompleted: data => {
                convertUserToD3Graph(data.user, graph);
            }
        }
    );

    useEffect(() => {
        const width = refContainer.current ? refContainer.current.clientWidth : 400;
        const height = (window.innerHeight ?? 600) - 24;
        drawNetwork(refContainer.current, graph, width, height)
    });

    return (
        <div>
            {loading ? (
            <p>Loading ...</p> ) :
            (
            <div>
                <div ref={refContainer}></div>
            </div>
            )}
        </div>
    )
};

export default FollowerMap;