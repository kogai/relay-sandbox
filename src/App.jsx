import React from 'react';
import ReactDOM from 'react-dom';

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

import { ListFragment } from './List';
import User from './User';

const mountNode = document.getElementById('root');

function fetchQuery(
  operation,
  variables,
) {
  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${process.env.TOKEN}`
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  }).catch(e => {
    console.error(e);
  });
}

const stroe = new Store(new RecordSource());

const modernEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

ReactDOM.render(
  <QueryRenderer
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
      count: 10
    }}
    render={({error, props}) => {
      console.log(props);
      if (error) {
        console.error(error.source);
        console.error(error.message);
      }
      if (props) {
        return (
          <div>
          <User data={props.viewer}/>
          <ListFragment data={props.viewer}/>
          </div>
        );
      } else {
        return <div>Loading</div>;
      }
    }}
  />,
  mountNode
);
