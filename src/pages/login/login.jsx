import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";

import { setAdminUser } from "../../redux/slices/user/userSlice";

import "./login.scss";

const Login = () => {
  // role = admin
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultFields = {
    email: "",
    password: "",
  };

  const [userInfo, setUserInfo] = useState(defaultFields);

  const { email, password } = userInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await (
        await fetch(`http://localhost:5000/api/v1/user/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        })
      ).json();

      if (res.status === "success") {
        const { token, data } = res;
        const { user } = data;
        // Store token in local storage
        localStorage.setItem("admin-token", token);
        // Login notification
        toast.success("Login successful!");
        // dispatch user
        dispatch(setAdminUser(user));
        // reroute to homepage..useNavigation?
        navigate("/");
      } else {
        // print data.message
        console.log(res);
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="register">
        <div className="container">
          <h4 className="text-center">Double descent Admin Login</h4>
          {/* <div className="logo text-center text-sm-start">
            <Logo />
          </div> */}
          <form className="form" onSubmit={handleSubmit}>
            <h2>Welcome back</h2>
            <div className="form-container">
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
            </div>
            <div className="text-end mr-20 mt-4">
              <Button type="submit">Login</Button>
            </div>

            <div className="line" />

            <p className="bottom-text">
              Don't have an account?
              <Link to="/register" className="link">
                Sign up
              </Link>
              <p className="fw-lighter text-xs mt-3">
                If you've forgotten your password, call Temi
              </p>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
