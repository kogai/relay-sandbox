import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

export const ListTimpl = ({ gists }) => {
 return <ul>{ gists.nodes.map(x => (
  <li key={x.name}>
    [{`${x.isPublic}`}]__
    {x.name}__
    {x.description}
  </li>
 ))}</ul>
};


export class List extends React.Component {
  render() {
    return <div><ListTimpl {...this.props.data }/></div>
  }
}

export const ListFragment = createFragmentContainer(List, graphql`
  fragment List on User {
    gists(last: 10) {
      nodes {
        name
        description
        isPublic
      }
    }
  }
`)
