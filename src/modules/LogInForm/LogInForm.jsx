import React from "react";
import loginFormImg from "../../assets/login.png";
import { useForm } from "react-hook-form";
import "./styles.css";

const LogInForm = () => {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="log-in-form-div" onSubmit={handleSubmit(onSubmit)}>
      <div className="log-in-form-div-child col2">
        <img src={loginFormImg} alt="working scientist" className="login-form-img" />
      </div>
      <div className="log-in-form-div-child col1">
        <h2 className="log-in-form-h">Вхід</h2>
        <span className="info-span">Уведіть електронну скриньку та пароль</span>
        <form action="" className="log-in-form">
          <input type="text" placeholder="Електронна пошта" className="log-in-input" {...register("email", {required: true})} />
          <input type="text" placeholder="Пароль" className="log-in-input" {...register("password")} />
          <span className="error-input-span">
            {errors.email?.type === "required" && "Уведіть поштову скриньку"}
          </span>
          <button className="log-in-btn">Вхід</button>
        </form>
      </div>
    </div>
  )
}

export default LogInForm;
