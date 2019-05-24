import React from "react";
import ReactDOM from "react-dom";
import Search from "./components/search.jsx";
import ResultSearch from "./components/resultSearch.jsx";
import Header from "./components/Header.jsx";
import { storage } from "../../server/database/firebase.js";
import TeacherProfile from "./components/teacherProfile.jsx";
import Profile from "./components/Profile.jsx";
import Modal from "react-awesome-modal";
import Footer from "./components/footer.jsx";
import $ from "jquery";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      // cvFile: "",
      // cvFileUrl: "",
      // image: null,
      // imgUrl: "",
      // imageProgress: 0,
      // summary: "",
      is_teacher: false,
      // password: "",
      // email: "",
      // phone: "",
      // location: "",
      teacherProfiles: [],
      current_teacherId: "",
      current_studentId: "",
      // ratingText: "",
      // rate: "",
      // subjectName: "",
      // subjectLevel: "",
      // day: "Sunday",
      // startHour: "",
      // endHour: "",
      // error: "",
      schedules: [],
      // bookes: [],
      classes: [],
      token: "",
      ratings: [],
      // message: "",
      // rateMessage: "",
      // loginMessage: "",
      // errorLogin: "",
      modal: false
    };
  }

  // onchangingSignUp(e) {
  // 	this.setState({ [e.target.name]: e.target.value });
  // }

  showTeacherInfo(id) {
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
        this.setState({
          userName: data.name,
          cvFileUrl: data.cvFile,
          imgUrl: data.img,
          email: data.email,
          phone: data.phone,
          location: data.location,
          summary: data.summary,
          ratings: data.ratings,
          schedules: data.schedules
        });
      })
      .catch(err => console.log(err));
  }

  searchTecher(e) {
    e ? e.preventDefault() : null;
    const body = {
      location: this.state.location,
      name: this.state.subjectName,
      level: this.state.subjectLevel
    };
    // console.log(body.location, body.name, body.level);
    return fetch("/search", {
      method: "post",
      body: JSON.stringify({
        location: this.state.location,
        name: this.state.subjectName,
        level: this.state.subjectLevel
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.setState({ teacherProfiles: data });
      })
      .catch(err => console.log(err));
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

  radioChange(e) {
    let values = e.target.value;
    values = values.split(" ");
    this.setState({
      day: values[0],
      startHour: values[1],
      endHour: values[2]
    });

    // console.log(this.state);
  }
  componentWillMount() {
    this.searchTecher();
  }
  openModal(id) {
    // console.log(id);
    this.showTeacherInfo(id);
    this.setState(
      {
        current_teacherId: id
      },
      () =>
        this.setState({
          modal: true
        })
    );
  }
  closeModal() {
    this.setState({
      modal: false
    });
  }
  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onLogin(obj) {
    this.setState({
      current_studentId: obj.current_studentId,
      current_teacherId: obj.current_teacherId,
      is_teacher: obj.is_teacher
    });
  }
  rating() {}
  render() {
    var { ratingText, rate, current_studentId, current_teacherId } = this.state;
    var RatingVariables = {
      ratingText,
      rate,
      current_studentId,
      current_teacherId
    };

    return (
      <div>
        <Header onLogin={this.onLogin.bind(this)} />
        <div className="container">
          {!this.state.is_teacher ? (
            <div>
              <Search
                searchTecher={this.searchTecher.bind(this)}
                change={this.change.bind(this)}
              />
              <ResultSearch
                openModal={this.openModal.bind(this)}
                // closeModal={this.closeModal.bind(this)}
                resultOfSer={this.state.teacherProfiles}
              />
              <Modal
                visible={this.state.modal}
                width="70%"
                height="100%"
                effect="fadeInDown"
                onClickAway={() => this.closeModal()}
              >
                <TeacherProfile
                  // rateMessage={this.state.rateMessage}
                  // RatingVariables={RatingVariables}
                  current_studentId={this.state.current_studentId}
                  current_teacherId={this.state.current_teacherId}
                  teacherInfo={this.state}
                  showTeacherInfo={this.showTeacherInfo.bind(this)}
                  change={this.change.bind(this)}
                  // rating={this.rating.bind(this)}
                  pick={this.pick.bind(this)}
                  radioChange={this.radioChange.bind(this)}
                />
              </Modal>
            </div>
          ) : (
            <Profile current_teacherId={this.state.current_teacherId} />
          )}
        </div>
        <Footer />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
