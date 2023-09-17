import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import {
  deleteAProductCategory,
  getCategories,
  resetState,
} from "../features/pcategory/pcategorySlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "Numero Serial",
    dataIndex: "key",
  },
  {
    title: "Nome",
    dataIndex: "name",
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: "Ações",
    dataIndex: "action",
  },
];

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setpCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);
  const pcategoryState = useSelector((state) => state.pcategory.pCategories);
  const data1 = [];
  for (let i = 0; i < pcategoryState.length; i++) {
    data1.push({
      key: i + 1,
      name: pcategoryState[i].title,
      action: (
        <>
          <Link
            className=" fs-3 text-danger"
            to={`/admin/categoria/${pcategoryState[i]._id}`}
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger"
            onClick={() => showModal(pcategoryState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteCategory = (e) => {
    dispatch(deleteAProductCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Lista de Categorias</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => deleteCategory(pCatId)}
        title="Você tem certeza de que deseja excluir esta categoria?"
      />
    </div>
  );
};

export default CategoryList;
