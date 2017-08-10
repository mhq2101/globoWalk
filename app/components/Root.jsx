import React from 'react'
import { Router, Route, browserHistory, IndexRedirect, Switch } from 'react-router';
import Home from './Home'

// import App from './components/App';
// import Home from './components/Login/Home';
// import Login from './components/Login/Login';
// import Signup from './components/Login/Signup';
// import SOCKET from '../socket';
// import { whoami, logout } from '../redux/reducers/auth';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class Root extends React.Component {

    // componentDidMount() {
    //     const guitarsThunk = fetchAllGuitars();
    //     store.dispatch(guitarsThunk);

    //     const brandsThunk = fetchAllBrands();
    //     store.dispatch(brandsThunk);

    // }
    render() {
        return (
            <div>
                <div>
                    <Switch>
                        <Route exact path='/' component={Home} />
                    </Switch>
                </div>

            </div>
        )
    }
}
