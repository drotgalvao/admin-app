import React from "react";
import CustomInput from "../components/CustomInput";

const AddBrand = () => {
  return (
    <div>
      <h3 className="mb-4 title">Adicionar Marca</h3>
      <div>
        <form action="">
            <CustomInput label="Nome da Marca" type="text" i_id="title" />
            <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Adicionar Marca
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
