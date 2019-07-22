var React = require('react');
var ReactDOM = require('react-dom');


import ApolloClient from 'apollo-boost';
import { ApolloProvider,Query } from 'react-apollo';
var gql = require('graphql-tag');
  const GET_ALLPOLICY = gql`
  {
    allPolicy{
      edges{
        node{
          id
          status
          desc
          created
          name
          
        }
      }
    }
  }
  `;
const client = new ApolloClient({
  uri:'https:devs.portalista.com/api/graphql',
  headers:{
    'Authorization': 'Basic dGRwa19hZG1pbjpQQHNzdzByZA=='
  },
});
  const RenderRowTable = ({data}) => {
   console.log(data.edges)
  return data.map(edges =>  (
    <tr>
      <td>{edges.node.id}</td>
      <td>{edges.node.name}</td>
      <td>{edges.node.status === true? "True" : "False"}</td>
      <td>{edges.node.desc}</td>
    </tr>
  ))
};
const NullData = () => (
  <tr>
    <td colSpan={3}>Not found</td>
  </tr>
);
        

function App (){
  

        return (
              <ApolloProvider client={client}>
              <div className="App">
                  <header > 
                  
                
                  </header>
                  <Query query={GET_ALLPOLICY}>
                  {({loading,data}) => {
                      if (loading) return "Loading...";
                      {/* console.log(data); */}

                      return (
                        <table>
                          <thead>
                          <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Status</th>
                          </tr>
                          </thead>

                          <tbody>
                              { !data && <NullData/>}              
                              { data && data.allPolicy.edges.length === 0 && <NullData/>}
                              { data && data.allPolicy.edges.length > 0 && <RenderRowTable data={data.allPolicy.edges} />}
                          </tbody>
                        </table>
                      );
                  }} 
                  </Query>
              </div>
              </ApolloProvider>
          );
    
}
ReactDOM.render(<App/>, document.getElementById('app'));
  // export default App;