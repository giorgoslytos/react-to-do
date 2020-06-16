import React from 'react';
import '../scss/Task.scss';

class Task extends React.Component {

  render() {
    const bColor = this.props.bColor + " Task list-group-item";
    return (
      <div className={bColor}>
        <div>{this.props.value}</div>
        <button 
          type="button"
          onClick={() => this.props.deleteTask(this.props.index)}
          className="close"
          aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}

export default Task;