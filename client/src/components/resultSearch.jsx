import React, { Component } from 'react';

class ResultSearch extends Component {
	render() {
		return (
			<div>
				<br />
				{console.log(this.props.resultOfSer)}
				{this.props.resultOfSer.map(function(name, index) {
					return (
						<div className="card" name={name.id} key={index}>
							<img src={name.img} style={{ width: 100 + '%' }} />
							<h1>{name.name}</h1>
							<p className="title">{name.summary}</p>
							<p>{name.reatingText}</p>
							<span>
								{name.rate - Math.floor(name.rate) == 0 ? 'Rate:' : <i className="fa fa-star-half" />}

								{Array(Math.floor(name.rate / 2)).fill(<i className="fa fa-star" />)}
							</span>

							<br />
						</div>
					);
				})}
			</div>
		);
	}
}

export default ResultSearch;
