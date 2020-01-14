export interface User {
  id: string;
  name: string;
  login: string;
  avatarUrl: string;
  followers?: FollowerList;
}

export interface UserData {
  user: User;
}

export interface UserNode {
  node: {
    id: string;
    name: string;
    login: string;
    avatarUrl: string;
    followers?: FollowerList;
  };
}

export interface FollowerList {
  edges: UserNode[];
}

export interface UserLoginName {
  userLoginName: string;
}

export interface SearchResult {
  search: {
    edges: UserNode[];
  };
}

export interface UserVars {
  loginSearch: string;
}

export interface GraphNode {
  id: string;
  name: string;
  login: string;
  avatar: string;
  isCore?: boolean;
}

export interface GraphLink {
  source: string;
  target: string;
}

export interface GraphFormat {
  nodes: [GraphNode?];
  links: [GraphLink?];
}

export interface SearchProps {
  selectedUser: string;
  setSelectedUserLoginName: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
