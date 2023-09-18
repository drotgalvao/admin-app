import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrderByUser, getOrders } from "../features/auth/authSlice";
import { getColors } from "../features/color/colorSlice";
const columns = [
  {
    title: "Numero Serial",
    dataIndex: "key",
  },
  {
    title: "Nome do Produto",
    dataIndex: "name",
  },
  {
    title: "Marca",
    dataIndex: "brand",
  },
  {
    title: "Quantidade",
    dataIndex: "count",
  },
  {
    title: "Cor",
    dataIndex: "color",
    render: (color) => (
      <span
        style={{
          backgroundColor: color,
          padding: "4px 8px",
          borderRadius: "4px",
          border: "1px solid black",
        }}
      >
        {color}
      </span>
    )
  },
  {
    title: "Preço",
    dataIndex: "amount",
  },
  {
    title: "Data",
    dataIndex: "date",
  },

  {
    title: "Ações",
    dataIndex: "action",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByUser(userId));
    dispatch(getColors())
  }, []);
  
  const orderState = useSelector((state) => {
    if (state.auth.orderbyuser && state.auth.orderbyuser.length > 0) {
      return state.auth.orderbyuser[0].products;
    } else {
      return [];
    }
  });

  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i].product.title,
      brand: orderState[i].product.brand,
      count: orderState[i].count,
      amount: orderState[i].product.price,
      color: orderState[i].color.title,
      date: orderState[i].product.createdAt,
      action: (
        <>
          <Link to="/" className=" fs-3 text-danger">
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
      <h3 className="mb-4 title">Ordens</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;