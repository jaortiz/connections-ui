import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Formik, Field } from "formik";
import { Modal } from "reactstrap";
import { actions } from "../../redux/Connections";
import { encrypt } from "../../utils/encrypt";
import { PrimaryButton } from "../../components/Buttons";
import FileExplorer from "./FileExplorer";
import { WhiteBG, Heading, StyledForm } from "./style";

const StyledButton = styled(PrimaryButton)`
  float: right;
`;

class Connection extends Component {
  state = { modal: false };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = values => {
    const { addSftp } = this.props;
    const {
      match: {
        params: { connectionId }
      }
    } = this.props;
    addSftp({
      connectionId,
      host: values.host,
      username: values.username,
      password: encrypt(values.password)
    });
    this.toggle();
  };

  render() {
    const { modal } = this.state;
    const {
      match: {
        params: { connectionId }
      },
      connections
    } = this.props;
    const { sftpList } = connections[connectionId];

    return (
      <WhiteBG>
        <Heading>{connections[connectionId].connectionName}</Heading>
        <StyledButton onClick={this.toggle}>Add SFTP Connection</StyledButton>
        <Modal isOpen={modal} toggle={this.toggle}>
          <h3>Create New Connection</h3>
          <Formik
            onSubmit={this.handleSubmit}
            render={props => (
              <StyledForm>
                <h5>SFTP Credentials</h5>
                <label htmlFor="host">Host</label>
                <Field name="host" />
                <label htmlFor="username">Username</label>
                <Field name="username" />
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" />
                <PrimaryButton type="submit">Submit</PrimaryButton>
              </StyledForm>
            )}
          />
        </Modal>
        {sftpList.map(sftp => (
          <FileExplorer sftpCredentials={sftp} />
        ))}
      </WhiteBG>
    );
  }
}

const mapStateToProps = state => ({ connections: state.connections.byId });
const mapDispatchToProps = dispatch => ({
  addSftp: sftpCredentials => {
    dispatch(actions.addSftp(sftpCredentials));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Connection);
