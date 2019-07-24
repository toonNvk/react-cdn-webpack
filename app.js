import "./polyfill";
import fetch from 'unfetch';
var React = require('react');
var ReactDOM = require('react-dom');
import axios from 'axios';
import ApolloClient from 'apollo-boost';
import { ApolloProvider,Query } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
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
  cache: new InMemoryCache(),
  fetchOptions:{ fetch },
  uri:'https://devs.portalista.com/api/graphql',
  headers:{
    'Authorization': `Basic dGRwa19hZG1pbjpQQHNzdzByZA==`
  },
});

const RenderRowTable = ({data}) => {
  return data.map(edges => (
<tr>
  <td>{edges.node.id}</td>
  <td>{edges.node.name}</td>
  <td>{edges.node.status === true? "True" : "False"}</td>
  <td>{edges.node.desc}</td>
</tr>
));
};
const NullData = () => (
  <tr>
    <td colSpan={3}>Not found</td>
  </tr>
);
        
// client.query({
//   query: GET_ALLPOLICY
// }).then( res => console.log(res));

function App (){

  const oauth = {Authorization: 'Basic dGRwa19hZG1pbjpQQHNzdzByZA=='}
  const query = `{
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
  }`;
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Query query={GET_ALLPOLICY}>
        {({loading,error,data}) => {
          if (loading) return "Loading...";// loading == true
          console.log(error);
          {/* if (error){ // for safe
            data = axios.post('https://devs.portalista.com/api/graphql',{query:query},{headers:oauth})
            .then(response => {
              return response.data;
            })
            .catch(error => {
              console.log(error);
            });
          } */}
          console.log(data);
          
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
    // {/* <h1>Hello</h1> */}
  );
}
ReactDOM.render(<App/>, document.getElementById('app'));