import React, { Component } from 'react';

class Search extends Component{
  constructor(props){
    super(props)
  }
 render(){
   return( <div>
      <form>
        <input type="text" name="subjectLevel" onChange={this.props.searchInfo.bind(this)} placeholder="level"/>
        <input type="text" name="subjectName" onChange={this.props.searchInfo.bind(this)} placeholder="subject"/>
        <input type="text" name="location" onChange={this.props.searchInfo.bind(this)} placeholder="location"/>
        <button onClick={this.props.searchTecher.bind(this) }>search</button>
      </form>   
   
    </div>
         )
  }

}
export default Search;