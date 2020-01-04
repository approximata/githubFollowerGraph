import { User, FollowerList, GraphFormat, GraphLink, GraphNode, UserNode } from "../interface/interface";


export const convertUserToD3Graph = (user: User, graph: GraphFormat) => {
    const addLinks = (followers: FollowerList) => {
        followers.edges.forEach((follower: UserNode) => {
            const link: GraphLink = { source: follower.node.id, target: user.id}
            graph.links.push(link)
        })
    }

    const graphNode: GraphNode = {id: user.id, name: user.name, avatar: user.avatarUrl}

    // TODO filter duplicate nodes
    graph.nodes.push(graphNode)

    if (user.followers) {
        addLinks(user.followers);
        user.followers.edges.forEach((follower: UserNode) => (
            convertUserToD3Graph(follower.node, graph)));
    }

    return graph
}