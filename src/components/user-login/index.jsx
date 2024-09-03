import { useFormContext } from "react-hook-form";
import "./user-login.css";

export function UserLogin() {
  const { register, formState } = useFormContext();

  return (
    <div>
      <div className="container--input">
        <div className="container--input-field">
          <input
            type="text"
            id="email"
            placeholder="Email"
            className="container--input-field-text"
            {...register("email", {
              required: {
                value: true,
                message: "É necessário informar um email.",
              },
            })}
          />
          {formState.errors.email && <p>{formState.errors.email.message}</p>}
        </div>
        <div className="container--input-field">
          <input
            type="password"
            id="password"
            placeholder="Senha"
            className="container--input-field-text"
            {...register("password", {
              required: {
                value: true,
                message: "É necessário informar uma senha.",
              },
            })}
          />
          {formState.errors.password && (
            <p>{formState.errors.password.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
