import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import { connect } from 'react-redux';
import { commit } from './AddReaction';
const reactions = [
"THUMBS_UP",
"THUMBS_DOWN",
"LAUGH",
"CONFUSED",
"HEART",
"HOORAY",
]

const User = ({ data, sample, ...rest }) => {
  const { name, login } = data
  return <div>
    With relay -> {name}!({login})
    <br/>
    With redux -> {sample.reduce((acc, x) => `${acc}-${x}`)}
    <br/>
    {
      reactions.map(r => 
      <button key={r} onClick={() => commit(rest.relay.environment, "MDU6SXNzdWUyMzEzOTE1NTE=", r, data)}>{r}</button>
      )
    }
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
