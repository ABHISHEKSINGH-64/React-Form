import { useState } from "react";
import { userSchema } from "./userSchema";

function UserForm({ addUser }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = userSchema.safeParse(formData);

    if (!result.success) {
      const formErrors = {};

      result.error.issues.forEach((error) => {
        formErrors[error.path[0]] = error.message;
      });

      setErrors(formErrors);
      return;
    }

    addUser(result.data);

    setFormData({
      name: "",
      age: "",
      email: "",
      password: "",
    });

    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />
        <p>{errors.name}</p>
      </div>

      <div>
        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          value={formData.age}
          onChange={handleChange}
        />
        <p>{errors.age}</p>
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />
        <p>{errors.email}</p>
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />
        <p>{errors.password}</p>
      </div>

      <button type="submit">
        Sign Up
      </button>
    </form>
  );
}

export default UserForm;
