// import { combineReducers } from "redux";
import types from "./types";
import { mergeWith, isArray } from "lodash";

const defaultState = {
  connections: {
    byId: {},
    allIds: []
  }
};

function customizer(objValue, srcValue) {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.ADD_CONNECTION: {
      const { payload } = action;

      const { connectionId } = payload;
      return mergeWith(
        {},
        state,
        {
          connections: {
            byId: {
              [connectionId]: {
                ...payload,
                sftpList: []
              }
            },
            allIds: [connectionId]
          }
        },
        customizer
      );
    }
    case types.ADD_SFTP: {
      const { payload } = action;
      const { connectionId, host, username, password } = payload;
      return mergeWith(
        {},
        state,
        {
          connections: {
            byId: {
              [connectionId]: {
                sftpList: [{ host, username, password }]
              }
            }
          }
        },
        customizer
      );
    }
    default:
      return state;
  }
};

// const reducer = combineReducers({
//   package: packageReducer
// });

export default rootReducer;
/*
state = {
    packages: {
        byId: {
            "test": {
                packageName: '',
                ...packageDetailsLOL
            }
        },
        allIds: ["test"]
    }
}
*/
