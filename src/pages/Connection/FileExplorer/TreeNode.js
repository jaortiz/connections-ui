import React from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import styled from "styled-components";
import last from "lodash/last";

const getPaddingLeft = (level, type) => {
  let paddingLeft = level * 20;
  if (type === "file") paddingLeft += 20;
  return paddingLeft;
};

const StyledRow = styled.tr`
  cursor: pointer;
  &:hover {
    background: lightgray;
  }
`;

const StyledFileFolder = styled.td`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 10px;
  padding-left: ${props => getPaddingLeft(props.level, props.type)}px;
`;

const StyledTD = styled.td`
  padding-left: 8px;
`;

const NodeIcon = styled.div`
  font-size: 12px;
  margin-right: ${props => (props.marginRight ? props.marginRight : 5)}px;
`;

const getNodeLabel = node => last(node.path.split("/"));

const TreeNode = props => {
  const { node, getChildNodes, level, onToggle, onNodeSelect } = props;
  return (
    <React.Fragment>
      <StyledRow
        key={node.path}
        type={node.type}
        onClick={() => onToggle(node)}
      >
        <StyledFileFolder level={level}>
          <NodeIcon>
            {node.type === "folder" &&
              (node.isOpen ? <FaChevronDown /> : <FaChevronRight />)}
          </NodeIcon>

          <span role="button" onClick={() => onNodeSelect(node)}>
            {getNodeLabel(node)}
          </span>
        </StyledFileFolder>
        <StyledTD>{node.fileSize}</StyledTD>
        <StyledTD>{node.lastModified}</StyledTD>
      </StyledRow>

      {node.isOpen &&
        getChildNodes(node).map(childNode => (
          <TreeNode
            key={childNode.path}
            {...props}
            node={childNode}
            level={level + 1}
          />
        ))}
    </React.Fragment>
  );
};

TreeNode.defaultProps = {
  level: 0
};

export default TreeNode;
