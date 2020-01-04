import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost'
import { UserLogin, UserData, GraphFormat, GraphNode } from '../interface/interface';
import { convertUserToD3Graph } from '../utils/Converter';
import { DragBehavior, SimulationNodeDatum } from 'd3';


const GET_USER_FOLLOWERS = gql`
  query getUserFolowers($userLogin: String!) {
    user(login: $userLogin) {
        id
        name
        login
        avatarUrl(size: 48)
        followers(first: 10) {
        edges {
            node {
            id
            name
            login
            avatarUrl(size: 48)
            followers(first: 10) {
                edges {
                node {
                    id
                    name
                    login
                    avatarUrl(size: 48)
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
        if (graph === undefined) return <div>Loading...</div>;

        const config = {
            "avatar_size": 30
        }

        const margin = { top: 10, right: 30, bottom: 30, left: 40 },
            width = 960 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

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

        const simulation = d3.forceSimulation(graph.nodes as d3.SimulationNodeDatum[])
            .alphaDecay(0.01)
            .force("link", d3.forceLink()
                .id((d: any) => d.id)
                .links(graph.links as d3.SimulationLinkDatum<d3.SimulationNodeDatum>[])
            )
            .force("charge", d3.forceManyBody().strength(-70).distanceMax(500).distanceMin(90))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius(20))
            .on("tick", ticked);

        const dragstarted = (d: any) => {
            simulation.restart();
            simulation.alpha(0.7);
            d.fx = d.x;
            d.fy = d.y;
        }

        const dragged = (d: any) => {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        const dragended = (d: any) => {
            d.fx = null;
            d.fy = null;
            simulation.alphaTarget(0.1);
        }

        const drag = d3.drag<any, any>()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
  
       
        const svg = d3.select(refContainer.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        
       
        const defs = svg.append("svg:defs");

        defs.selectAll(null)
            .data(graph.nodes)
            .enter()
            .append("svg:pattern")
            .attr("id", (d: any) => (`grump_avatar_${d.id}`))
            .attr("width", 1)
            .attr("height", 1)
            .attr('patternContentUnits', 'objectBoundingBox')
            .append("svg:image")
            .attr("xlink:href", (d: any) => (d.avatar))
            .attr("width", 1)
            .attr("height", 1)
            .attr("preserveAspectRatio", "xMinYMin slice")

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
            .append("svg:circle")
            .attr("cx", config.avatar_size / 2)
            .attr("cy", (d: any) =>  config.avatar_size / 2)
            .attr("r", config.avatar_size / 2)
            .attr("opacity", 0.9)
            .style("fill", "#fff")
            .style("fill", (d: any) => (`url(#grump_avatar_${d.id})`))
            .call(drag)

        const text = svg.selectAll("text")
            .data(graph.nodes)
            .enter()
            .append("text");

        const textLabels = text
            .attr("x", function (d: any) { return d.x; })
            .attr("y", function (d: any) { return d.y; })
            .text(function (d:any) { return d.name })
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "red");
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