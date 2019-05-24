import React from 'react';
import _ from 'underscore';
class Schedule extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			day: 'Sunday',
			startHour: '',
			endHour: '',
			message: '',
			schedules: []
		};
	}

	addSchedule(e) {
		e.preventDefault();
		const { day, startHour, endHour } = this.state;
		const temp = this.props.schedules;

		if (startHour >= endHour || _.pluck(this.props.schedules, 'day').includes(day)) {
			// console.log(startHour, endHour);
			this.setState({
				startHour: '',
				endHour: '',
				message: 'Check your Time!'
			});
		} else {
			this.setState(
				{
					schedules: [ ...temp, { day, startHour, endHour } ],
					message: '',
					startHour: '',
					endHour: ''
				},
				() => {
					this.props.changeSchedules(this.state.schedules);
				}
			);
		}
	}

	removeSchedule(e) {
		let { schedules } = this.props;
		schedules.forEach((element, index) => {
			if (element.day === e.target.value) {
				schedules.splice(index, 1);
			}
		});
		this.setState(
			{
				schedules: schedules
			},
			() => {
				this.props.changeSchedules(this.state.schedules);
			}
		);
		// console.log(this.state.schedules);
	}
	change(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {
		return (
			<div>
				<div className="row">
					<div className="col-sm-6">
						<form className="select form-group">
							<label htmlFor="selectDate">Select day:</label>
							<select
								className="form-control"
								id="selectDate"
								name="day"
								onChange={this.change.bind(this)}
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
								onChange={this.change.bind(this)}
								value={this.state.startHour}
							/>
							<label htmlFor="selectEndHour">Select end hour:</label>
							<input
								id="selectEndHour"
								className="form-control"
								placeholder="to"
								name="endHour"
								onChange={this.change.bind(this)}
								value={this.state.endHour}
							/>
							<button id="addBtn" onClick={this.addSchedule.bind(this)}>
								Add
							</button>
						</form>
					</div>
					<div className="col-sm-6">
						<label>{this.state.message}</label>
						{this.props.schedules.length > 0 ? (
							<div>
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
															onClick={this.removeSchedule.bind(this)}
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
