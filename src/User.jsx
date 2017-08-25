import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import { connect } from 'react-redux';

const User = ({ data: {name, login}, sample, ...rest }) => {
  console.log(rest);
  return <div>
    With relay -> {name}!({login})
    <br/>
    With redux -> {sample.reduce((acc, x) => `${acc}-${x}`)}
  </div>
}

export default createFragmentContainer(connect(p => {
  // console.log(p);
  return p
})(User), graphql`
  fragment User on User {
    name
    login
  }
`)

