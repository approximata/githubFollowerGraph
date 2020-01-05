import { GraphFormat } from "../interface/interface";
import * as d3 from "d3";
import { SimulationNodeDatum, ForceLink } from 'd3';

export const drawNetwork = (container: HTMLDivElement | null, graph: GraphFormat, maxWidth: number, maxHeight: number) => {
    if (graph === undefined || container === null) return "Loading...";

    const config = {
        "avatar_size": 30
    };

    const width = maxWidth; 
    const height = maxHeight;

    const ticked = () => {
        link
            .attr("x1", (d: any) => d!.source.x)
            .attr("y1", (d: any) => d!.source.y)
            .attr("x2", (d: any) => d!.target.x)
            .attr("y2", (d: any) => d!.target.y)
        node
            .attr("transform", function (d: any) {
                return "translate(" + d.x + "," + d.y + ")";
            })
    }

    const simulation = d3.forceSimulation(graph.nodes as d3.SimulationNodeDatum[])
        .alphaDecay(0.01)
        .force("link", d3.forceLink()
            .id((d: any) => d.id)
        )
        .force("charge", d3.forceManyBody().strength(-50).distanceMax(400).distanceMin(100))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(20))

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


    const svg = d3.select(container)
        .append("svg")
        .attr("width", width )
        .attr("height", height)
        .append("g");


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

    const link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .style("stroke", "#aaa")

    const node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(graph.nodes)
        .enter().append("g")


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const circles = node.append("svg:circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", (d: any) => (d.isCore ? config.avatar_size / 1.2 : config.avatar_size / 2))
        .attr("opacity", 0.98)
        .style("fill", (d: any) => (`url(#grump_avatar_${d.id})`))
        .call(drag)

    node.append("title")
        .text(function (d: any) { return d.login; });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const lablesForCore = node.append("text")
        .text((d: any) => (d.isCore ? d.login : ''))
        .style("fill", "coral")
        .style("font-size", "10px")
        .attr('x', config.avatar_size / 2 )
        .attr('y', config.avatar_size / 2);

    simulation
        .nodes(graph.nodes as SimulationNodeDatum[])
        .on("tick", ticked);

    simulation.force<ForceLink<any, any>>('link')!.links(graph.links);

}