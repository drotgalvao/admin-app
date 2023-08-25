import React from "react";
import CustomInput from "../components/CustomInput";

const AddColor = () => {
  return (
    <div>
      <h3 className="mb-4 title">Adicionar Cor</h3>
      <div>
        <form action="">
            <CustomInput label="Cor" type="color" i_id="title" />
            <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Adicionar Cor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
