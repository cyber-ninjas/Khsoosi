import React, { Component } from 'react'

class ResultSearch extends Component {
  render() {
    return (
      <div>
        {
          this.props.resultOfSer.map(function (name, index) {
        return(
        <div key={name.id}>
             <div>{name.img}</div>
             <div >{name.name}</div>
            <div>{name.summary}</div>
            <div>{name.reat}</div>
          <br></br>
          </div>
          )
            })}
      </div>
    )
  }
}

export default ResultSearch