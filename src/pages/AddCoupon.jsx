import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createCoupon,
  getACoupon,
  resetState,
  updateACoupon,
} from "../features/coupon/couponSlice";

let schema = yup.object().shape({
    name: yup.string().required("Nome do Cupom é obrigatório"),
    expiry: yup.date().required("Expiração do Cupom é obrigatório"),
    discount: yup.number().required("Desconto do Cupom é obrigatório"),
  });

  const AddCoupon = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const getCouponId = location.pathname.split("/")[3];
    const newCoupon = useSelector((state) => state.coupon);
  
    const {
      isSuccess,
      isError,
      isLoading,
      createdCoupon,
      couponName,
      couponDiscount,
      couponExpiry,
      updatedCoupon,
    } = newCoupon;
    const changeDateFormat = (date) => {
      if (!date || date === "-Invalid Date-") {
        return ""; // Retornar uma string vazia para evitar o erro
      }
      
      const newDate = new Date(date);
      const day = String(newDate.getDate()).padStart(2, '0'); // Dia com dois dígitos
      const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Mês com dois dígitos (lembrando que janeiro é 0)
      const year = newDate.getFullYear();
    
      return `${day}/${month}/${year}`;
    };

    useEffect(() => {
      if (getCouponId !== undefined) {
        dispatch(getACoupon(getCouponId));
      } else {
        dispatch(resetState());
      }
    }, [getCouponId]);
  
    useEffect(() => {
      if (isSuccess && createdCoupon) {
        toast.success("Cupom adicionado com sucesso!");
      }
      if (isSuccess && updatedCoupon) {
        toast.success("Cupom atualizado com sucesso!");
        navigate("/admin/coupon-list");
      }
      if (isError && couponName && couponDiscount && couponExpiry) {
        toast.error("Algo deu errado!");
      }
    }, [isSuccess, isError, isLoading]);
    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        name: couponName || "",
        expiry: changeDateFormat(couponExpiry) || "",
        discount: couponDiscount || "",
      },
      validationSchema: schema,
      onSubmit: (values) => {
        if (getCouponId !== undefined) {
          const data = { id: getCouponId, couponData: values };
          dispatch(updateACoupon(data));
          dispatch(resetState());
        } else {
          dispatch(createCoupon(values));
          formik.resetForm();
          setTimeout(() => {
            dispatch(resetState);
          }, 300);
        }
      },
    });
  
    return (
      <div>
        <h3 className="mb-4 title">
          {getCouponId !== undefined ? "Editar" : "Adicionar"} Cupom
        </h3>
        <div>
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              name="name"
              onChng={formik.handleChange("name")}
              onBlr={formik.handleBlur("name")}
              val={formik.values.name}
              label="Nome do Cupom"
              id="name"
            />
            <div className="error">
              {formik.touched.name && formik.errors.name}
            </div>
            <CustomInput
              type="date"
              name="expiry"
              onChng={formik.handleChange("expiry")}
              onBlr={formik.handleBlur("expiry")}
              val={formik.values.expiry || ""}
              label="Data de Expiração do Cupom"
              id="date"
            />
            <div className="error">
              {formik.touched.expiry && formik.errors.expiry}
            </div>
            <CustomInput
              type="number"
              name="discount"
              onChng={formik.handleChange("discount")}
              onBlr={formik.handleBlur("discount")}
              val={formik.values.discount}
              label="Desconto do Cupom"
              id="discount"
            />
            <div className="error">
              {formik.touched.discount && formik.errors.discount}
            </div>
            <button
              className="btn btn-success border-0 rounded-3 my-5"
              type="submit"
            >
              {getCouponId !== undefined ? "Editar" : "Adicionar"} Cupom
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default AddCoupon;