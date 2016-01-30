Task = React.createClass({
  propTypes: {
    task: React.PropTypes.object.isRequired,
    showPrivateButton: React.PropTypes.bool.isRequired
  },

  toggleChecked() {
    Meteor.call("setChecked", this.props.task._id, ! this.props.task.checked);
  },

  togglePrivate() {
    Meteor.call("setPrivate", this.props.task._id, ! this.props.task.private);
  },

  deleteThisTask() {
    Meteor.call("removeTask", this.props.task._id)
  },

  render() {
    const taskClassName = (this.props.task.checked ? "checked" : "") + " " +
          (this.props.task.private ? "private" : "");
    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask}>
          &times;
        </button>
        <input
          type="checkbox"
          readOnly={true}
          checked={this.props.task.checked}
          onClick={this.toggleChecked} />

        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate}>
            { this.props.task.private ? "Private" : "Public" }
          </button>
        ) : ''}

         <span className="text">
            {this.props.task.text} <em>~{this.props.task.username}</em>
         </span>
      </li>
    );
  }
});
