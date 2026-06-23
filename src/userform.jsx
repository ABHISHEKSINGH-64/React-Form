import { useState } from "react";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  age: z.coerce.number().min(18, "Age must be 18+"),
  email: z.string().email("Valid email required"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

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
