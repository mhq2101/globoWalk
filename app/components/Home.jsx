import React from 'react';
import { connect } from 'react-redux'


/* -------Component--------- */

class Home extends React.Component {

    render() {
        return (
            <h1>This is the Home Route</h1>
        )
    }

}

/*-------Container-----------*/


const mapState = null;

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Home)