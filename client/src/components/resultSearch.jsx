import React, { Component } from "react";

class ResultSearch extends Component {
  render() {
    return (
      <div>
        {this.props.resultOfSer.map(function(name, index) {
          console.log("hello");
          return (
            <div key={index}>
              <div>{name.img}</div>
              <div>{name.name}</div>
              <div>{name.summary}</div>
              <div>{name.reatingText}</div>
              <br />
            </div>
          );
        })}
      </div>
    );
  }
}

export default ResultSearch;
