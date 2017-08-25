const {
  commitMutation,
  graphql,
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

const optimisticResponse = () => ({
  addReaction: {
    viewer: {
      name: "xxxxxxxx",
    },
  },
});

export const commit = (env, subjectId, content, user) =>  {
  const variables = {
    input: {
      subjectId, content
    }
  };

  commitMutation(env, {
    mutation,
    variables,
    optimisticUpdater: store => {
      // addReaction: {
      //   viewer: {
      //     name: "xxxxxxxx",
      //   },
      // },
      console.log('optimisticResponse');
      return {}
    },
    onCompleted: (response) => {
      console.log('Success!')
      console.log(response.addReaction.reaction.content);
    },
    onError: err => {
      err.source.errors.forEach(console.error)
    },
  //   updater(store) {
  //     const payload = store.getRootField("addReaction")
  //     const reaction = payload.getLinkedRecord("reaction")

  //     const u = store.get(user.name)
  //     console.log(u);
  //     console.log(reaction);
  // // const userProxy = store.get(user.id);
  // // const conn = ConnectionHandler.getConnection(
  // //   userProxy,
  // //   'TodoList_todos',
  // // );
  // // ConnectionHandler.insertEdgeAfter(conn, newEdge);
  //     // const payload = store.getRootField('addTodo');
  //     // const newEdge = payload.getLinkedRecord('todoEdge');
  //     // sharedUpdater(store, user, newEdge);
  //   }
  })
};

