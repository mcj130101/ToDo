import { useEffect, useState } from "react";
import AddToDo from "./Todo/AddToDo/AddToDo.jsx";
import Todo from "./Todo/Todo.jsx";
import styles from "./TodoList.module.css";
import { useQuery, gql, useLazyQuery } from "@apollo/client";

const GET_TODOS = gql`
  query GetTasks {
    getTasks {
      _id
      content
    }
  }
`;

const TodoList = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [todoList, setToDoList] = useState([]);
  const [isDelting, setIsDeleting] = useState(false);
  return (
    <div className={styles.todoList__wrapper}>
      <div className={styles.heading}>
        <h1>Todo List</h1>
        <p>A simple React Todo List App</p>
      </div>
      {loading ? (
        <p>loading....</p>
      ) : (
        data.getTasks.map(({ _id, content }) => {
          return (
            <Todo
              _id={_id}
              key={_id}
              content={content}
              onDelete={() => deleteLoad()}
            />
          );
        })
      )}
      <AddToDo />
    </div>
  );
};

export default TodoList;
