import React, { Component } from "react";
import FileExplorer from "./components/FileExplorer";
import "./App.css";

class App extends Component {
  //on component did mount need to make the call to API for initial rendering
  // state = {
  //   tree: [
  //     { name: "dir1", type: "directory" },
  //     { name: "dir2", type: "directory" },
  //     { name: "file", type: "file" }
  //   ]
  // };

  render() {
    // const { tree } = this.state;
    return <FileExplorer />;
  }
}

export default App;
