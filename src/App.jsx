import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

import List, { ListFragment } from './List';
import User from './User';
import { fetchQuery } from './client';

const mountNode = document.getElementById('root');

const modernEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

const sample = (state = [0, 1, 2], action) => {
  switch (action.type) {
    case "SAMPLE_ACTION":
      return state;
    default:
      return state;
  }
};
const store = createStore(
  combineReducers({ sample }),
  devToolsExtension()
);
const QueryRenderWithRedux = ({ sample, dispatch }) => {
  
  dispatch({ type: "FOO"})
  return <QueryRenderer
      environment={modernEnvironment}
      query={graphql`
        query AppQuery {
          viewer {
            ...User
            ...List
          }
        }
      `}
      variables={{
        count: 20
      }}
      render={({error, props}) => {
        if (error) {
          console.error(error.source);
          console.error(error.message);
        }
        if (props) {
          return (
            <div>
              <User data={props.viewer}/>
              <List data={props.viewer}/>
            </div>
          );
        } else {
          return <div>Loading</div>;
        }
      }}
    />
}

const HOC = connect(p => {
  return p
})(QueryRenderWithRedux)

ReactDOM.render(
  <Provider store={store}>
    <HOC />
  </Provider>,
  mountNode
);
