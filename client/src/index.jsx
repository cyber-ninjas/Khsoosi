import React from "react";
import ReactDOM from "react-dom";
import ImageUpload from './components/imageUpload.jsx';
import SignUp from "./components/SignUp.jsx"
import Rating from "./components/Rating.jsx";
import Search from './components/search.jsx';
import ResultSearch from './components/resultSearch.jsx';
import Header from './components/Header.jsx';
import Classes from './components/classes.jsx';
import Login from './components/login.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      cvFile: "",
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
      current_teacherId: "",
      current_studentId: "",
      ratingText: "",
      rate: "",
      subjectName: "",
      subjectLevel: "",
      day: "",
      startHour: "",
      endHour: "",
      classes: [],
      token: ''
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
    // e.preventDefault();
    const formData = new FormData();
    formData.append('myImage',this.state.image);
    // const body = this.state.image
    fetch('/profileUpdate', {
      method: 'post',
      body: (formData)
      // headers: {
      //   'Accept': 'application/json',
      //   "Content-Type": "multipart/form-data"
      // }
    })
    // .then((res) => {
    //   return res.json();
    // }).then((data) => {
    //   this.setState({imgUrl: data.url});
    // });
		// const {image} = this.state;
		// const uploadTask = storage.ref(`images/${image.name}`).put(image);
		// uploadTask.on('state_changed', 
		// (snapshot) => {
		// 	//progress function ....
		// 	const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
		// 	this.setState({progress});
		// },
		// (error) => {
		// 	// error function ....
		// 	console.log(error);
		// },
		// () => {
		// 	// complete function ....
		// 	storage.ref('images').child(image.name).getDownloadURL().then(imgUrl => {
    //     this.setState({imgUrl});
    //     console.log(this.state);
    //     console.log(imgUrl);
    //   })
		// });
    // console.log(this.state);
  }
  onchangingSignUp(e){
    this.setState({[e.target.name]:e.target.value});
  }
  onSignUp(){
    console.log("signup");
    const { userName, is_teacher, password, email, phone, location } = this.state;
    const body = { userName, is_teacher, password, email, phone, location };
    fetch('/signup', {
      method: 'post',
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }).then((response) => {
      return response.json();
    }).then((body) => {
      console.log(body)
      this.setState({ userName:'', is_teacher:'', password:'', email:'', phone:'', location:'' });
    });
  }
  componentDidMount() {}

  searchInfo(e) {
    console.log(this.state[e.target.name])
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }
  componentDidMount() { }

  onRatingChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  rating() {
    const body = { ratingText: this.state.ratingText, rate: this.state.rate };
    fetch('/rating', {
      method: 'post',
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }).then((response) => {
      return response.json();
    }).then((body) => {
      console.log(body)
      this.setState({ ratingText: '', rate: '' });
    });
  }

  searchTecher(e) {

    e.preventDefault();

    // Default options are marked with *
    return fetch(`/search/?location=${this.state.location}&name=${this.state.subjectName}&level=${this.state.subjectLevel}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        // 'Content-Type': 'application/json',
        'Accept': 'application/json'
			}
		})
			.then((response) => (response = response.json()))
			.then((data) => {
				this.setState({ classes: data.data });
				console.log(this.state.classes);
			}).catch((err)=>console.log(err))
	} 

	loging(e) {
		e.preventDefault();
		return fetch(`/login?email=${this.state.email}&password=${this.state.password}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		})
			.then((response) => response.json())
			.then((data) => {
        if(data.err)return console.log(data);
				let user_id = 'current_studentId';
				if (data.is_teacher) user_id = 'current_teacherId';
				this.setState({ token: data.token, [user_id]: data.user_id, is_teacher: data.is_teacher }, () => {
          if(this.state.is_teacher){
            ///// go to the teacher profile /////// 
          }else{
            ///// go to the student profile ///////
          }
					console.log(this.state.token," ",this.state.is_teacher," ",this.state.current_teacherId);
				});
			}).catch()
	}

	searchClasses(e) {
		e.preventDefault();
		return fetch(`/classes?id=${1}`, {
			method: 'GET',
			headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
    .then((response) => (response = response.json()))
    .then((data) => {
        this.setState({ classes: data.data });
        console.log(this.state.classes);
    }).catch((err)=>console.log(err))
} 

  render() {
    var tech = this.state.teacherProfiles;
    var { ratingText, rate, current_studentId, current_teacherId } = this.state;
    var RatingVariables = { ratingText, rate, current_studentId, current_teacherId };
    return (
      <div>
        <div>
        <Header />
        <img src='https://www.trentu.ca/english/sites/trentu.ca.english/files/styles/header_image/public/header_images/header_creative_writing2.jpg?itok=qqMcjzSZ'/>
        <h1>Test by Cyber-Ninjas</h1>
        <ImageUpload imgUrl={this.state.imgUrl} 
                     image={this.state.image}
                     progress={this.state.progress}
                     handleImgChange={e => this.handleImgChange(e)} 
                     handleImgUpload={() => this.handleImgUpload()} />
        <SignUp onchangingSignUp={this.onchangingSignUp.bind(this)} onSignUp={this.onSignUp.bind(this)} is_teacher={this.state.is_teacher}/>
        <Search searchTecher={this.searchTecher.bind(this)} searchInfo={this.searchInfo.bind(this)} />
        <ResultSearch resultOfSer={tech} />
        <Rating RatingVariables={RatingVariables} onChange={event => this.onRatingChange(event)} onClick={event => this.rating(event)} />
        <Classes searchClasses={this.searchClasses.bind(this)} result={this.state.classes} />
				<Login searchInfo={this.searchInfo.bind(this)} loging={this.loging.bind(this)} />
        </div>
         
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('app'));
