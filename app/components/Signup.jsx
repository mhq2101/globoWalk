import React from 'react';
import { connect } from 'react-redux'
import { login, logout, signup } from '../redux/reducers/auth';
import { Link, Redirect, withRouter } from 'react-router-dom';

/* -------Component--------- */

class Signup extends React.Component {
    constructor(props) {
        super(props);
        // this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    // handleSubmit() {
    //     this.props.signup
    //     this.props.history.push("/user")
    // }

    render() {
        return (
            <div>
                <h1>Signup:</h1>
                <form onSubmit={(event) => this.props.signup}>
                    <div>
                        <input
                            key="name"
                            name="name"
                            type="name"
                            placeholder="name"
                            required
                        />
                    </div>
                    <div>
                        <input
                            key="email"
                            name="email"
                            type="email"
                            placeholder="email"
                            required
                        />
                    </div>
                    <div>
                        <input
                            key="password"
                            name="password"
                            type="password"
                            placeholder="password"
                            required
                        />
                        <button type="submit">Signup for GloboWalk </button>
                    </div>
                </form>
                <div>
                    <a target="_self" href="/api/auth/google/login">
                        <span className="fa fa-google" ></span>
                        Signup with Google
                    </a>
                </div>
            </div>
        )
    }
}

/*-------Container-----------*/


const mapState = null;

const mapDispatch = dispatch => ({
    signup(event) {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        dispatch(signup(name, email, password));
    }
});

export default connect(mapState, mapDispatch)(Signup)