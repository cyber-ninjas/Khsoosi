import React, { Component } from 'react';

class Search extends Component{
  constructor(props){
    super(props)
  }
  
//   searchTeacher (e) {
//     console.log('click')
//     e.preventDefault();
   
//       // Default options are marked with *
//         return fetch(`/ss/?location=${this.state.user.location}&name=${this.state.name}&level=${this.state.level}`, {
//             method: 'GET', // *GET, POST, PUT, DELETE, etc.
//             headers : { 
//               // 'Content-Type': 'application/json',
//               'Accept': 'application/json'
//              }
//         })
//         .then(response => response = response.json() ).then(data =>{ this.setState({res:data.data,hide:true}); console.log(this.state.res)});

  
   
// }
  render(){
   return( <div>
      <form>
        <input type="text" name="level" onChange={this.props.searchInfo.bind(this)} placeholder="level"/>
        <input type="text" name="subject" onChange={this.props.searchInfo.bind(this)} placeholder="subject"/>
        <input type="text" name="location" onChange={this.props.searchInfo.bind(this)} placeholder="location"/>
        <button onClick={this.props.searchTecher.bind(this) }>search</button>
      </form>   
   
    </div>
         )
  }

}
export default Search;