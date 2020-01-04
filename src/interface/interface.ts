import { HttpLink } from "apollo-boost";

export interface User {
        id: string,
        name: string
        login: string,
        avatarUrl: HttpLink
        followers?: FollowerList
}

export interface UserData {
        user: User
}

export interface UserNode {
    node:{
        id: string,
        name: string
        login: string,
        avatarUrl: HttpLink
        followers?: FollowerList
    }    
}

export interface FollowerList {
    edges: UserNode[]
}

export interface UserLogin {
    userLogin: string;
}

export interface SearchResult {
    search: {
        edges: UserNode[]
    }
}

export interface UserVars {
    loginSearch: string;
}

export interface GraphNode {
    id: string,
    name: string,
    login: string,
    avatar: HttpLink
}

export interface GraphLink {
    source: string,
    target: string
}

export interface GraphFormat {
    nodes: [
        GraphNode?
    ],
    links: [
        GraphLink?
    ]
}
