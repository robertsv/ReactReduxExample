var defaultState = {
    items: [{
        date: '2017.01.01',
        comment: 'Great!'
    },
        {
            date: '2017.01.02',
            comment: 'Great!'
        },]
};

function feedbackApp(state, action) {
    switch (action.type) {
        case 'ADD_FEEDBACK':
            var newState = Object.assign({}, state);
            newState.items.push({
                date: action.date,
                comment: action.feedback
            });

            return newState;

        default:
            return state;
    }
}

var store = Redux.createStore(feedbackApp, defaultState);

class FeedbackRow extends React.Component {
    render() {
        return <tr>
            <td> {
                this.props.feedback.date
            } </td>
            <td> {
                this.props.feedback.comment
            } </td>
        </tr>
    }
}
;

class FeedbackTable extends React.Component {

    constructor(props) {
        super(props);
        var state = this.props.store.getState();
        this.state = {items: state.items};
    }

    componentWillMount() {
        this.props.store.subscribe(() => {
            var state = store.getState();
            this.setState({
                items: state.items
            });
        });
    }

    render() {
        return <div>
            <table className="table table-striped center">
                <thead>
                <tr>
                    <th> Date</th>
                    <th> Comment</th>
                </tr>
                </thead>
                <tbody> {
                    this.state.items.map(function (feedback, index) {
                        return <FeedbackRow feedback={ feedback }/>;
                    })
                } </tbody>
            </table>
            <FeedbackInput store={store}/>
        </div>
    }
}
;

class FeedbackInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.addComment = this.addComment.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    addComment() {
        this.props.store.dispatch({
            type: 'ADD_FEEDBACK', feedback: this.state.value, date: new Date().toString()
        });
    }

    render() {
        return <div className="center">
            <br/>
            Comment <input type="text" value={this.state.value} onChange={this.handleChange}/>
            <br/>
            <br/>
            <button onClick={this.addComment} className="btn btn-default">Add comment</button>
        </div>
    }
}
;


ReactDOM.render(<FeedbackTable store={ store }/>, document.getElementById('application'));
