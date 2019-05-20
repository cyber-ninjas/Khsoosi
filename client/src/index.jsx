import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from './components/SignUp.jsx';
import Rating from './components/Rating.jsx';
import Search from './combpnants/search.jsx';
import ResultSearch from './components/resultSearch.jsx';
import Classes from './components/see classes.jsx';
import Login from './components/login.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			cvFile: '',
			img: '',
			summary: '',
			is_teacher: false,
			password: '',
			email: '',
			phone: '',
			location: '',
			teacherProfiles: [],
			current_teacherId: '',
			current_studentId: '',
			ratingText: '',
			rate: '',
			subjectName: '',
			subjectLevel: '',
			day: '',
			startHour: '',
			endHour: '',
			classes: [],
			token: ''
		};
	}
	onchangingSignUp(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	onSignUp() {
		console.log('signup');
		const { userName, is_teacher, password, email, phone, location } = this.state;
		const body = { userName, is_teacher, password, email, phone, location };
		fetch('/signup', {
			method: 'post',
			body: JSON.stringify(body),
			headers: { 'Content-Type': 'application/json' }
		})
			.then((response) => {
				return response.json();
			})
			.then((body) => {
				console.log(body);
				this.setState({ userName: '', is_teacher: '', password: '', email: '', phone: '', location: '' });
			});
	}
	componentDidMount() {}

	searchInfo(e) {
		console.log(this.state[e.target.name]);
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.value });
	}
	componentDidMount() {}
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
			headers: { 'Content-Type': 'application/json' }
		})
			.then((response) => {
				return response.json();
			})
			.then((body) => {
				console.log(body);
				this.setState({ ratingText: '', rate: '' });
			});
	}
	//this functiom for search about the teacher whom match the order of the clinet (send the info to the server)
	searchTecher(e) {
		e.preventDefault();
		return fetch(
			`/search/?location=${this.state.location}&name=${this.state.subjectName}&level=${this.state.subjectLevel}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json'
				}
			}
		)
			.then((response) => (response = response.json()))
			.then((data) => {
				this.setState({ teacherProfiles: data.data });
				console.log(this.state.teacherProfiles);
			});
	}
	////this function give the teacher a schedule of the classes he/she have
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

	componentDidMount() {}

	render() {
		var tech = this.state.teacherProfiles;
		// var {rating} =this.state;
		// var RatingVaribles = {/*varibles*/}
		var { ratingText, rate, current_studentId, current_teacherId } = this.state;
		var RatingVariables = { ratingText, rate, current_studentId, current_teacherId };
		return (
			<div>
				<h1>Test by Cyber-Ninjas</h1>
				<SignUp
					onchangingSignUp={this.onchangingSignUp.bind(this)}
					onSignUp={this.onSignUp.bind(this)}
					is_teacher={this.state.is_teacher}
				/>
				<Search searchTecher={this.searchTecher.bind(this)} searchInfo={this.searchInfo.bind(this)} />
				<ResultSearch resultOfSer={tech} />
				<Rating
					RatingVariables={RatingVariables}
					onChange={(event) => this.onRatingChange(event)}
					onClick={(event) => this.rating(event)}
				/>
				<Classes searchClasses={this.searchClasses.bind(this)} result={this.state.classes} />
				<Login searchInfo={this.searchInfo.bind(this)} loging={this.loging.bind(this)} />
				<h1>Test</h1>
			</div>
		);
	}
}
ReactDOM.render(<App />, document.getElementById('app'));
