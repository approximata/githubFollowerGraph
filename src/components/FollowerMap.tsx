import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
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

    const refContainer = useRef<HTMLDivElement>(null);

    const graph: GraphFormat = { nodes: [], links: [] };

    const { loading, data } = useQuery<UserData, UserLogin>(
        GET_USER_FOLLOWERS,
        { 
            variables: userLogin,
            onCompleted: data => {
                setState(convertUserToD3Graph(data.user, graph));
            }
        }
    );

    const drawNetwork = (graph: GraphFormat, maxWidth: number) => {
        if (graph === undefined) return;

        const ticked = () => {
            link
                .attr("x1", (d: any) => d!.source.x)
                .attr("y1", (d: any) => d!.source.y)
                .attr("x2", (d: any) => d!.target.x)
                .attr("y2", (d: any) => d!.target.y)

            node
                .attr("cx", (d: any) => d!.x + 6)
                .attr("cy", (d: any) => d!.y - 6)
        }

        const margin = { top: 10, right: 30, bottom: 30, left: 40 },
            width = maxWidth - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

        const svg = d3.select(refContainer.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        const link = svg
            .selectAll("line")
            .data(graph.links)
            .enter()
            .append("line")
            .style("stroke", "#aaa")

        const node = svg
            .selectAll("circle")
            .data(graph.nodes)
            .enter()
            .append("svg:image")
            .attr("r", 20)
            .style("fill", "#eee");
        
        const image = node.append("svg:image")
            .attr("xlink:href", (d: any) => d.avatar)
            .attr("x", (d: any) => -25)
            .attr("y", (d: any) => -25)
            .attr("height", 50)
            .attr("width", 50);

        const simulation = d3.forceSimulation(graph.nodes as d3.SimulationNodeDatum[])                 
            .force("link", d3.forceLink()                             
                .id((d: any) => d.id)                    
                .links(graph.links as d3.SimulationLinkDatum<d3.SimulationNodeDatum>[])                                    
            )
            .force("charge", d3.forceManyBody().strength(-400))         
            .force("center", d3.forceCenter(width / 2, height / 2)) 
            .on("end", ticked);
    }

    useEffect(() => {
        const width = refContainer.current ? refContainer.current.offsetWidth : 0;

        drawNetwork(state, width)
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