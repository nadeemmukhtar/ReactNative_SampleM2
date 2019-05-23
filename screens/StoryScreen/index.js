import React from 'react';
import {updateAppState} from "../../actions/syncActions";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import StoryScreen from "./StoryScreen";


class StoryScreenContainer extends React.Component {
    state = {
    };

    constructor(props) {
        super(props);
        this.closeStoryScreen=this.closeStoryScreen.bind(this);
    }

    static navigationOptions = {
        header: null,
        title: "Story Screen"
    };
    closeStoryScreen()
    {
        this.props.navigation.goBack();
    }



    render() {
        return (
            <StoryScreen
                currentState={this.state}
                closeStoryScreen={this.closeStoryScreen}/>);
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(
            {
                updateAppState
            },
            dispatch
        )
    };
};

export default connect(null, mapDispatchToProps)(StoryScreenContainer);