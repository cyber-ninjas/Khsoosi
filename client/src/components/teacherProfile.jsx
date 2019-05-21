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
					<label htmlFor="">Name: </label> {this.props.teacherInfo.userName}
					<br />
					<label htmlFor="">email: </label> {this.props.teacherInfo.email}
					<br />
					<label htmlFor="">Phone: </label> {this.props.teacherInfo.phone}
					<br />
					<label htmlFor="">Location: </label> {this.props.teacherInfo.location}
					<br />
					{this.props.teacherInfo.ratings.map((rates, index) => {
						return (
							<div>
								<label htmlFor="">Compliment: </label> {rates.text} <br />
								<label htmlFor="">Rating level: </label> {rates.rate} <br />
							</div>
						);
					})}
					<label htmlFor="">Summary: </label> <p>{this.props.teacherInfo.summary}</p>
				</fieldset>
				<br />

				<fieldset>
					<legend>Teacher CV</legend>
					<iframe src={this.props.teacherInfo.cvFileUrl}>
						<p>{"javascript:alert('No file exist');"}</p>
					</iframe>
				</fieldset>
				<br />

				<fieldset>
					<legend>Teacher Schedule</legend>
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
					<button>Pick</button>
				</fieldset>
				<br />
				<button>Rate</button>
			</div>
		);
	}
}

export default TeacherProfile;
