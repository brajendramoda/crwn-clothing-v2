import { useState } from "react";
import { FormInput } from "../form-input/form-input.component";
import { SignInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";

import "./sign-in.styles.scss";

import { Button } from "../button/button.component";
const defaultFormFields = {
  email: "",
  password: "",
};
export const SignInForm = () => {
  const [formfields, setFormfields] = useState(defaultFormFields);
  const { email, password } = formfields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormfields({ ...formfields, [name]: value });
  };

  const resetformfields = () => {
    setFormfields(defaultFormFields);
  };

  const SignInWithGoogle = async () => {
    const { user } = await signInWithGoogleRedirect();
    console.log(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await SignInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      resetformfields();
    } catch (error) {
      if (error.code === "auth/wrong-password") alert("incorrect password");
      else if (error.code === "auth/user-not-found")
        alert("no user with this email");
      console.log(error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already Have an Account ?</h2>
      <span>Sign in with your email and Password</span>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={SignInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};
