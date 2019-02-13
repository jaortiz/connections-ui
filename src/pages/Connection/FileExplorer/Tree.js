import React, { Component } from "react";
import values from "lodash/values";
import merge from "lodash/merge";
// import PropTypes from "prop-types";
import axios from "axios";
import TreeNode from "./TreeNode";

const data = {
  "/": {
    path: "/",
    type: "folder",
    isRoot: true,
    fileSize: "-",
    lastModified: "-",
    children: []
  }
};

class Tree extends Component {
  state = {
    nodes: data
  };

  getRootNodes = () => {
    const { nodes } = this.state;
    return values(nodes).filter(node => node.isRoot === true);
  };

  getChildNodes = node => {
    const { nodes } = this.state;
    if (!node.children) return [];
    return node.children.map(path => nodes[path]);
  };

  // api needs to take in host, path, username, password
  getDirectory = async path => {
    const { sftpCredentials } = this.props;
    const res = await axios.post(
      `http://localhost:5000/api/connection/directory`,
      {
        ...sftpCredentials,
        path
      }
    );
    const { data } = await res;
    return data;
  };

  onToggle = async node => {
    const { nodes } = this.state;
    if (node.type === "folder" && !node.isOpen) {
      const data = await this.getDirectory(node.path);
      const updatedNodes = await merge(nodes, data);
      updatedNodes[node.path].isOpen = !node.isOpen;
      this.setState({ nodes: updatedNodes });
    } else {
      nodes[node.path].isOpen = !node.isOpen;
      this.setState(nodes);
    }
  };

  onNodeSelect = node => {
    const { onSelect } = this.props;
    onSelect(node);
  };

  render() {
    const rootNodes = this.getRootNodes();
    return (
      <React.Fragment>
        {rootNodes.map(node => (
          <TreeNode
            key={node.path}
            node={node}
            getChildNodes={this.getChildNodes}
            onToggle={this.onToggle}
            onNodeSelect={this.onNodeSelect}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default Tree;
