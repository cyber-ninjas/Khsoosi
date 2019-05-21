import React from 'react';

class Schedule extends React.Component {
	render() {
		return (
			<div>
				<br />
				<br />
				<form>
					<select name="day" onChange={this.props.change.bind(this)}>
						<option value="Sunday"> Sunday</option>
						<option value="Monday"> Monday</option>
						<option value="Tuesday"> Tuesday</option>
						<option value="Wedensday">Wedensday </option>
						<option value="Thursday">Thursday </option>
						<option value="Friday">Friday </option>
						<option value="Saturday">Saturday </option>
					</select>
					<input placeholder="from" name="startHour" onChange={this.props.change.bind(this)} />
					<input placeholder="to" name="endHour" onChange={this.props.change.bind(this)} />
					<button onClick={this.props.addSchedule.bind(this)}>Add</button>
				</form>
				<br />
				{this.props.schedule.length > 0 ? (
					<div>
						<h3>Schedule</h3>
						<table>
							<tbody>
								<tr>
									<th>Day</th>
									<th>Start</th>
									<th>End</th>
									<th>Cancel</th>
								</tr>
								{this.props.schedule.map((sch, index) => {
									return (
										<tr key={sch.day} >
											<td>{sch.day}</td>
											<td>{sch.startHour}</td>
											<td>{sch.endHour}</td>
											<td>
												<button name={sch.day} onClick={this.props.removeSchedule.bind(this)}>remove</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				) : null}
			</div>
		);
	}
}

export default Schedule;
