import React from 'react';

class TeacherProfile extends React.Component {
	componentWillMount(){
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
				<p>{this.props.teacherInfo.userName}</p>
				<p>{this.props.teacherInfo.email}</p>
				<p>{this.props.teacherInfo.phone}</p>
				<p>{this.props.teacherInfo.location}</p>
				<a href={this.props.teacherInfo.cvFileUrl || "javascript:alert('No file exist');"}> CV </a>
				<br />
				<ul>
					{this.props.teacherInfo.schedules.map((time, index) =>
					{
						return <li key={index}> <input type="radio" name="gender" value="added"/> {time.day}{" start at:"} {time.startHour} {time.endHour}</li>
					}
					)}
				</ul>
				<p>Please select your class time:</p>
				
				{/* <button onClick={this.props.showTeacherInfo}>show</button> */}
			</div>
		);
	}
}

export default TeacherProfile;
