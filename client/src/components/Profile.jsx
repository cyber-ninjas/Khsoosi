import React from 'react';
import ImageUpload from './imageUpload.jsx';
import CVUpload from './cvUpload.jsx';
import Schedule from './Schedule.jsx';

class Profile extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { ProfileVariables } = this.props;
		return (
			<div>
				<input
					type="text"
					placeholder="user name"
					value={ProfileVariables.userName}
					onChange={(event) => this.props.change(event)}
					name="userName"
				/>
				<input
					type="text"
					placeholder="email"
					value={ProfileVariables.email}
					onChange={(event) => this.props.change(event)}
					name="email"
				/>
				<input
					type="text"
					placeholder="phone"
					value={ProfileVariables.phone}
					onChange={(event) => this.props.change(event)}
					name="phone"
				/>
				<input
					type="text"
					placeholder="location"
					value={ProfileVariables.location}
					onChange={(event) => this.props.change(event)}
					name="location"
				/>
				<input
					type="text"
					placeholder="summary"
					value={ProfileVariables.summary}
					onChange={(event) => this.props.change(event)}
					name="summary"
				/>
				<ImageUpload
					imgUrl={ProfileVariables.imgUrl}
					image={ProfileVariables.image}
					progress={ProfileVariables.progress}
					handleImgChange={(e) => this.props.handleImgChange(e)}
					handleImgUpload={() => this.props.handleImgUpload()}
				/>
				<CVUpload
					cvFileUrl={ProfileVariables.cvFileUrl}
					cvFile={ProfileVariables.cvFile}
					progress={ProfileVariables.progress}
					handleFileChange={(e) => this.props.handleFileChange(e)}
					handleFileUpload={() => this.props.handleFileUpload()}
				/>
				<Schedule
					message={this.props.message}
					startHour={this.props.startHour}
					endHour={this.props.endHour}
					schedules={ProfileVariables.schedules}
					change={this.props.change.bind(this)}
					addSchedule={this.props.addSchedule.bind(this)}
					removeSchedule={this.props.removeSchedule.bind(this)}
				/>
				<button onClick={this.props.updateInfo.bind(this)}>Update</button>
			</div>
		);
	}
}

export default Profile;
