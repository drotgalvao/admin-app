import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getBlogs } from "../features/blogs/blogSlice";

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
    title: "Categoria",
    dataIndex: "category",
  },
  {
    title: "Descrição",
    dataIndex: "description",
  },
  {
    title: "Imagem",
    dataIndex: "image",
  },
  {
    title: "Ações",
    dataIndex: "action",
  },
];

const BlogList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, []);
  const getBlogState = useSelector((state) => state.blog.blogs);
  const data1 = [];
  for (let i = 0; i < getBlogState.length; i++) {
    data1.push({
      key: i + 1,
      title: getBlogState[i].title,
      category: getBlogState[i].category,
      description: getBlogState[i].description,
      image: getBlogState[i].image,
      action: (
        <div className="d-flex gap-3">
          <Link to={`/admin/blog/edit/${getBlogState[i]._id}`}>
            <BiEdit className="fs-4" />
          </Link>
          <AiFillDelete className="fs-4" />
        </div>
      ),


    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Lista de Blogs</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default BlogList;
