import React from "react";
import ReactDOM from "react-dom";
import ImageUpload from './components/imageUpload.jsx';
import {storage} from '..server/database/firebase.js';
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
        location: "",
        urlImg: '',
			  progress: 0
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
        <h1>Test</h1>
        <ImageUpload onChange={e => this.handleImgChange(e)} onClick = {e => this.handleImgUpload(e)} 
        urlImg = {this.state.name.urlImg} progress = {this.state.name.progress} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
