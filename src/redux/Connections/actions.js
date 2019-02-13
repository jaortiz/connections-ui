import types from "./types";

const addConnection = ({ connectionId, connectionName }) => ({
  type: types.ADD_CONNECTION,
  payload: {
    connectionId,
    connectionName
  }
});

const addSftp = ({ connectionId, host, username, password }) => ({
  type: types.ADD_SFTP,
  payload: {
    connectionId,
    host,
    username,
    password
  }
});

export default {
  addConnection,
  addSftp
};
