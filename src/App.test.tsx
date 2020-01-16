import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import Search from "./components/Search";

test("renders github header", () => {
  const { getByText } = render(<App />);
  const header = getByText(/GitHub Follower Graph/i);
  expect(header).toBeInTheDocument();
});

// const SearchWrapper = (props: { initSearchTerm: string }) => {
//   const [userLoginName, setUserLoginName] = React.useState("");
//   const [searchTerm, setSearchTerm] = React.useState(props.initSearchTerm);
//   return (
//     <Search
//       selectedUser={userLoginName}
//       setSelectedUserLoginName={setUserLoginName}
//       searchTerm={searchTerm}
//       setSearchTerm={setSearchTerm}
//     />
//   );
// };

// test("search input test", () => {
//   render(<SearchWrapper initSearchTerm="testUser" />);
//   const searchInput = screen.getByLabelText(/search for user.../i);
//   const searchItem = "approximata";

//   fireEvent.change(searchInput, { target: { value: searchItem } });
//   expect(searchItem).toEqual("testUser");
// });
