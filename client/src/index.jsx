import React from "react";
import ReactDOM from "react-dom";
import Search from "./components/search.jsx";
import ResultSearch from "./components/resultSearch.jsx";
import Header from "./components/Header.jsx";
import TeacherProfile from "./components/teacherProfile.jsx";
import Profile from "./components/Profile.jsx";
import Modal from "react-awesome-modal";
import Footer from "./components/footer.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      is_teacher: false,
      location: "",
      teacherProfiles: [],
      current_teacherId: "",
      current_studentId: "",
      subjectName: "",
      subjectLevel: "",
      schedules: [],
      classes: [],
      token: "",
      ratings: [],
      popup: false,
      modal: false
    };
  }

  showTeacherInfo(id) {
    id
      ? fetch(`/teacherProfile/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        })
          .then(result => (result = result.json()))
          .then(data => {
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
          .catch(err => console.log(err))
      : null;
  }

  searchTecher(e) {
    e ? e.preventDefault() : null;
    const body = {
      location: this.state.location,
      name: this.state.subjectName,
      level: this.state.subjectLevel
    };

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

  componentWillMount() {
    this.searchTecher();
  }
  openModal(id) {
    if (this.state.current_studentId === "") {
      this.setState({ popup: true });

      setTimeout(() => {
        this.setState({ popup: false });
      }, 2000);
    } else {
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
                resultOfSer={this.state.teacherProfiles}
              />
              <Modal
                visible={this.state.modal}
                width="70%"
                height="50%"
                effect="fadeInDown"
                onClickAway={() => this.closeModal()}
              >
                <TeacherProfile
                  current_studentId={this.state.current_studentId}
                  current_teacherId={this.state.current_teacherId}
                  teacherInfo={this.state}
                  showTeacherInfo={this.showTeacherInfo.bind(this)}
                  change={this.change.bind(this)}
                />
              </Modal>
            </div>
          ) : (
            <Profile current_teacherId={this.state.current_teacherId} />
          )}
        </div>
        <div>
          <Modal
            visible={this.state.popup}
            width="40%"
            height="30%"
            effect="fadeInDown"
            onClickAway={() => this.setState({ popup: false })}
          >
            <h1 id="plzlogin"> please login first! </h1>
          </Modal>
          <Footer />
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
