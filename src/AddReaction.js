const {
  commitMutation,
  graphql,
  ConnectionHandler
} = require('react-relay');
 
const mutation = graphql`
mutation AddReactionMutation($input: AddReactionInput!) {
  addReaction(input:$input) {
    reaction {
      content
    }
  }
}
`;

export const commit = (env, subjectId, content, user) =>  {
  const variables = {
    input: {
      subjectId, content
    }
  };

  commitMutation(env, {
    mutation,
    variables,
    updater: (store, response) => {
      const viewerProxy = store.getRoot().getLinkedRecord("viewer")
      const name = viewerProxy.getValue("name")
      viewerProxy.setValue(`${name}-${content}`, 'name')
    },
    onCompleted: (response) => {
      console.log('Success!')
      console.log(response.addReaction.reaction.content);
    },
    onError: err => {
      err.source.errors.forEach(console.error)
    },
  })
};

