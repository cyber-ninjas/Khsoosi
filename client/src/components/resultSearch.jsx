import React, { Component } from 'react'

class ResultSearch extends Component {
  render() {
    return (
      <div>
        {
          this.props.resultOfSer.map(function (name, index) {
            return( <div key={index}>{name.name}</div>
            
              ) 
            })}
      </div>
    )
  }
}

export default ResultSearch