import React from 'react';
import '../scss/App.scss';
import Task from './Task';

class App extends React.Component {
  
  bColors = [
    "list-group-item-primary",
    "list-group-item-secondary",
    "list-group-item-success",
    "list-group-item-danger",
    "list-group-item-warning",
    "list-group-item-info",
    "list-group-item-dark"
  ]

  constructor() {
    super();
    this.state = {
      text: '',
      tasks:  []
    }
    this.formSubmission = this.formSubmission.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  formSubmission(e) {
    e.persist()
    if(e.keyCode>47 && e.keyCode<57 || e.keyCode>64 && e.keyCode<91 || e.keyCode>95 && e.keyCode<223) {
      this.setState((prevState) => { 
        return { 
          text: prevState.text + e.key
        }
      });
    }
    if(e.keyCode === 32){
      this.setState((prevState) => { 
        return { 
          text: prevState.text + '\xa0'
        }
      });
    }
    if(e.keyCode === 13){
      if(this.state.text !== ''){
        this.setState(() => { 
          return { 
            text: '',
          }
        });
        e.target.value = '';
        
        let tsks = [...this.state.tasks];
        tsks.push(
          {
            text: this.state.text,
            bColor: this.bColors[Math.floor(Math.random()*7)]
          }
        );
        this.setState((prevState) => {
          return {
            tasks: tsks
          }
        })
      } else {
        this.setState(() => { 
          return { 
            text: '',
          }
        });
      }
      e.preventDefault();
    }
    if(e.keyCode === 8){
      let delChar = this.state.text;
      delChar = delChar.substring(0, delChar.length-1)
      this.setState((prevState) => { 
        return { 
          text: delChar
        }
      });
    }

  }

  deleteTask(taskPos) {
    let tsks = [...this.state.tasks];
    tsks.splice(taskPos, 1);
    this.setState((prevState) => {
      return {
        tasks: tsks
      }
    })
  }

  render () {
    return (
      <div className="App container mt-5 text-center card">
        <h1 className="my-4">React To Do App</h1>
        {this.state.tasks.map((value, index) => <Task 
          key={index} 
          index={index}
          value={value.text} 
          bColor={value.bColor}
          deleteTask={this.deleteTask}/>)}
        <div className="my-2">{this.state.text}</div>
        <form className="form-group d-flex">
          <input 
            type="text" 
            onKeyDown={this.formSubmission} 
            className="form-control"
            placeholder="Enter Task Here"/>
        </form>
      </div>
    );
  }
}

export default App;
