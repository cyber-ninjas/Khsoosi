import React from 'react';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			is_teacher: false,
			password: '',
			email: '',
			current_teacherId: '',
			current_studentId: '',
			loginMessage: '',
			errorLogin: ''
		};
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
						loginMessage: '',
						password: '',
						email: '',
						errorLogin: data.error
					});
				let user_id = 'current_studentId';
				if (data.is_teacher) user_id = 'current_teacherId';
				localStorage.setItem('token', data.token);
				localStorage.setItem('user_id', data.user_id);

				this.setState({
					errorLogin: '',
					password: '',
					email: '',
					loginMessage: 'Welcome to Khsoosi!',
					[user_id]: data.user_id,
					is_teacher: data.is_teacher
				});
				let obj = {
					is_teacher: this.state.is_teacher,
					current_teacherId: this.state.current_teacherId,
					current_studentId: this.state.current_studentId
				};
				this.props.onLogin(obj);
				setTimeout(() => {
					this.props.closeModal('Login');
					this.setState({ loginMessage: '' });
				}, 500);
			})
			.catch();
	}
	change(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	render() {
		return (
			<form className="sign">
				<div className="form-group">
					<h1 id="login">login</h1>
					<label>Email address</label>
					<input
						className="form-control"
						name="email"
						value={this.state.email}
						onChange={this.change.bind(this)}
						placeholder="example@gmail.com"
					/>
					<label>Password</label>
					<input
						className="form-control"
						value={this.state.password}
						name="password"
						type="password"
						onChange={this.change.bind(this)}
						placeholder="*******"
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="submit" onClick={this.loging.bind(this)} />

				<label>{this.state.loginMessage}</label>
				<label id="error">{this.state.errorLogin}</label>
			</form>
		);
	}
}

export default Login;
