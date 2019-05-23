import React from "react";
import ImageUpload from "./imageUpload.jsx";
import CVUpload from "./cvUpload.jsx";
import Schedule from "./Schedule.jsx";
import Confirm from "./confirm.jsx";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      cvFile: "",
      cvFileUrl: "",
      image: null,
      imgUrl: "",
      imageProgress: 0,
      summary: "",
      email: "",
      phone: "",
      location: "",
      current_teacherId: "",
      subjectName: "",
      subjectLevel: "",
      day: "Sunday",
      startHour: "",
      endHour: "",
      schedules: [],
      bookes: []
    };
  }

  updateInfo() {
    const body = {
      userName: this.state.userName,
      cvFileUrl: this.state.cvFileUrl,
      imgUrl: this.state.imgUrl,
      summary: this.state.summary,
      email: this.state.email,
      phone: this.state.phone,
      location: this.state.location,
      current_teacherId: this.state.current_teacherId,
      schedules: this.state.schedules,
      token: this.state.token
    };
    fetch("/updateTeacherProfile", {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        return response.json();
      })
      .then(body => {
        // console.log(body);
      });
  }
  changeSchedules(schedules) {
    this.setState({
      schedules: schedules
    });
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
            value={this.state.userName}
            onChange={event => this.change(event)}
            name="userName"
          />
          <label>Email:</label>
          <input
            readOnly
            className="form-control"
            type="text"
            placeholder="email"
            value={this.state.email}
            onChange={event => this.change(event)}
            name="email"
          />
          <label>Phone Number:</label>
          <input
            className="form-control"
            type="text"
            placeholder="phone"
            value={ProfileVariables.phone}
            onChange={event => this.props.change(event)}
            name="phone"
          />
          <label>Location:</label>
          <input
            className="form-control"
            type="text"
            placeholder="location"
            value={ProfileVariables.location}
            onChange={event => this.props.change(event)}
            name="location"
          />
          <label>Summary:</label>
          <input
            className="form-control"
            type="text"
            placeholder="summary"
            value={ProfileVariables.summary}
            onChange={event => this.props.change(event)}
            name="summary"
          />
          <label>Upload your image:</label>
          <ImageUpload
            imgUrl={ProfileVariables.imgUrl}
            image={ProfileVariables.image}
            imageProgress={ProfileVariables.imageProgress}
            handleImgChange={e => this.props.handleImgChange(e)}
            handleImgUpload={() => this.props.handleImgUpload()}
          />
          <label>Upload your CV:</label>
          <CVUpload
            cvFileUrl={ProfileVariables.cvFileUrl}
            cvFile={ProfileVariables.cvFile}
            cvProgress={ProfileVariables.cvProgress}
            handleFileChange={e => this.props.handleFileChange(e)}
            handleFileUpload={() => this.props.handleFileUpload()}
          />
          <Schedule
            changeSchedules={this.changeSchedules.bind(this)}
            schedules={this.state.schedules}
          />
          <Confirm current_teacherId={this.props.current_teacherId} />
        </span>
        <button onClick={this.props.updateInfo.bind(this)}>Update</button>
        <label>{this.props.updatedMsg}</label>
      </div>
    );
  }
}

export default Profile;
