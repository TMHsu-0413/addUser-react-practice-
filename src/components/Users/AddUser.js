import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const [enteredUsername, setenteredUsername] = useState("");
  const [enteredage, setenteredage] = useState("");
  const [error,setError] = useState()

  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredage.trim().length === 0) {
        setError({
            title: 'Invalid input',
            message: 'Please enter a valid name and age'
        })
      return;
    }
    if (+enteredage < 1) {
        setError({
            title: 'Invalid age',
            message: 'Please enter a valid age'
        })
      return;
    }
    props.onAdduser(enteredUsername, enteredage);
    setenteredUsername("");
    setenteredage("");
  };

  const usernameChangeHandler = (event) => {
    setenteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setenteredage(event.target.value);
  };
  
  const closeErrorHandler = () => {
      setError()
  }
  return (
    <>
      {error && <ErrorModal title={error.title} message={error.message} onCloseError={closeErrorHandler} />}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={enteredUsername}
            onChange={usernameChangeHandler}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={enteredage}
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
