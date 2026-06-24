import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "./userSchema";

function EditForm({ user, updateUser, goBack }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    reset(user);
  }, [user, reset]);

  return (
    <form onSubmit={handleSubmit(updateUser)}>
      <div>
        <input
          {...register("name")}
          placeholder="Enter Name"
        />
        <p>{errors?.name?.message}</p>
      </div>

      <div>
        <input
          type="number"
          {...register("age")}
          placeholder="Enter Age"
        />
        <p>{errors?.age?.message}</p>
      </div>

      <div>
        <input
          type="email"
          {...register("email")}
          placeholder="Enter Email"
        />
        <p>{errors?.email?.message}</p>
      </div>

      <div>
        <input
          type="password"
          {...register("password")}
          placeholder="Enter Password"
        />
        <p>{errors?.password?.message}</p>
      </div>

      <button type="submit">
        Save
      </button>

      <button
        type="button"
        onClick={goBack}
      >
        Back
      </button>
    </form>
  );
}

export default EditForm;