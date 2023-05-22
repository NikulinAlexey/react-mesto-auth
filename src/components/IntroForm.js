
function IntroForm({children, title, textOfButton}) {
  return (
    <div className="intro-form">
      <h2 className="intro-form__title">{title}</h2>
      <form className="intro-form__form">
        <input
          required
          type="email"
          name="email"
          minLength={5}
          // value={values.name || ''}
          id="email-input"
          placeholder="Email"
          // onChange={handleChange}
          className="intro-form__input"
        />
        <input
          required
          type="password"
          name="password"
          minLength={5}
          // value={values.name || ''}
          id="password-input"
          placeholder="Пароль"
          // onChange={handleChange}
          className="intro-form__input"
        />
        <button className="intro-form__submit" type="submit">{textOfButton}</button>
      </form>
      {children}
    </div>
  );
}

export default IntroForm; 