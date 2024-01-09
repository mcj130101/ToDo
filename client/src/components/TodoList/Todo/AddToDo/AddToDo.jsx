import { useState } from "react";
import styles from "./AddToDo.module.css";
import { gql, useMutation } from "@apollo/client";

const ADD_TASK = gql`
  mutation AddTodo($content: String!) {
    createTask(content: $content) {
      _id
      content
    }
  }
`;

const AddToDo = () => {
  const [task, setTask] = useState("");
  const [addTODO, { data, loading, error }] = useMutation(ADD_TASK);

  const submitHandler = (e) => {
    e.preventDefault;
    addTODO({ variables: { content: task} });
  }

  return (
    <form className={styles.NewTodoForm} onSubmit={submitHandler}>
      <label htmlFor="task">New todo</label>
      <input id="task" type="text" name="task" placeholder="New Todo" onChange={(e) => setTask(e.target.value)} />
      <button>Add Todo</button>
    </form>
  );
};

export default AddToDo;
