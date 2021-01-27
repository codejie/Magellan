module.exports = {
    projects: {
      portal: {
        schema: "/Users/Jie/Code/git/Magellan/Service/src/graphql/schema/*.graphql",
        extensions: {
          endpoints: {
            default: {
              url: "http://localhost:3000/graphql",
              headers: {},
            },
          },
        }
      }
    }
  }
  