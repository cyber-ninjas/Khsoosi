import React from 'react';

class Schedule extends React.Component {
	render() {
		return (
			<div>
				<div className="row">
					<div className="col-sm-6">
						<form className="form-group">
							<label htmlFor="selectDate">Select day:</label>
							<select
								className="form-control"
								id="selectDate"
								name="day"
								onChange={this.props.change.bind(this)}
							>
								<option value="Sunday"> Sunday</option>
								<option value="Monday"> Monday</option>
								<option value="Tuesday"> Tuesday</option>
								<option value="Wedensday">Wedensday </option>
								<option value="Thursday">Thursday </option>
								<option value="Friday">Friday </option>
								<option value="Saturday">Saturday </option>
							</select>
							<label htmlFor="selectStartHour">Select start hour:</label>
							<input
								className="form-control"
								id="selectStartHour"
								placeholder="from"
								name="startHour"
								onChange={this.props.change.bind(this)}
								value={this.props.startHour}
							/>
							<label htmlFor="selectEndHour">Select end hour:</label>
							<input
								id="selectEndHour"
								className="form-control"
								placeholder="to"
								name="endHour"
								onChange={this.props.change.bind(this)}
								value={this.props.endHour}
							/>
							<button onClick={this.props.addSchedule.bind(this)}>Add</button>
						</form>
					</div>
					<div className="col-sm-6">
						{this.props.schedules.length > 0 ? (
							<div>
								<label>{this.props.message}</label>
								<h3>Schedule</h3>
								<table className="table table-hover table-dark">
									<thead>
										<tr>
											<th scope="col">Day</th>
											<th scope="col">Start</th>
											<th scope="col">End</th>
											<th scope="col">Cancel</th>
										</tr>
									</thead>
									<tbody>
										{this.props.schedules.map((sch, index) => {
											return (
												<tr key={sch.day}>
													<td>{sch.day}</td>
													<td>{sch.startHour}</td>
													<td>{sch.endHour}</td>
													<td>
														<button
															className="btn btn-primary"
															value={sch.day}
															onClick={this.props.removeSchedule.bind(this)}
														>
															remove
														</button>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

export default Schedule;
