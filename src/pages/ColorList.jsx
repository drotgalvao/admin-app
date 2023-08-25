import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getColors } from "../features/color/colorSlice";

const columns = [
  {
    title: "Numero Serial",
    dataIndex: "key",
  },
  {
    title: "Cor",
    dataIndex: "title",
  },
  {
    title: "Ações",
    dataIndex: "action",
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}

const ColorList = () => {
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
        <div className="d-flex gap-3">
          <Link to={`/admin/product/edit/${colorState[i]._id}`}>
            <BiEdit className="fs-4" />
          </Link>
          <AiFillDelete
            className="fs-4"
            onClick={() => dispatch(deleteColor(colorState[i]._id))}
          />
        </div>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Lista de Cores</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ColorList;
