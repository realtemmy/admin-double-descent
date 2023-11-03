import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { setAdminUser } from "../../redux/slices/user/userSlice";

import "../login/login.scss";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultFields = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // const [currentUser, setCurrentuser] = useState([]);
  const [formFields, setFormFields] = useState(defaultFields);

  const { name, email, password, confirmPassword } = formFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetDefault = () => {
    setFormFields(defaultFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await (
        await fetch(`${process.env.REACT_APP_SERVER_HOST}/user/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
            confirmPassword,
            role: "admin",
          }),
        })
      ).json();

      console.log(res);

      if (res.status === "success") {
        const { token, data } = res;
        const { user } = data;
        // Store token in local storage
        localStorage.setItem("admin-token", token);
        // dispatch user
        console.log(user);
        dispatch(setAdminUser(user));
        // reroute to homepage..useNavigation?
        navigate("/");
        // Notification
        toast.success("Account creation  successful!");
      } else {
        // print data.message
        console.log(res);
        toast.error(
          "There was an error creating your account, please try again later"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "There was an error creating your account, please try again later"
      );
    }

    resetDefault();
  };

  return (
    <div className="register">
      <div className="container">
        <h4 className="text-center">Double descent admin</h4>
        {/* <div className="logo text-center text-sm-start">
          <Logo />
        </div> */}
        <form className="form" onSubmit={handleSubmit}>
          <h2>Create admin account</h2>
          <div className="form-container">
            <div>
              <label className="label" htmlFor="name">
                Name
              </label>
              <br />
              <input
                type="text"
                className="name"
                name="name"
                id="name"
                required
                placeholder="John Doe"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email </label>
              <br />
              <input
                type="email"
                className="email"
                name="email"
                required
                id="email"
                placeholder="johndoe@gmail.com"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password </label>
              <br />
              <input
                type="password"
                className="password"
                name="password"
                required
                id="password"
                placeholder="johndoe123"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className={password !== confirmPassword ? "error" : ""}>
              <label htmlFor="confirmPassword">Confirm pasword </label>
              <br />
              <input
                type="password"
                name="confirmPassword"
                required
                id="confirmPassword"
                placeholder="johndoe123"
                // className="confirmPassword"
                className={
                  password !== confirmPassword
                    ? "confirmPassword err"
                    : "confirmPassword"
                }
                value={confirmPassword}
                onChange={handleChange}
              />
              <p className={password !== confirmPassword ? "err" : "none"}>
                Passwords do not match!
              </p>
            </div>
            <input type="submit" value="Register" />
          </div>
          <div className="line"></div>
          <p className="bottom-text">
            Already have an account?{" "}
            <Link to="/login" className="link">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
