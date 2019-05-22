import React, { Component } from 'react';

class ResultSearch extends Component {
	render() {
		return (
			<div>
				<br />
				{this.props.resultOfSer.map(function(name, index) {
					console.log('hello');
					return (
						<div className="card" name={name.id} key={index}>
							<img src={name.img} alt="John" style={{ width: 100 + '%' }} />
							<h1>{name.name}</h1>
							<p className="title">{name.summary}</p>
							<p>{name.reatingText}</p>
							<div style={{ margin: 24 + 'px' + 0 }}>{name.rate}</div>
							<br />
						</div>
					);
				})}
			</div>
		);
	}
}

export default ResultSearch;
