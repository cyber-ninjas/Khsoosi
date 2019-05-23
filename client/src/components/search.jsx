import React, { Component } from 'react';

class Search extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<form id="searchForm">
					<input
						className="inputs"
						type="text"
						name="subjectName"
						onChange={this.props.change.bind(this)}
						placeholder="subject"
					/>
					<input
						className="inputs"
						type="text"
						name="subjectLevel"
						onChange={this.props.change.bind(this)}
						placeholder="level"
					/>
					<input
						className="inputs"
						type="text"
						name="location"
						onChange={this.props.change.bind(this)}
						placeholder="location"
					/>
					<button id="search" onClick={this.props.searchTecher.bind(this)}>
						search
					</button>
				</form>
			</div>
		);
	}
}
export default Search;
