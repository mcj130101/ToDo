import { useState } from "react";
import styles from "./Todo.module.css";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { useMutation, gql } from "@apollo/client";

const EDIT_TASK = gql`
  mutation EditTask($editTaskId: ID!, $newContent: String!) {
    editTask(id: $editTaskId, newContent: $newContent)
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($deleteTaskId: ID!) {
    deleteTask(id: $deleteTaskId) {
      _id
      content
    }
  }
`;

const Todo = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const [content, setContent] = useState(props.content || "");
  const [editTODO, { data: editData, loading: editLoading, error: ediError }] =
    useMutation(EDIT_TASK);
  const [
    deleteTODO,
    { data: deleteData, loading: deleteLoading, error: deleteError },
  ] = useMutation(DELETE_TASK);

  const handleChange = (evt) => {
    setContent((p) => evt.target.value);
  };

  

  const handleUpdate = (e) => {
    e.preventDefault();
    editTODO({ variables: { editTaskId: props._id, newContent: content } });
    setIsEditing((prevState) => !prevState);
  };

  const taskDeleteHandler = (e) => {
    deleteTODO({ variables: { deleteTaskId: props._id } });
    props.onDelete();
  };

  let result;
  if (isEditing) {
    result = (
      <div className={styles.Todo}>
        <form className={styles.Todo_edit_form} onSubmit={handleUpdate}>
          <input onChange={handleChange} type="text" value={content} />
          <button>Save</button>
        </form>
      </div>
    );
  } else {
    result = (
      <div className={styles.Todo}>
        <li className={styles.Todo_task} value={content}>
          {content}
        </li>
        <div className={styles.Todo_buttons}>
          <button>
            <MdModeEdit
              onClick={() => setIsEditing((prevState) => !prevState)}
            />
          </button>
          <button onClick={taskDeleteHandler}>
            <MdDelete />
          </button>
        </div>
      </div>
    );
  }

  return result;
};

export default Todo;
