import React, { Component } from 'react';

class ResultSearch extends Component {
	render() {
		return (
			<div>
				<br />
				{this.props.resultOfSer.length > 0 ? (
					this.props.resultOfSer.map(function(name, index) {
						return (
							<div className="card" name={name.id} key={index}>
								<img src={name.img} style={{ width: 100 + '%' }} />
								<h2 className="cardtext">{name.name}</h2>
								<h3 className="cardtext">{name.summary}</h3>
								<h3 className="cardtext">{name.reatingText}</h3>
								<span>
									{name.rate - Math.floor(name.rate) == 0 ? (
										'Rate:'
									) : (
										<i className="fa fa-star-half" />
									)}

									{Array(Math.floor(name.rate / 2)).fill(<i className="fa fa-star" />)}
								</span>
								<br />
							</div>
						);
					})
				) : (
					<h1 id="notfound">Sorry, we could not find a match for your search</h1>
				)}
			</div>
		);
	}
}

export default ResultSearch;
