import React, { Component } from "react";
import values from "lodash/values";
import PropTypes from "prop-types";
import axios from "axios";
import TreeNode from "./TreeNode";

const data = {
  "/": {
    path: "/",
    type: "folder",
    isRoot: true,
    children: []
  }
};

export default class Tree extends Component {
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

  getDirectory = async path => {
    const res = await axios.get(`http://localhost:8000/api/datasource${path}`);
    const { data } = await res;
    return data;
  };

  onToggle = async node => {
    if (node.type === "folder") {
      const { nodes } = this.state;
      const data = await this.getDirectory(node.path);
      const updatedNodes = Object.assign(nodes, data);
      updatedNodes[node.path].isOpen = !node.isOpen;
      this.setState({ nodes: updatedNodes });
    }
  };

  onNodeSelect = node => {
    const { onSelect } = this.props;
    onSelect(node);
  };

  render() {
    const rootNodes = this.getRootNodes();
    return (
      <div>
        {rootNodes.map(node => (
          <TreeNode
            key={node.path}
            node={node}
            getChildNodes={this.getChildNodes}
            onToggle={this.onToggle}
            onNodeSelect={this.onNodeSelect}
          />
        ))}
      </div>
    );
  }
}

Tree.propTypes = {
  onSelect: PropTypes.func.isRequired
};
