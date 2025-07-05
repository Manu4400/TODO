import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
            {!props.todo.todo_completed && (
                <Link to={"/edit/" + props.todo.id}>Edit</Link>
            )}
        </td>
    </tr>
);


export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
    }

    componentDidMount() {
        this._isMounted = true;
        axios.get('http://localhost:4000/todos')
            .then( res => {
                if (this._isMounted) {
                    this.setState({
                        todos: res.data
                    })
                }
            })
            .catch( err => console.log(err));
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/todos')
            .then( res => {
                if (this._isMounted) {
                    this.setState({
                        todos: res.data
                    })
                }
            })
            .catch( err => console.log(err));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onDelete = (id) => {
        axios.delete('http://localhost:4000/todos/delete/' + id)
            .then(res => {
                // Remove the deleted todo from state
                this.setState({
                    todos: this.state.todos.filter(todo => todo.id !== id)
                });
            })
            .catch(err => console.log(err));
    }

    todoList = () => this.state.todos
        .filter(todo =>
            todo &&
            todo.todo_description &&
            todo.todo_responsible &&
            todo.todo_priority &&
            !todo.todo_completed // Only show incomplete todos
        )
        .map((todo, index) =>
            <Todo todo={todo} key={index} onDelete={this.onDelete} />
        );
    

    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}