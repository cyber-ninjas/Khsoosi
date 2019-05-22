import React from 'react';

class Login extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h1 id="login">login</h1>
				<input
					className="inputLogin"
					name="email"
					onChange={this.props.change.bind(this)}
					placeholder="example@gmail.com"
				/>
				<input
					className="inputLogin"
					name="password"
					type="password"
					onChange={this.props.change.bind(this)}
					placeholder="*******"
				/>
				<button onClick={this.props.loging.bind(this)}> login</button>
			</div>
		);
	}
}

export default Login;
