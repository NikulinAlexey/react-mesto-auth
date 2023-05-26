import { useState } from 'react';

function AuthForm({
  title,
  children,
  handleSubmit,
  textOfButton
}) {
  
  const [formValue, setFormValue] = useState({
    password: '',
    email: '',
  });

  function onSubmit(e) {
    const { email, password } = formValue;
    handleSubmit(e, password, email)
  }
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setFormValue({
      ...formValue,
      [name]: value
    })
  };

  return (
    <div className="intro-form" >

      <h2 className="intro-form__title"> {title} </h2>

      <form className="intro-form__form" onSubmit={onSubmit}>
        <input
          required
          type="email"
          name="email"
          minLength={5}
          id="email-input"
          placeholder="Email"
          value={formValue.email}
          onChange={handleChange}
          className="intro-form__input"
        />
        <input
          required
          minLength={5}
          type="password"
          name="password"
          id="password-input"
          placeholder="Пароль"
          onChange={handleChange}
          value={formValue.password}
          className="intro-form__input"
        />
        <button className="intro-form__submit" type="submit"> {textOfButton} </button>
      </form>
      {children}

    </div>
  );
};

export default AuthForm;
