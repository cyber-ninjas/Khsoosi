import React from "react";
import ReactDOM from "react-dom";
import ImageUpload from "./components/imageUpload.jsx";
import CVUpload from "./components/cvUpload.jsx";
import SignUp from "./components/SignUp.jsx";
import Rating from "./components/Rating.jsx";
import Search from "./components/search.jsx";
import ResultSearch from "./components/resultSearch.jsx";
import Header from "./components/Header.jsx";
import { storage } from "../../server/database/firebase.js";
import Classes from "./components/classes.jsx";
import Login from "./components/login.jsx";
import Conform from "./components/conform.jsx";
import Schedule from "./components/Schedule.jsx";
import TeacherProfile from "./components/teacherProfile.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      cvFile: "",
      cvFileUrl: "",
      image: null,
      imgUrl: "",
      progress: 0,
      summary: "",
      is_teacher: false,
      password: "",
      email: "",
      phone: "",
      location: "",
      teacherProfiles: [],
      current_teacherId: "4",
      current_studentId: "4",
      ratingText: "",
      rate: "",
      subjectName: "",
      subjectLevel: "",
      day: "Sunday",
      startHour: "",
      endHour: "",
      error: "",
      schedules: [],
      bookes: [],
      classes: [],
      token: "",
      ratings: []
    };
  }

  updateInfo() {
    const {
      userName,
      cvFileUrl,
      imgUrl,
      summary,
      email,
      phone,
      location,
      current_teacherId,
      schedule,
      token
    } = this.state;
    const body = {
      userName,
      cvFileUrl,
      imgUrl,
      summary,
      email,
      phone,
      location,
      current_teacherId,
      schedule,
      token
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

  handleImgChange(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  }
  handleFileChange(e) {
    if (e.target.files[0]) {
      const cvFile = e.target.files[0];
      this.setState(() => ({ cvFile }));
    }
  }
  handleFileUpload() {
    const { cvFile } = this.state;
    const uploadTask = storage.ref(`files/${cvFile.name}`).put(cvFile);
    uploadTask.on(
      "state_changed",
      snapshot => {
        //progress function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        // error function ....
        // console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref("files")
          .child(cvFile.name)
          .getDownloadURL()
          .then(cvFileUrl => {
            this.setState({ cvFileUrl, cvFile: cvFile.name });
          });
      }
    );
  }
  handleImgUpload() {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        //progress function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(imgUrl => {
            this.setState({ imgUrl });
          });
      }
    );
  }
  // onchangingSignUp(e) {
  // 	this.setState({ [e.target.name]: e.target.value });
  // }
  onSignUp() {
    // console.log('signup');
    const {
      userName,
      is_teacher,
      password,
      email,
      phone,
      location
    } = this.state;
    const body = { userName, is_teacher, password, email, phone, location };
    fetch("/signup", {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        return response.json();
      })
      .then(body => {
        // console.log(body);
        if (body.error) this.setState({ error: body.error });
        else {
          this.setState({
            userName: "",
            is_teacher: "",
            password: "",
            email: "",
            phone: "",
            location: ""
          });
        }
      })
      .catch(err => console.log("Error"));
  }

  searchInfo(e) {
    // console.log(this.state[e.target.name]);
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addSchedule(e) {
    e.preventDefault();
    const { day, startHour, endHour } = this.state;
    const temp = this.state.schedules;
    this.setState({
      schedules: [...temp, { day, startHour, endHour }]
    });
    // console.log(this.state.schedules);
  }

  removeSchedule(e) {
    let { schedules } = this.state;
    schedules.forEach((element, index) => {
      if (element.day === e.target.value) {
        schedules.splice(index, 1);
      }
    });
    this.setState({
      schedules: schedules
    });
    // console.log(this.state.schedules);
  }

  rating() {
    const body = {
      ratingText: this.state.ratingText,
      rate: this.state.rate,
      current_studentId: this.state.current_studentId,
      current_teacherId: this.state.current_teacherId
    };
    fetch("/rating", {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        return response.json();
      })
      .then(body => {
        // console.log(body);
        this.setState({ ratingText: "", rate: "" });
      });
  }

  showTeacherInfo() {
    return fetch(`/teacherProfile/${this.state.current_teacherId}`, {
      method: "GET",
      headers: {
        // 'Content-Type': 'application/json',
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.setState(
          {
            userName: data.name,
            cvFileUrl: data.cvFile,
            imgUrl: data.img,
            email: data.email,
            phone: data.phone,
            location: data.location,
            summary: data.summary,
            ratings: data.ratings,
            schedules: data.schedules
          }
          // ,() => console.log(this.state)
        );
      })
      .catch(err => console.log(err));
  }

  searchTecher(e) {
    e.preventDefault();
    return fetch(
      `/search/?location=${this.state.location}&name=${
        this.state.subjectName
      }&level=${this.state.subjectLevel}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      }
    )
      .then(response => (response = response.json()))
      .then(data => {
        this.setState({ teacherProfiles: data.data });
        // console.log(this.state.teacherProfiles);
      })
      .catch(err => console.log(err));
  }

  loging(e) {
    e.preventDefault();
    return fetch(
      `/login?email=${this.state.email}&password=${this.state.password}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data.err) return console.log(data);
        let user_id = "current_studentId";
        if (data.is_teacher) user_id = "current_teacherId";
        this.setState(
          {
            token: data.token,
            [user_id]: data.user_id,
            is_teacher: data.is_teacher
          },
          () => {
            if (this.state.is_teacher) {
              ///// go to the teacher profile ///////
            } else {
              ///// go to the student profile ///////
            }
            // console.log(this.state.token, ' ', this.state.is_teacher, ' ', this.state.current_teacherId);
          }
        );
      })
      .catch();
  }

  searchClasses(e) {
    e.preventDefault();
    return fetch(`/classes?id=${1}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(response => (response = response.json()))
      .then(data => {
        this.setState({ classes: data.data });
        // console.log(this.state.classes);
      })
      .catch(err => console.log(err));
  }

  pick(e) {
    e.preventDefault();
    const { data, studentId, teacherId, day, startHour, endHour } = this.state;
    const info = { data, studentId, teacherId, day, startHour, endHour };
    return fetch(
      `/profileUpdata?studentId=${this.state.current_studentId}&teacherId=${
        this.state.current_teacherId
      }&day=${this.state.day}&start=${this.state.startHour}&end=${
        this.state.endHour
      }`,
      {
        method: "POST",
        data: JSON.stringify(info),
        header: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    ).then(result => console.log(result));
  }

  conform(e) {
    // e.preventDefault();
    return fetch(`/conform?teacherId=${this.state.current_teacherId}`, {
      method: "GET",
      header: {
        Accept: "application/json"
      }
    })
      .then(result => (result = result.json()))
      .then(result => {
        this.setState({ bookes: result });
        // console.log(this.state.bookes);
      })
      .catch(err => {
        console.log({ err: "error" }, err);
      });
  }

  answer(e) {
    e.preventDefault();
    // console.log(e.target.name, e.target.value);
    fetch(
      `/conformAnswer?id=${e.target.name}&confirmed=${
        e.target.value
      }&teacherId=${this.state.current_teacherId}`,
      {
        method: "GET",
        header: {
          Accept: "application/json"
        }
      }
    )
      .then(result => (result = result.json()))
      .then(result => {
        // console.log(this.state.bookes);
        this.setState({ bookes: result });
        // console.log(this.state.bookes);
      });
  }

  render() {
    var tech = this.state.teacherProfiles;
    var { ratingText, rate, current_studentId, current_teacherId } = this.state;
    var RatingVariables = {
      ratingText,
      rate,
      current_studentId,
      current_teacherId
    };
    return (
      <div>
        <Header
          change={this.change.bind(this)}
          onSignUp={this.onSignUp.bind(this)}
          is_teacher={this.state.is_teacher}
          loging={this.loging.bind(this)}
          error={this.state.error}
        />
        <Search
          searchTecher={this.searchTecher.bind(this)}
          searchInfo={this.searchInfo.bind(this)}
        />
        <ResultSearch resultOfSer={tech} />
        <Rating
          RatingVariables={RatingVariables}
          onChange={event => this.change(event)}
          onClick={event => this.rating(event)}
        />
        <Classes
          searchClasses={this.searchClasses.bind(this)}
          result={this.state.classes}
        />
        <ImageUpload
          imgUrl={this.state.imgUrl}
          image={this.state.image}
          progress={this.state.progress}
          handleImgChange={e => this.handleImgChange(e)}
          handleImgUpload={() => this.handleImgUpload()}
        />
        <CVUpload
          cvFileUrl={this.state.cvFileUrl}
          cvFile={this.state.cvFile}
          progress={this.state.progress}
          handleFileChange={e => this.handleFileChange(e)}
          handleFileUpload={() => this.handleFileUpload()}
        />
        <Schedule
          schedules={this.state.schedules}
          change={this.change.bind(this)}
          addSchedule={this.addSchedule.bind(this)}
          removeSchedule={this.removeSchedule.bind(this)}
        />
        <TeacherProfile
          teacherInfo={this.state}
          showTeacherInfo={this.showTeacherInfo.bind(this)}
          pick={this.pick.bind(this)}
        />
        <Conform
          conform={this.conform.bind(this)}
          resultOfBook={this.state.bookes}
          answer={this.answer.bind(this)}
        />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
