import React, { Component } from 'react'
import { reduxForm, Field, getFormValues } from 'redux-form'
import {
  getTasksAction,
  selectTaskAction,
  addTaskAction,
  editTaskAction,
  removeTaskAction
} from '../../redux/actions'
import { connect } from 'react-redux'
import './styles.css'

export class Home extends Component {

  state = {
    isAdding: false,
    isEditing: false,
  }

  componentDidMount() {
    this.props.getTasks()
  }

  renderTasks() {
    const { isFetching, tasks, selectedTask } = this.props

    if (isFetching) {
      return (
        <div className="home-task-list">
          <div>Loading</div>
        </div>
      )
    }
    return (
      <table className="home-task-list">
        <tr className="home-th">
          <th className="home-th-task">ID</th>
          <th className="home-th-task home-th-description">Description</th>
          <th className="home-th-task">Due Date</th>
        </tr>
        {this.props.tasks.map(task => (
          <tr
            onClick={this.setOnClickTask(task._id)}
            key={task._id}
            className="home-task-row"
            style={{ backgroundColor: selectedTask === task._id ? '#F9E79F' : '#FFF' }}
          >
            <td className="home-task-cell">{task._id}</td>
            <td className="home-task-cell home-description-cell">{task.description}</td>
            <td className="home-task-cell">{task.dueDate}</td>
          </tr>
        ))
        }
      </table>
    )
  }

  setOnClickTask = (id) => () => this.onClickTask(id)

  onClickTask = (id) => this.props.selectTask(id)

  renderField({
    input,
    type,
    placeholder,
    meta: { touched, error }
  }) {
    return (
      <div className="home-input-container">
        <input
          {...input}
          className="home-input"
          placeholder={placeholder}
          type={type}
        />
        {touched && error &&
          (<span className="home-error">
            {error}
          </span>)
        }
      </div>
    )
  }

  showAddTask = () => {
    this.props.initialize({
      description: '',
      dueDate: '',
    })
    this.setState({ isAdding: true })
  }

  showEditTask = () => {
    const { tasks, initialize, selectedTask } = this.props
    const task = tasks.find(t => t._id === selectedTask)
    initialize({
      description: task.description,
      dueDate: task.dueDate,
    })
    this.setState({ isEditing: true })
  }

  closeForm = () => this.setState({ isAdding: false, isEditing: false })

  submitForm = () => {
    const { formValues, addTask, tasks, selectedTask } = this.props
    const { isAdding, isEditing } = this.state
    if (isAdding) {
      this.props.addTask(formValues)
        .then(this.closeForm)
    } else if (isEditing) {
      const task = tasks.find(t => t._id === selectedTask)
      this.props.editTask({ _id: task._id, ...formValues })
        .then(this.closeForm)
    }
  }

  removeTask = () => {
    const { removeTask, tasks, selectedTask } = this.props
    const task = tasks.find(t => t._id === selectedTask)
    removeTask(task._id)
  }

  render() {
    const { username, selectedTask, handleSubmit } = this.props
    const { isAdding, isEditing } = this.state
    return (
      <div className="home-container">
        <div className="home-header">
          <div className="home-user">USER: {username}</div>
          <button className="home-button home-logout">Logout</button>
        </div>
        <div className="home-content">
          {this.renderTasks()}
          <div>
            <button onClick={this.showAddTask} className="home-button home-task-button">
              Add
            </button>
            <button
              disabled={!selectedTask}
              onClick={this.showEditTask}
              className="home-button home-task-button"
            >
              Edit
            </button>
            <button onClick={this.removeTask} className="home-button home-task-button">
              Delete
            </button>
          </div>
          {(isAdding || isEditing) && (
            <div className="home-task-form">
              <div className="home-task-form-inputs">
                <Field
                  name="description"
                  component={this.renderField}
                  placeholder="Description"
                  type="text"
                />
                <Field
                  name="dueDate"
                  component={this.renderField}
                  placeholder="Due date"
                  type="text"
                />
              </div>
              <div>
                <button onClick={this.closeForm} className="home-button home-task-button">
                  Cancel
                </button>
                <button onClick={handleSubmit(this.submitForm)} className="home-button home-task-button">
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  username: state.users.username,
  isFetching: state.users.isFetching,
  tasks: state.users.tasks,
  selectedTask: state.users.selectedTask,
  formValues: getFormValues('task')(state)
})

const mapDispatchToProps = (dispatch) => ({
  getTasks: () => dispatch(getTasksAction()),
  selectTask: (id) => dispatch(selectTaskAction(id)),
  addTask: (task) => dispatch(addTaskAction(task)),
  editTask: (task) => dispatch(editTaskAction(task)),
  removeTask: (id) => dispatch(removeTaskAction(id))
})

const HomeWithProps = connect(mapStateToProps, mapDispatchToProps)(Home)

const validate = (values) => {
  const errors = {}
  if (!values.description) {
    errors.description = 'Required'
  }
  if (!values.dueDate) {
    errors.dueDate = 'Required'
  }
  return errors
}

export default reduxForm({
  form: 'task',
  validate,
})(HomeWithProps)