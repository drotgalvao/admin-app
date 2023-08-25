import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getPcategories } from "../features/pcategory/pcategorySlice";

const columns = [
  {
    title: "Numero Serial",
    dataIndex: "key",
  },
  {
    title: "Titulo",
    dataIndex: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),

  },
  {
    title: "Ações",
    dataIndex: "action",
  },
];


const CategoryList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPcategories());
  }, []);
  const pcategoryState = useSelector((state) => state.pcategory.pcategories);
  const data1 = [];
  for (let i = 0; i < pcategoryState.length; i++) {
    data1.push({
      key: i + 1,
      title: pcategoryState[i].title,
      action: (
        <>
          <Link className=" fs-3 text-danger" to="/">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }

  return (
    <div>
    <h3 className="mb-4 title">Lista de Categorias</h3>
    <div>
      <Table columns={columns} dataSource={data1} />
    </div>
  </div>
  )
}

export default CategoryList