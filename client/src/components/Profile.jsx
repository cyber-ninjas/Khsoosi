import React from 'react';
import ImageUpload from './imageUpload.jsx';
import CVUpload from './cvUpload.jsx';
import Schedule from './Schedule.jsx';
import Conform from './conform.jsx';

class Profile extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { ProfileVariables } = this.props;
		return (
			<div>
				<span className="form-group">
					<label>User Name:</label>
					<input
						className="form-control"
						type="text"
						placeholder="user name"
						value={ProfileVariables.userName}
						onChange={(event) => this.props.change(event)}
						name="userName"
					/>
					<label>Email:</label>
					<input
						readOnly
						className="form-control"
						type="text"
						placeholder="email"
						value={ProfileVariables.email}
						onChange={(event) => this.props.change(event)}
						name="email"
					/>
					<label>Phone Number:</label>
					<input
						className="form-control"
						type="text"
						placeholder="phone"
						value={ProfileVariables.phone}
						onChange={(event) => this.props.change(event)}
						name="phone"
					/>
					<label>Location:</label>
					<input
						className="form-control"
						type="text"
						placeholder="location"
						value={ProfileVariables.location}
						onChange={(event) => this.props.change(event)}
						name="location"
					/>
					<label>Summary:</label>
					<input
						className="form-control"
						type="text"
						placeholder="summary"
						value={ProfileVariables.summary}
						onChange={(event) => this.props.change(event)}
						name="summary"
					/>
					<label>Upload your image:</label>
					<ImageUpload
						imgUrl={ProfileVariables.imgUrl}
						image={ProfileVariables.image}
						imageProgress={ProfileVariables.imageProgress}
						handleImgChange={(e) => this.props.handleImgChange(e)}
						handleImgUpload={() => this.props.handleImgUpload()}
					/>
					<label>Upload your CV:</label>
					<CVUpload
						cvFileUrl={ProfileVariables.cvFileUrl}
						cvFile={ProfileVariables.cvFile}
						cvProgress={ProfileVariables.cvProgress}
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
					<Conform
						conform={this.props.conform.bind(this)}
						resultOfBook={this.props.resultOfBook}
						answer={this.props.answer.bind(this)}
					/>
				</span>
				<button onClick={this.props.updateInfo.bind(this)}>Update</button>
				<label>{this.props.updatedMsg}</label>
			</div>
		);
	}
}

export default Profile;
