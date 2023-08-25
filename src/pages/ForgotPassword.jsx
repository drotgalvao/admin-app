import React from "react";
import CustomInput from "../components/CustomInput";

const ForgotPassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight:"100vh"}}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Recuperar Senha</h3>
        <p className="text-center">Por favor, entre seu e-mail para redefinir sua senha.</p>
        <form action="">
          <CustomInput
            label="Endereço de Email"
            type="text"
            i_id="email"
          />
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Enviar Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
