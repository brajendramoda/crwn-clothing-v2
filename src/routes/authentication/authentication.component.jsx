import {
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.js";
import "./authentication.styles.scss";
import { SignUpForm } from "../../components/sign-up/sign-up-form.component.jsx";
import { SignInForm } from "../../components/sign-in/sign-in-form.component.jsx";
const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignUpForm></SignUpForm>
      <SignInForm></SignInForm>
    </div>
  );
};
export default Authentication;
