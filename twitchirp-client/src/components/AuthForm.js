import React, { Component } from "react";

export default class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            profileImageUrl: ""
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = e => {
        e.preventDefault();
        const authType = this.props.singUp ? "signup" : "signin";
        this.props.onAuth(authType, this.state)
        .then(() => {
            this.props.history.push("/");
        })
        .catch(() => {
            return;
        });
    };

    render() {
        const { email, username, password, profileImageUrl } = this.state
        const { 
            singUp, 
            heading, 
            buttonText, 
            errors, 
            history, 
            removeError 
        } = this.props;

        history.listen(() => {
            removeError();
        });

        return(
            <div class="container">
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-6 login-signup">
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            {errors.message && (
                                <div className="alert alert-danger">{errors.message}</div>
                            )}
                            <label htmlFor="email">Email:</label>
                            <input 
                                className="form-control" 
                                id="email" 
                                name="email" 
                                onChange={this.handleChange} 
                                value={email} 
                                type="email"
                                required
                            />
                            <label htmlFor="password">Password:</label>
                            <input 
                                className="form-control" 
                                id="password" 
                                name="password" 
                                onChange={this.handleChange}
                                type="password"
                                minlength="8"
                                required
                            />
                            { singUp && (
                                <div>
                            <label htmlFor="username">Usename:</label>
                            <input 
                                className="form-control" 
                                id="username" 
                                name="username" 
                                onChange={this.handleChange} 
                                value={username} 
                                type="text"
                                required
                            />
                            <label htmlFor="image-url">Image URL:</label>
                            <input 
                                className="form-control" 
                                id="image-url" 
                                name="profileImageUrl" 
                                onChange={this.handleChange}
                                type="url"
                                value={profileImageUrl}
                            />
                                </div>
                            )}
                            <button type="submit" className="btn btn-primary btn-block btn-lg authform"> 
                                {buttonText}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )       
    };
};

