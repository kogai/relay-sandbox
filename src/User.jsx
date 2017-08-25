import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import { connect } from 'react-redux';
import { commit } from './AddReaction';

const User = ({ data: {name, login}, sample, ...rest }) => {
  console.log(rest.relay.environment);
  // commit(rest.relay.environment, "MDU6SXNzdWUyMzEzOTE1NTE=", "HOORAY")
  return <div>
    With relay -> {name}!({login})
    <br/>
    With redux -> {sample.reduce((acc, x) => `${acc}-${x}`)}
    <br/>
    <button onClick={() => commit(rest.relay.environment, "MDU6SXNzdWUyMzEzOTE1NTE=", "HOORAY")}>Reaction</button>
    <br/>
    <a href="https://github.com/octocat/Hello-World/issues/349">リアクションしたIssue</a>
  </div>
}

export default createFragmentContainer(connect(p => {
  return p
})(User), graphql`
  fragment User on User {
    name
    login
  }
`)
