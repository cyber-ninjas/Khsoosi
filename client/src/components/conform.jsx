import React from 'react';

class Conform extends React.Component {
	componentWillMount() {
		this.props.conform();
	}
	render() {
		var is_disabled = true;
		return (
			<div>
				<h3>Confirm</h3>
				<table className="table table-hover table-dark">
					<thead>
						<tr>
							<th>Student Name</th>
							<th>Day</th>
							<th>Start Hour</th>
							<th>End Hour</th>
							<th>Confirmed</th>
							<th>-</th>
							<th>-</th>
						</tr>
					</thead>
					<tbody>
						{this.props.resultOfBook.map((data, index) => {
							return (
								<tr key={index}>
									<td>{data.name}</td>
									<td>{data.day}</td>
									<td>{data.start}</td>
									<td>{data.end}</td>
									<td>{data.confirmed}</td>
									{data.confirmed === 'Yes' || data.confirmed === 'No' ? (
										(is_disabled = true)
									) : (
										(is_disabled = false)
									)}
									<td>
										<button
											name={data.id}
											value="Yes"
											disabled={is_disabled}
											onClick={(e) => this.props.answer(e)}
										>
											Accept
										</button>
									</td>
									<td>
										<button
											name={data.id}
											value="No"
											disabled={is_disabled}
											onClick={(e) => this.props.answer(e)}
										>
											No
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}
export default Conform;
