import React, { useState } from "react";
import { gql } from "apollo-boost";
import {  useMutation } from "@apollo/react-hooks";

const ADD_TEAM = gql`
  mutation createUser($input: UserInput!) {
    createUser(input: $input) {
      name
      username
      password
    }
  }
`;

const AddFriend = ({ initialTeam, allowEdit }) => {
  const EMPTY_TEAM = { name: "", username: "", password: "" }
  let newTeam = initialTeam ? initialTeam : { ...EMPTY_TEAM }
  const [team, setTeam] = useState({ ...newTeam })
  const [readOnly, setReadOnly] = useState(!allowEdit)
  const [createUser, { }] = useMutation(ADD_TEAM, {});


  const handleChange = (event) => {
    const id = event.target.id;
    team[id] = event.target.value;
    setTeam({ ...team })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    //Todo
    //alert(JSON.stringify(team))
    createUser({
      variables: {
        input: {
          name: team.name,
          username: team.username,
          password: team.password,
        },
      },
    });
    setTeam({ ...EMPTY_TEAM })
  }


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name<br/>
        <input type="text" readOnly={readOnly} id="name" value={team.name} onChange={handleChange} />
      </label>
      <br />
      <label>
       Username <br/>
        <input readOnly={readOnly} type="text" id="username" value={team.username} onChange={handleChange} />
      </label>
      <br />
      <label>
        Password <br/>
          <input readOnly={readOnly} type="password" id="password" value={team.password} onChange={handleChange} />
      </label>
      <br /><br/>
      {!readOnly && <input type="submit" value="Submit" />}
    </form>
  );
}

export default AddFriend;