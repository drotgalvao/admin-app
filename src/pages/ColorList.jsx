import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Tag } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../components/CustomModal";
import { getColors, deleteAColor } from "../features/color/colorSlice";

const columns = [
  {
    title: "Numero Serial",
    dataIndex: "key",
  },
  {
    title: "Cor",
    dataIndex: "title",
    render: (title) => (
      <span
        style={{
          backgroundColor: title,
          padding: "4px 8px",
          borderRadius: "4px",
          border: "1px solid black",
        }}
      >
        {title}
      </span>
    ),
  },
  {
    title: "Ações",
    dataIndex: "action",
  },
];

const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColors());
  }, []);
  const colorState = useSelector((state) => state.color.colors);
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1,
      title: colorState[i].title,
      action: (
        <>
          <Link
            to={`/admin/cor/${colorState[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => {
              showModal(colorState[i]._id);
            }}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteColor = (e) => {
    dispatch(deleteAColor(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Lista de Cores</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => deleteColor(colorId)}
        title="Você tem certeza que deseja excluir esta cor?"
      />
    </div>
  );
};

export default ColorList;
