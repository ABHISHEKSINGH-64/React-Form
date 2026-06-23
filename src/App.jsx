import { useState } from "react";
import UserForm from "./userform";
import UserTable from "./userTable";

function App() {
  const [users, setUsers] = useState([]);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <div>
      <h1>User Registration</h1>

      <UserForm addUser={addUser} />

      {users.length > 0 && <UserTable users={users} />}
    </div>
  );
}

export default App;
