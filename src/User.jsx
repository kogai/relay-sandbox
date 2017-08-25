import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

const User = ({ data: {name, login}}) => <div>Hello, {name}!({login})</div>

export default createFragmentContainer(User, graphql`
  fragment User on User {
    name
    login
  }
`)

