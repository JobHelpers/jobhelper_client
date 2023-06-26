import React from "react"; 
import signUpFormImg from "../../assets/signup.png";
import { useForm } from "react-hook-form";
import { useState } from "react";
import "./styles.css"

const SignUpForm = () => {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [isRegistered, setIsRegistered] = useState(false);

  const onSubmit = () => setIsRegistered(true);

  return (
    <div className="sign-up-form-div" onSubmit={handleSubmit(onSubmit)}>
      <div className="sign-up-form-div-child col1">
        <h2 className="sign-up-form-h">Реєстрація</h2>
        <span className="info-span">Заповніть форму</span>
        <form className="sign-up-form">
          <input type="text" placeholder="Електронна пошта" className="sign-up-input" {...register("email", {required: true})} />
          <input type="text" placeholder="Пароль" className="sign-up-input" {...register("password")} />
          <input type="text" placeholder="Підтвердити пароль" className="sign-up-input" {...register("confirmpswd")} />
          <span className="error-input-span">
            {errors.email?.type === "required" && "Уведіть поштову скриньку"}
          </span>
          <button className="sign-up-btn">Зареєструватися</button>
          {isRegistered &&
          <div className="success-animation-div">
            <svg className="check-mark-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="check-mark-circle" cx="26" cy="26" r="25" fill="none" />
              <path className="check-mark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>}
        </form>
      </div>
      <div className="register-child col2">
        <img src={signUpFormImg} alt="studying boy" className="sign-up-form-img"/>
      </div>
    </div>
  )
}

export default SignUpForm;
