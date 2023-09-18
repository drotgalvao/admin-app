import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import "react-widgets/styles.css";
import Dropzone from "react-dropzone";
import { uploadImg, deleteImg } from "../features/upload/uploadSlice";
import { useNavigate } from "react-router-dom";
import { createProducts, resetState } from "../features/product/productSlice";
import { toast } from "react-toastify";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

let schema = Yup.object().shape({
  title: Yup.string().required("Titulo é obrigatório"),
  description: Yup.string().required("Descrição é obrigatória"),
  price: Yup.number().required("Preço é obrigatório"),
  brand: Yup.string().required("Marca é obrigatória"),
  category: Yup.string().required("Categoria é obrigatória"),
  tags: Yup.string().required("Tags é obrigatório"),
  color: Yup.array()
    .min(1, "Selecione pelo menos uma cor")
    .required("Cor é obrigatória"),
  quantity: Yup.number().required("Quantidade é obrigatória"),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const pcategoryState = useSelector((state) => state.pcategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Produto adicionado com sucesso!");
    }
    if (isError) {
      toast.error("Algo deu errado!");
    }
  }, [isSuccess, isError, isLoading]);
  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i._id,
    });
  });
  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.images = img;
  }, [color, img]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      color: "",
      quantity: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
      formik.resetForm();
      setColor(null);
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });
  const handleColors = (e) => {
    setColor(e);
  };

  return (
    <div>
      <h3 className="mb-4 title">Adicionar Produto</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Titulo do Produto"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="">
            <CKEditor
              editor={ClassicEditor}
              data={formik.values.description}
              onReady={(editor) => {
                // Opcional: Configurações adicionais do editor, se necessário
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                formik.setFieldValue("description", data);
              }}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            label="Preço do Produto"
            type="number"
            name="price"
            onChng={formik.handleChange("price")}
            onBlr={formik.handleBlur("price")}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Selecione a Marca</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Selecione a Categoria</option>
            {pcategoryState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <select
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Selecione a Tag
            </option>
            <option value="featured">Em destaque</option>
            <option value="popular">Popular</option>
            <option value="special">Especial</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>

          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Selecione as Cores"
            defaultValue={color}
            onChange={(i) => handleColors(i)}
            options={coloropt}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>
          <CustomInput
            label="Quantidade do Produto"
            type="number"
            name="quantity"
            onChng={formik.handleChange("quantity")}
            onBlr={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Arraste e solte alguns arquivos aqui, ou clique para
                      selecionar arquivos.
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState.map((i, j) => {
              return (
                <div className="position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(deleteImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Adicionar Produto
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
