import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getEnquiries = async () => {
  const response = await axios.get(`${base_url}enquiry/get-all-enq`);

  return response.data;
};

const deleteEnquiry = async (id) => {
  const response = await axios.delete(`${base_url}enquiry/delete-enq/${id}`, config);
  return response.data;
};

const getEnquiry = async (id) => {
  const response = await axios.get(`${base_url}enquiry/get-enq/${id}`);
  return response.data;
};

const udpateEnquiry = async (enq) => {
  const response = await axios.put(
    `${base_url}enquiry/update-enq/${enq.id}`,
    { status: enq.enqData },
    config
  );
  return response.data;
};

const enquiryService = {
  getEnquiries,
  deleteEnquiry,
  getEnquiry,
  udpateEnquiry,
};

export default enquiryService;
