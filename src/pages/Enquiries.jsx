import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import {
  deleteAEnquiry,
  getEnquiries,
  resetState,
  updateAEnquiry,
} from "../features/enquiry/enquirySlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "Numero Serial",
    dataIndex: "key",
  },
  {
    title: "Nome",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Telefone",
    dataIndex: "mobile",
  },
  {
    title: "Situação",
    dataIndex: "status",
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

const Enquiries = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [enqId, setenqId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setenqId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, []);
  const enquiryState = useSelector((state) => state.enquiry.enquiries);
  const data1 = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      status: (
        <>
          <select
            name=""
            defaultValue={
              enquiryState[i].status ? enquiryState[i].status : "Submetido"
            }
            className="form-control form-select"
            id=""
            onChange={(e) =>
              setEnquiryStatus(e.target.value, enquiryState[i]._id)
            }
          >
            <option value="Submetido">Submetido</option>
            <option value="Contactado">Contactado</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Resolvido">Resolvido</option>
          </select>
        </>
      ),
      date: enquiryState[i].createdAt,
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/perguntas/${enquiryState[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => {
              showModal(enquiryState[i]._id);
            }}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const setEnquiryStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data));
  };

  const deleteEnq = (e) => {
    dispatch(deleteAEnquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Perguntas</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => deleteEnq(enqId)}
        title="Você tem certeza que deseja excluir esta pergunta?"
      />
    </div>
  );
};

export default Enquiries;
