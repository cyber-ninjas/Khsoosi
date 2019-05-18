import React from "react";
import ReactDOM from "react-dom";
import Search  from './combpnants/search.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        cvFile: "",
        img: "",
        summary: "",
        is_teacher: "",
        password: "",
        email: "",
        phone: "",
        location: ""
      },
      teacherProfiles: [],
      current_teacherId: "",
      current_studentId: "",
      rating: {
        text: "",
        rate: ""
      },
      subject: {
        subjectName: "",
        level: ""
      },
      Schedule: {
        day: "",
        startHour: "",
        endHour: ""
      }
    };
  }

  searchInfo(e){
    let temp = e.target.name
    e.preventDefault();
    console.log(e.target.value)
    this.setState(prevState => ({
      user: {
          ...prevState.user,
          [e.target.name]: e.target.value
      }
  })) ;
    console.log(this.state.user);
    
  }

  searchTecher (e) {
    console.log('click')
    e.preventDefault();
   
      // Default options are marked with *
        return fetch(`/ss/?location=${this.state.location}&name=${this.state.name}&level=${this.state.level}`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers : { 
              // 'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
        })
        .then(response => response = response.json() )
        .then(data =>{ this.setState({res:data.data,hide:true}); console.log(this.state.res)});

  }
  componentDidMount() {}

  render() {
    // var {rating} =this.state;
    // var RatingVaribles = {/*varibles*/}
    return (
      <div>
        <Search searchTecher={this.searchTecher}  searchInfo={this.searchInfo.bind(this)}/>
        <h1>Test</h1>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
