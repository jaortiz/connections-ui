import React from "react";
import styled from "styled-components";
import Tree from "./Tree";

const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px solid #d9d9d9;
`;

const StyledTH = styled.th`
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  background-color: #f5f5f5;
  color: #000;
  padding: 0.5em 0.7em;
  border: 1px solid #d9d9d9;
`;

const WhiteBG = styled.div`
  background-color: white;
  padding: 24px;
`;

const FileExplorer = ({ sftpCredentials }) => (
  <WhiteBG>
    <StyledTable>
      <thead>
        <tr>
          <StyledTH>Browse Folders and Files</StyledTH>
          <StyledTH>File Size</StyledTH>
          <StyledTH>Last Modified</StyledTH>
        </tr>
      </thead>
      <tbody>
        <Tree sftpCredentials={sftpCredentials} />
      </tbody>
    </StyledTable>
  </WhiteBG>
);

export default FileExplorer;
