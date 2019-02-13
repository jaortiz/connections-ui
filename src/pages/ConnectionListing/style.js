import styled from "styled-components";
import { Form } from "formik";
import { PrimaryButton } from "../../components/Buttons";

export const WhiteBG = styled.div`
  background-color: white;
  padding: 24px;
`;

export const TableWrapper = styled.div`
  background-color: white;
  margin-bottom: 32px;
`;

export const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;
`;

// really need to get theme support working on this lol...
export const StyledThead = styled.thead`
  background-color: ${({ theme }) => theme.color_grey_2};
`;

export const StyledRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.color_grey_2};
`;

export const StyledTd = styled.td`
  font-weight: unset;
`;

export const TitleHead = styled.td`
  font-weight: 700;
  width: 40%;
`;

export const Heading = styled.h4`
  display: inline-block;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  float: right;
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  padding: 24px;
`;
