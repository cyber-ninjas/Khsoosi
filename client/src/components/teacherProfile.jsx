import React from 'react';

class TeacherProfile extends React.Component {
	componentWillMount() {
		this.props.showTeacherInfo();
	}
	render() {
		// const style = {
		//   display: 'flex',
		//   flexDirection: 'column',
		//   alignItems: 'center',
		//   justifyContent: 'center'
		// };
		// const schedules = this.props.teacherInfo.schedules;
		return (
			<div>
				<img
					src={this.props.teacherInfo.imgUrl || 'https://via.placeholder.com/100x100'}
					alt="uploaded images"
					height="100"
					width="100"
				/>
				<br />
				<fieldset>
					<legend>Teacher Info</legend>
					<p>{this.props.teacherInfo.userName}</p>
					<p>{this.props.teacherInfo.email}</p>
					<p>{this.props.teacherInfo.phone}</p>
					<p>{this.props.teacherInfo.location}</p>
					<p>{this.props.teacherInfo.summary}</p>
				</fieldset>
				
				{this.props.teacherInfo.ratings.map((rates, index) => {
					return (
						<div>
							<p>{rates.text}</p>
							<p>{rates.rate}</p>
						</div>
					);
				})}
				<fieldset>
					<legend>Teacher CV</legend>
					<iframe src={this.props.teacherInfo.cvFileUrl}>
						<p>{"javascript:alert('No file exist');"}</p>
					</iframe>
				</fieldset>
				
				<br/>
				<ul>
					<p>Please select your class time:</p>
					{this.props.teacherInfo.schedules.map((time, index) => {
						return (
							<li key={index}>
								{' '}
								<input type="radio" name="gender" value="added" /> {time.day}
								{' start at:'} {time.startHour} {' end at:'} {time.endHour}
							</li>
						);
					})}
				</ul>

				<button >Pick</button> <button>Rate</button>
			</div>
		);
	}
}

export default TeacherProfile;
