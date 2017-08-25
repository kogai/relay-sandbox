const {
  commitMutation,
  graphql,
} = require('react-relay');

/**
const mutation = graphql`
mutation mutateMutation {
  addReaction(input: { subjectId:"MDU6SXNzdWUyMzEzOTE1NTE=", content: HOORAY } ) {
    reaction {
      content
    }
    subject {
      id
    }
  }
}
`;
  addReaction(input: $input) {
 */
 
//  /*
const mutation = graphql`
mutation AddReactionMutation($input: ReactionInput) {
  addReaction(input:$input) {
    reaction {
      content
    }
  }
}
`;
// */
export const commit = (env, subjectId, content) =>  {
  const variables = {
    input: {
      subjectId, content
    }
  };

  console.log(variables.input);
  commitMutation(env, {
    mutation,
    variables,
    onCompleted: (response) => {
      console.log('Success!', response)
    },
    onError: err => {
      err.source.errors.forEach(console.error)
    },
    // updater(res) {
    //   console.log(res);
    //   return res
    // }
  })
};

