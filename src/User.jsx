import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

export default ({ viewer: { name, login } }) =>  {
 return <div>Hello, {name}!({login})</div>
};
