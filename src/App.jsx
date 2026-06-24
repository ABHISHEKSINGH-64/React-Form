import { useState } from "react";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import EditForm from "./component";

function App() {
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const updateUser = (updatedUser) => {
    const updatedUsers = [...users];

    updatedUsers[editIndex] = updatedUser;

    setUsers(updatedUsers);
    setEditIndex(null);
  };

  return (
    <div>
      {editIndex === null ? (
        <>
          <UserForm addUser={addUser} />

          {users.length > 0 && (
            <UserTable
              users={users}
              editUser={setEditIndex}
            />
          )}
        </>
      ) : (
        <EditForm
          user={users[editIndex]}
          updateUser={updateUser}
          goBack={() => setEditIndex(null)}
        />
      )}
    </div>
  );
}

export default App;