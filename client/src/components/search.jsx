import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
  }
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
  }
}
export default Search;
