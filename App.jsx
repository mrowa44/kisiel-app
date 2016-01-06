App = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      hideCompleted: false
    }
  },

  // this.data.tasks
  getMeteorData() {
    let query = {};

    if (this.state.hideCompleted) {
      query = {checked: {$ne: true}}
    }

    return {
      tasks: Tasks.find(query, { sort: {createdAt: -1}}).fetch(),
      undoneCount: Tasks.find({checked: {$ne: true}}).count()
}
  },

  renderTasks() {
    return this.data.tasks.map((task) => {
      return <Task key={task._id} task={task} />;
    });
  },

  handleSubmit(e) {
    e.preventDefault();
    var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    Tasks.insert({ text: text, createdAt: new Date() });
    ReactDOM.findDOMNode(this.refs.textInput).value = "";
  },

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted
    });
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo list ({this.data.undoneCount})</h1>
            <label className="hide-completed">
            <input
              type="checkbox"
              readOnly={true}
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted} />
              Hide Completed Tasks
          </label>
          <AccountsUIWrapper />

          <form className="new-task" onSubmit={this.handleSubmit} >
            <input type="text" ref="textInput" placeholder="Type to add new tasks" />
          </form>
        </header>
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});
