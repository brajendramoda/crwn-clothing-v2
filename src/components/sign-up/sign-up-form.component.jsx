import { useState } from "react";
import { FormInput } from "../form-input/form-input.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./sign-up.styles.scss";

import { Button } from "../button/button.component";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export const SignUpForm = () => {
  const [formfields, setFormfields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formfields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormfields({ ...formfields, [name]: value });
  };

  const resetformfields = () => {
    setFormfields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetformfields();
    } catch (error) {
      if (error.code == "auth/email-already-in-use")
        alert("email already in use");
      console.log(error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Dont Have an Account ?</h2>
      <span>Sign up with your email and Password</span>
      <form onSubmit={handleSubmit}>
        <label>Display name</label>
        <FormInput
          label="Display name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="confirm password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button buttonType="google" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};
