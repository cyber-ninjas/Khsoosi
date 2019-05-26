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
      cvFileUrl: "",
      imgUrl:
        "https://firebasestorage.googleapis.com/v0/b/khsoosi-upload-file-img.appspot.com/o/images%2Fcbde4e59089dcada08218b49a815175d.svg?alt=media&token=0804202d-9e8f-4a41-9be6-836a37a5475e",
      summary: "",
      email: "",
      phone: "",
      location: "",
      current_teacherId: "",
      subjectName: "",
      subjectLevel: "",
      subjectId: "",
      subjects: [],
      schedules: [],
      updatedMsg: "",
      ratings: []
    };
  }
  componentDidMount() {
    const id = this.props.current_teacherId;
    this.setState({ current_teacherId: id });
    this.showTeacherInfo(id);
  }

  showTeacherInfo(id) {
    // console.log("okkkk");
    return fetch(`/teacherProfile/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(response => (response = response.json()))
      .then(data => {
        // console.log(data);
        if (data.subjects.length === 0) {
          var subjectName = "";
          var subjectLevel = "";
        } else {
          var subjectName = data.subjects[0].name;
          var subjectLevel = data.subjects[0].level;
        }
        var cvFile = data.cvFile || "";
        var img = data.img || "";
        var summary = data.summary || "";
        this.setState({
          userName: data.name,
          cvFileUrl: cvFile,
          imgUrl: img,
          email: data.email,
          phone: data.phone,
          location: data.location,
          summary: summary,
          subjects: data.subjects,
          schedules: data.schedules,
          ratings: data.ratings,
          subjectName: subjectName,
          subjectLevel: subjectLevel
        });
      })
      .catch(err => console.log(err));
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
      subjectName: this.state.subjectName,
      subjectLevel: this.state.subjectLevel
    };
    fetch("/updateTeacherProfile", {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        return response.json();
      })
      .then(resp => {
        this.showTeacherInfo(this.state.current_teacherId);
        this.setState({ updatedMsg: "Updated !" });
      });
  }
  changeCV(cvFileUrl) {
    this.setState({ cvFileUrl: cvFileUrl });
  }
  changeImg(imgUrl) {
    this.setState({ imgUrl: imgUrl });
  }

  changeSchedules(schedules) {
    this.setState({ schedules: schedules });
  }
  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
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
            value={this.state.phone}
            onChange={event => this.change(event)}
            name="phone"
          />
          <label>Location:</label>
          <input
            className="form-control"
            type="text"
            placeholder="location"
            value={this.state.location}
            onChange={event => this.change(event)}
            name="location"
          />
          <label>Subject Level:</label>
          <input
            className="form-control"
            type="text"
            placeholder="subjectLevel"
            value={this.state.subjectLevel}
            onChange={event => this.change(event)}
            name="subjectLevel"
          />
          <label>Subject Name:</label>

          <input
            className="form-control"
            type="text"
            placeholder="subjectName"
            value={this.state.subjectName}
            onChange={event => this.change(event)}
            name="subjectName"
          />
          <label>Summary:</label>
          <input
            className="form-control"
            type="text"
            placeholder="summary"
            value={this.state.summary}
            onChange={event => this.change(event)}
            name="summary"
          />
          <label>Upload your image:</label>
          <ImageUpload
            changeImg={this.changeImg.bind(this)}
            imgUrl={this.state.imgUrl}
          />

          <label>Upload your CV:</label>
          <CVUpload changeCV={this.changeCV.bind(this)} />
          <Schedule
            changeSchedules={this.changeSchedules.bind(this)}
            schedules={this.state.schedules}
          />
          <Confirm current_teacherId={this.props.current_teacherId} />
          <button className="updateBtn" onClick={this.updateInfo.bind(this)}>
            Update
          </button>
          <label>{this.state.updatedMsg}</label>
        </span>
      </div>
    );
  }
}

export default Profile;
