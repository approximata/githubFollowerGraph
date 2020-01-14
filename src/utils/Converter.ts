import {
  User,
  FollowerList,
  GraphFormat,
  GraphLink,
  GraphNode,
  UserNode
} from "../interface/interface";

export const convertUserToD3Graph = (user: User, graph: GraphFormat) => {
  const addLinks = (followers: FollowerList) => {
    followers.edges.forEach((follower: UserNode) => {
      const link: GraphLink = { source: follower.node.id, target: user.id };
      graph.links.push(link);
    });
  };

  const graphNode: GraphNode = {
    id: user.id,
    name: user.name,
    login: user.login,
    avatar: user.avatarUrl
  };

  if (graph.nodes.length === 1) {
    graph.nodes[0]!.isCore = true;
  }

  if (!graph.nodes.some(node => node?.id === graphNode.id)) {
    graph.nodes.push(graphNode);
  }

  if (user.followers) {
    addLinks(user.followers);
    user.followers.edges.forEach((follower: UserNode) =>
      convertUserToD3Graph(follower.node, graph)
    );
  }

  return graph;
};
