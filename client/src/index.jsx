import React from "react";
import ReactDOM from "react-dom";
import ImageUpload from './components/imageUpload.jsx';
import {storage} from '..server/database/firebase.js';
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
  handleImgChange = e => {
    if (e.target.files[0]) {
      const img = e.target.files[0];
      this.setState(() => ({img}));    
    }
    console.log(this.state);
  }
  handleImgUpload = () => {
		const {img} = this.state;
		const uploadTask = storage.ref(`images/${img.name}`).put(img);
		uploadTask.on('state_changed', 
		(snapshot) => {
			//progress function ....
			const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
			this.setState({progress});
		},
		(error) => {
			// error function ....
			console.log(error);
		},
		() => {
			// complete function ....
			storage.ref('images').child(img.name).getDownloadURL().then(url => {
				this.setState({url});
			})
		});
		console.log(this.state);
  }
  componentDidMount() {}

  render() {
    // var {rating} =this.state;
    // var RatingVaribles = {/*varibles*/}
    return (
      <div>
        <h1>Test by Cyber-Ninjas</h1>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
