import React, { Component } from "react";
import { Modal } from "reactstrap";
import { Formik, Field } from "formik";
import { connect } from "react-redux";
import uniqid from "uniqid";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../../components/Buttons";
import { actions } from "../../redux/Connections";
import {
  WhiteBG,
  Heading,
  StyledPrimaryButton,
  TableWrapper,
  StyledTable,
  StyledThead,
  StyledTd,
  TitleHead,
  StyledRow,
  StyledForm
} from "./style";

class ConnectionListing extends Component {
  state = { modal: false };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (values, actions) => {
    const { addConnection } = this.props;
    addConnection({
      connectionId: uniqid(),
      connectionName: values.connectionName
    });
    this.toggle();
  };

  render() {
    const { modal } = this.state;
    const { connections } = this.props;
    return (
      <WhiteBG>
        <Heading>Connections</Heading>
        <Modal isOpen={modal} toggle={this.toggle}>
          <h3>Create New Connection</h3>
          <Formik
            onSubmit={this.handleSubmit}
            render={props => (
              <StyledForm>
                <label htmlFor="connectionName">Connection Name</label>
                <Field name="connectionName" />
                <PrimaryButton type="submit">Submit</PrimaryButton>
              </StyledForm>
            )}
          />
        </Modal>
        <StyledPrimaryButton onClick={this.toggle}>
          Create New Connection
        </StyledPrimaryButton>
        <TableWrapper>
          <StyledTable>
            <StyledThead>
              <tr>
                <TitleHead>Name</TitleHead>
                <th>Updated</th>
              </tr>
            </StyledThead>
            <tbody>
              {Object.keys(connections).map(connectionId => (
                <StyledRow>
                  <StyledTd>
                    <Link to={`/${connectionId}`}>
                      {connections[connectionId].connectionName}
                    </Link>
                  </StyledTd>
                  <StyledTd>Test</StyledTd>
                </StyledRow>
              ))}
            </tbody>
          </StyledTable>
        </TableWrapper>
      </WhiteBG>
    );
  }
}

const mapStateToProps = state => ({ connections: state.connections.byId });
const mapDispatchToProps = dispatch => ({
  addConnection: newConnection => {
    dispatch(actions.addConnection(newConnection));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectionListing);
