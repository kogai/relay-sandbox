import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

export default ({ gists }) => {
  console.log(gists);
 return <ul>{ gists.map(x => (
  <li key={x.name}>
    [{`${x.isPublic}`}]__
    {x.name}__
    {x.description}
    
  </li>
 ))}</ul>
};
