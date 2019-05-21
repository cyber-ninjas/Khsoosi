import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
  }
<<<<<<< HEAD
  
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
      <form id="searchForm">
        <input className="inputs" type="text" name="subjectLevel" onChange={this.props.searchInfo.bind(this)} placeholder="level"/>
        <br/>
        <br/>
        <br/>
        <input className="inputs" type="text" name="subjectName" onChange={this.props.searchInfo.bind(this)} placeholder="subject"/>
        <br/>
        <br/>
        <br/>
        <input className="inputs" type="text" name="location" onChange={this.props.searchInfo.bind(this)} placeholder="location"/>
        <br/>
        <br/>
        <br/>
        <button id="search" onClick={this.props.searchTecher.bind(this) }>search</button>
      </form>   
   
    </div>
         )
=======
  render() {
    return (
      <div>
        <form>
          <input
            className="inputs"
            type="text"
            name="subjectLevel"
            onChange={this.props.searchInfo.bind(this)}
            placeholder="level"
          />
          <br />
          <br />
          <br />
          <input
            className="inputs"
            type="text"
            name="subjectName"
            onChange={this.props.searchInfo.bind(this)}
            placeholder="subject"
          />
          <br />
          <br />
          <br />
          <input
            className="inputs"
            type="text"
            name="location"
            onChange={this.props.searchInfo.bind(this)}
            placeholder="location"
          />
          <br />
          <br />
          <br />
          <button id="search" onClick={this.props.searchTecher.bind(this)}>
            search
          </button>
        </form>
      </div>
    );
>>>>>>> 8ba152a8b1f23f540bba5cef5ff2c64b9fb589c5
  }
}
export default Search;
