import React from "react";
import ReactDOM from "react-dom";
import ImageUpload from './components/imageUpload.jsx';
import {storage} from '/Users/rbk-4/Desktop/Khsoosi/server/database/firebase.js';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      cvFile: "",
      image: "",
      imgUrl: "",
      progress: 0,
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
  handleImgChange (e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
      console.log(image);
    }
    console.log(this.state);
    
  }
  handleImgUpload () {
		const {image} = this.state;
		const uploadTask = storage.ref(`images/${image.name}`).put(image);
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
			storage.ref('images').child(image.name).getDownloadURL().then(imgUrl => {
        this.setState({imgUrl});
        console.log(this.state);
        console.log(imgUrl);
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
        <ImageUpload imgUrl={this.state.imgUrl} 
                     image={this.state.image}
                     progress={this.state.progress}
                     handleImgChange={e => this.handleImgChange(e)} 
                     handleImgUpload={() => this.handleImgUpload()} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
