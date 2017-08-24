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

import List from './List';
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

const modernEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

ReactDOM.render(
  <QueryRenderer
    environment={modernEnvironment}
    query={graphql`
      query AppQuery($count: Int!) {
        viewer {
          login
          name
          gists(last: $count) {
            nodes { name description isPublic }
          }
        }
      }
    `}
    variables={{
      count: 10
    }}
    render={({error, props}) => {
      console.log(error);
      if (props) {
        return (
          <div>
            <User viewer={props.viewer} />
            <List gists={props.viewer.gists.nodes} />
          </div>
        );
      } else {
        return <div>Loading</div>;
      }
    }}
  />,
  mountNode
);
