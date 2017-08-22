import React from 'react';
import { connect } from 'react-redux'
import { login, logout, signup } from '../redux/reducers/auth';
import { Link, withRouter } from 'react-router-dom';

/* -------Component--------- */

class Signup extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <h1>Signup:</h1>
                <form onSubmit={this.props.signup}>
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
                <Link to ="/login"> Login </Link>
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