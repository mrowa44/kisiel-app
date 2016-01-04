App = React.createClass({
  mixins: [ReactMeteorData],

  // this.data.tasks
  getMeteorData() {
    return { tasks: Tasks.find({}).fetch() }
  },

  renderTasks() {
    return this.data.tasks.map((task) => {
      return <Task key={task._id} task={task} />;
    });
  },

  render() {
    return (
      <div className="container">
        <header><h1>Todo list</h1></header>
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});
