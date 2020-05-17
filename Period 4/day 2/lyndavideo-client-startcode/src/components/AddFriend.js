import React, { useState } from "react";


const AddFriend = ({ initialFriend, allowEdit }) => {
  const EMPTY_FRIEND = { firstName: "", lastName: "", gender: "OTHER", age: "", email: "" }
  let newFriend = initialFriend ? initialFriend : { ...EMPTY_FRIEND }

  const [friend, setFriend] = useState({ ...newFriend })
  const [readOnly, setReadOnly] = useState(!allowEdit)

  const handleChange = (event) => {
    const id = event.target.id;
    friend[id] = event.target.value;
    setFriend({ ...friend })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    //Todo
    alert(JSON.stringify(friend))
    setFriend({ ...EMPTY_FRIEND })
  }


  return (
    <form onSubmit={handleSubmit}>
      <label>
        FirstName<br/>
        <input type="text" readOnly={readOnly} id="firstName" value={friend.firstName} onChange={handleChange} />
      </label>
      <br />
      <label>
       LastName <br/>
        <input readOnly={readOnly} type="text" id="lastName" value={friend.lastName} onChange={handleChange} />
      </label>
      <br />
        <label>
          Gender &nbsp;
          <select disabled={readOnly} id="gender" value={friend.gender} onChange={handleChange}>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </label>
      <br />
      <label>
        Age <br/>
          <input readOnly={readOnly} type="number" id="age" value={friend.age} onChange={handleChange} />
      </label>
      <br /><br/>
      {!readOnly && <input type="submit" value="Submit" />}
    </form>
  );
}

export default AddFriend;