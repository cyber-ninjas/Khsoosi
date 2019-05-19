import React from "react";
import ReactDOM from "react-dom";
import Search  from './combpnants/search.jsx'
import ResultSearch  from './components/resultSearch.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      cvFile: "",
      img: "",
      summary: "",
      is_teacher: "",
      password: "",
      email: "",
      phone: "",
      location: "",
      teacherProfiles: [],
      current_teacherId: "",
      current_studentId: "",
      ratingText: "",
      rate: "",
      subjectName: "",
      subjectLevel: "",
      day: "",
      startHour: "",
      endHour: ""
    };
  }
//this fucntion lisent to the chages in search bar
   searchInfo(e) {
    e.preventDefault()
    this.setState({[e.target.name]:e.target.value})
  }
  componentDidMount() {}

///this function send the info from the serach bar to the server 
  searchTecher (e) {
   e.preventDefault();
      return fetch(`/search/?location=${this.state.location}&name=${this.state.subjectName}&level=${this.state.subjectLevel}`, {
            method: 'GET', 
            headers : { 
             
              'Accept': 'application/json'
             }
        })
        .then(response => response = response.json() )
        .then(data =>{ this.setState({teacherProfiles:data.data}); console.log(this.state.teacherProfiles)});

  }
  componentDidMount() {}

  render() {
    var tech = this.state.teacherProfiles
   return (
      <div>
        <Search searchTecher={this.searchTecher.bind(this)}  searchInfo={this.searchInfo.bind(this)}/>
        <ResultSearch resultOfSer={tech}/>
        <h1>Test</h1>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
