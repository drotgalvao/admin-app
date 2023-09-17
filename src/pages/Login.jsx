import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

let schema = Yup.object().shape({
  email: Yup.string()
    .email("Email deve ser valido")
    .required("Email é obrigatório"),
  password: Yup.string().required("Senha é obrigatória"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const authState = useSelector((state) => state);

  const { user, isError, isLoading, isSuccess, message } = authState.auth;

  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isError, isLoading, isSuccess]);

  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Entre na sua conta para continuar.</p>
        <div className="error text-center">
          {message.message == "Rejeitado" ? "Você não é um Administrador" : ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            label="Endereço de Email"
            type="text"
            name="email"
            i_id="email"
            val={formik.values.email}
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
          />
          <div className="error mt-2">
            {formik.touched.email && formik.errors.email}
          </div>

          {/* {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null} */}

          <CustomInput
            label="Senha"
            type="password"
            name="password"
            i_id="password"
            val={formik.values.password}
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
          />
          <div className="error mt-2">
            {formik.touched.password && formik.errors.password}
          </div>
          <div className="mb-3 text-end">
            <Link to="forgot-password" className="text-decoration-none">
              Esqueci a Senha
            </Link>
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
