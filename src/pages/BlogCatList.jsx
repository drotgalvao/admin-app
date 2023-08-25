import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getBcategories } from "../features/bcategory/bcategorySlice";

const columns = [
  {
    title: "Numero Serial",
    dataIndex: "key",
  },
  {
    title: "Titulo",
    dataIndex: "title",
  },
  {
    title: "Produto",
    dataIndex: "product",
  },
  {
    title: "Situação",
    dataIndex: "status",
  },
  {
    title: "Ações",
    dataIndex: "action",
  },
];

const BlogCatList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBcategories());
  }, []);
  const bcategoryState = useSelector((state) => state.bcategory.bcategories);
  const data1 = [];
  for (let i = 0; i < bcategoryState.length; i++) {
    data1.push({
      key: i + 1,
      title: bcategoryState[i].title,
      product: bcategoryState[i].product,
      status: bcategoryState[i].status,
      action: (
        <div className="d-flex gap-3">
          <Link to={`/admin/blog/edit/${bcategoryState[i]._id}`}>
            <BiEdit className="fs-4" />
          </Link>
          <AiFillDelete className="fs-4" />
        </div>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Lista de Categorias de Blogs</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default BlogCatList;
