import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/search.jsx';
import ResultSearch from './components/resultSearch.jsx';
import Header from './components/Header.jsx';
import { storage } from '../../server/database/firebase.js';
import TeacherProfile from './components/teacherProfile.jsx';
import Profile from './components/Profile.jsx';
import Modal from 'react-awesome-modal';
import Footer from './components/footer.jsx';
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			cvFile: '',
			cvFileUrl: '',
			image: null,
			imgUrl: '',
			progress: 0,
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
			error: '',
			schedules: [],
			bookes: [],
			classes: [],
			token: '',
			ratings: [],
			message: '',
			rateMessage: '',
			loginMessage: '',
			errorLogin: '',
			modal: false
		};
	}

	updateInfo() {
		const body = {
			userName: this.state.userName,
			cvFileUrl: this.state.cvFileUrl,
			imgUrl: this.state.imgUrl,
			summary: this.state.summary,
			email: this.state.email,
			phone: this.state.phone,
			location: this.state.location,
			current_teacherId: this.state.current_teacherId,
			schedules: this.state.schedules,
			token: this.state.token
		};
		fetch('/updateTeacherProfile', {
			method: 'put',
			body: JSON.stringify(body),
			headers: { 'Content-Type': 'application/json' }
		})
			.then((response) => {
				return response.json();
			})
			.then((body) => {
				// console.log(body);
			});
	}

	updateInfo() {
		const body = {
			userName: this.state.userName,
			cvFileUrl: this.state.cvFileUrl,
			imgUrl: this.state.imgUrl,
			summary: this.state.summary,
			email: this.state.email,
			phone: this.state.phone,
			location: this.state.location,
			current_teacherId: this.state.current_teacherId,
			schedules: this.state.schedules,
			token: this.state.token
		};
		fetch('/updateTeacherProfile', {
			method: 'put',
			body: JSON.stringify(body),
			headers: { 'Content-Type': 'application/json' }
		})
			.then((response) => {
				return response.json();
			})
			.then((body) => {
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
			'state_changed',
			(snapshot) => {
				//progress function ....
				const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
				this.setState({ progress });
			},
			(error) => {
				// error function ....
				// console.log(error);
			},
			() => {
				// complete function ....
				storage.ref('files').child(cvFile.name).getDownloadURL().then((cvFileUrl) => {
					this.setState({ cvFileUrl, cvFile: cvFile.name });
				});
			}
		);
	}
	handleImgUpload() {
		const { image } = this.state;
		const uploadTask = storage.ref(`images/${image.name}`).put(image);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				//progress function ....
				const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
				this.setState({ progress });
			},
			(error) => {
				// error function ....
				console.log(error);
			},
			() => {
				// complete function ....
				storage.ref('images').child(image.name).getDownloadURL().then((imgUrl) => {
					this.setState({ imgUrl });
				});
			}
		);
	}
	// onchangingSignUp(e) {
	// 	this.setState({ [e.target.name]: e.target.value });
	// }
	onSignUp(is_teacher) {
		// console.log('signup');
		const { userName, password, email, phone, location } = this.state;
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
				// console.log(body);
				if (body.error) this.setState({ error: body.error });
				else {
					this.setState({ error: 'Thank you please Login Now!' });
					this.setState({
						userName: '',
						is_teacher: '',
						password: '',
						email: '',
						phone: '',
						location: ''
					});
				}
			})
			.catch((err) => console.log('Error'));
	}

	searchInfo(e) {
		console.log('hello');
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.value });
	}

	change(e) {
		// e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	addSchedule(e) {
		e.preventDefault();
		const { day, startHour, endHour } = this.state;
		const temp = this.state.schedules;
		if (startHour >= endHour) {
			console.log(startHour, endHour);
			this.setState({
				startHour: '',
				endHour: '',
				message: 'error'
			});
		} else {
			this.setState({
				schedules: [ ...temp, { day, startHour, endHour } ]
			});
		}
		//console.log(this.state.startHour, this.state.endHour);
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

	rating(e) {
		e.preventDefault();
		const body = {
			ratingText: this.state.ratingText,
			rate: this.state.rate,
			current_studentId: this.state.current_studentId,
			current_teacherId: this.state.current_teacherId
		};
		fetch('/rating', {
			method: 'post',
			body: JSON.stringify(body),
			headers: { 'Content-Type': 'application/json' }
		})
			.then((response) => {
				return response.json();
			})
			.then((body) => {
				// console.log(body);
				this.setState({
					ratingText: '',
					rate: '',
					rateMessage: 'Thank you for your feedback!'
				});
			});
	}

	showTeacherInfo() {
		return fetch(`/teacherProfile/${this.state.current_teacherId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		})
			.then((response) => (response = response.json()))
			.then((data) => {
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
			.catch((err) => console.log(err));
	}

	searchTecher(e) {
		e ? e.preventDefault() : null;
		const body = {
			location: this.state.location,
			name: this.state.subjectName,
			level: this.state.subjectLevel
		};
		console.log(body.location, body.name, body.level);
		return fetch('/search', {
			method: 'post',
			body: JSON.stringify({
				location: this.state.location,
				name: this.state.subjectName,
				level: this.state.subjectLevel
			}),
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		})
			.then((response) => response.json())
			.then((data) => {
				// console.log(data);
				this.setState({ teacherProfiles: data });
			})
			.catch((err) => console.log(err));
	}

	loging(e) {
		e.preventDefault();
		return fetch(`/login`, {
			method: 'post',
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password
			}),
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.error)
					return this.setState({
						errorLogin: data.error
					});
				let user_id = 'current_studentId';
				if (data.is_teacher) user_id = 'current_teacherId';
				this.setState(
					{
						loginMessage: 'Welccome in Khsoosi!',
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
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		})
			.then((response) => (response = response.json()))
			.then((data) => {
				this.setState({ classes: data.data });
				// console.log(this.state.classes);
			})
			.catch((err) => console.log(err));
	}

	pick(e) {
		e.preventDefault();
		const { data, studentId, teacherId, day, startHour, endHour } = this.state;
		const info = { data, studentId, teacherId, day, startHour, endHour };
		return fetch(
			`/profileUpdata?studentId=${this.state.current_studentId}&teacherId=${this.state
				.current_teacherId}&day=${this.state.day}&start=${this.state.startHour}&end=${this.state.endHour}`,
			{
				method: 'POST',
				data: JSON.stringify(info),
				header: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			}
		).then((result) => console.log(result));
	}

	conform(e) {
		// e.preventDefault();
		return fetch(`/conform?teacherId=${this.state.current_teacherId}`, {
			method: 'GET',
			header: {
				Accept: 'application/json'
			}
		})
			.then((result) => (result = result.json()))
			.then((result) => {
				this.setState({ bookes: result });
				// console.log(this.state.bookes);
			})
			.catch((err) => {
				console.log({ err: 'error' }, err);
			});
	}

	answer(e) {
		e.preventDefault();
		// console.log(e.target.name, e.target.value);
		fetch(
			`/conformAnswer?id=${e.target.name}&confirmed=${e.target.value}&teacherId=${this.state.current_teacherId}`,
			{
				method: 'GET',
				header: {
					Accept: 'application/json'
				}
			}
		)
			.then((result) => (result = result.json()))
			.then((result) => {
				// console.log(this.state.bookes);
				this.setState({ bookes: result });
				// console.log(this.state.bookes);
			});
	}

	radioChange(e) {
		let values = e.target.value;
		values = values.split(' ');
		this.setState({
			day: values[0],
			startHour: values[1],
			endHour: values[2]
		});

		console.log(this.state);
	}
	componentWillMount() {
		this.searchTecher();
	}
	openModal(e) {
		this.setState({
			[e]: true
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
		var {
			userName,
			cvFileUrl,
			imgUrl,
			summary,
			email,
			phone,
			location,
			current_teacherId,
			schedules,
			token,
			cvFile,
			image,
			progress
		} = this.state;
		var ProfileVariables = {
			userName,
			cvFileUrl,
			imgUrl,
			summary,
			email,
			phone,
			location,
			current_teacherId,
			schedules,
			token,
			cvFile,
			image,
			progress
		};
		return (
			<div>
				<Header
					change={this.change.bind(this)}
					onSignUp={this.onSignUp.bind(this)}
					is_teacher={this.state.is_teacher}
					loging={this.loging.bind(this)}
					error={this.state.error}
					loginMessage={this.state.loginMessage}
					errorLogin={this.state.errorLogin}
				/>
				<div className="container">
					{!this.state.is_teacher ? (
						<div>
							<Search searchTecher={this.searchTecher.bind(this)} change={this.change.bind(this)} />
							<ResultSearch resultOfSer={tech} />
							<Modal
								visible={this.state.SignUp}
								width="400"
								height="300"
								effect="fadeInDown"
								onClickAway={() => this.closeModal('modal')}
							>
								<TeacherProfile
									rateMessage={this.state.rateMessage}
									RatingVariables={RatingVariables}
									teacherInfo={this.state}
									showTeacherInfo={this.showTeacherInfo.bind(this)}
									change={this.change.bind(this)}
									rating={this.rating.bind(this)}
									pick={this.pick.bind(this)}
									radioChange={this.radioChange.bind(this)}
								/>
							</Modal>
						</div>
					) : (
						<Profile
							message={this.state.message}
							ProfileVariables={ProfileVariables}
							startHour={this.state.startHour}
							endHour={this.state.endHour}
							change={this.change.bind(this)}
							handleImgChange={(e) => this.handleImgChange(e)}
							handleImgUpload={() => this.handleImgUpload()}
							handleFileChange={(e) => this.handleFileChange(e)}
							handleFileUpload={() => this.handleFileUpload()}
							addSchedule={this.addSchedule.bind(this)}
							removeSchedule={this.removeSchedule.bind(this)}
							updateInfo={this.updateInfo.bind(this)}
							conform={this.conform.bind(this)}
							resultOfBook={this.state.bookes}
							answer={this.answer.bind(this)}
							updatedMsg={this.state.updatedMsg}
						/>
					)}
					{/* <Classes
// //           searchClasses={this.searchClasses.bind(this)}
// //           result={this.state.classes}
// //         /> {/* //  */}{' '}
					*/}
				</div>
				<Footer />
			</div>
		);
	}
}
ReactDOM.render(<App />, document.getElementById('app'));

{
	/* <Classes
          searchClasses={this.searchClasses.bind(this)}
          result={this.state.classes}
        /> */
}
