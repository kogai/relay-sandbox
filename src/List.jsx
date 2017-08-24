import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

export default ({ gists }) => {
 return <ul>{ gists.map(x => <li key={x.name}>{x.name}</li>)}</ul>
};
