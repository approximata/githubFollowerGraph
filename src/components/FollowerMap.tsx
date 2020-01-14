import React, { useRef, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import Box from "@material-ui/core/Box";

import { UserLoginName, UserData, GraphFormat } from "../interface/interface";
import { convertUserToD3Graph } from "../utils/Converter";
import { drawNetwork } from "../utils/Drawer";
import { GET_USER_FOLLOWERS } from "../querys/userQuerys";

const FollowerMap = (userLoginName: UserLoginName) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const graph: GraphFormat = { nodes: [], links: [] };

  const HEADER_HEIGHT = 64;
  const { loading } = useQuery<UserData, UserLoginName>(GET_USER_FOLLOWERS, {
    variables: userLoginName,
    onCompleted: data => {
      convertUserToD3Graph(data.user, graph);
    }
  });

  useEffect(() => {
    const width = refContainer.current ? refContainer.current.clientWidth : 400;
    const height = window.innerHeight - HEADER_HEIGHT;
    drawNetwork(refContainer.current, graph, width, height);
  });

  return loading ? (
    <Box display="flex" justifyContent="center" alignItems="center" pt={3}>
      Loading ...
    </Box>
  ) : (
    <div ref={refContainer} />
  );
};

export default FollowerMap;
