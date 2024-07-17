import { useState } from "react";
import { PhieuGiamGiaEntities } from "../../types/PhieuGiamGiaEntity";
import { Layout } from "../../components/layout";
import Heading from "../../components/common/Heading";
import FilterVoucher from "./components/FilterVoucher";
import { useNavigate } from "react-router-dom";
import { Table } from "../../components/table";

const optionsPagination = [
  { value: 25, label: "25 bản ghi" },
  { value: 50, label: "50 bản ghi" },
  { value: 100, label: "100 bản ghi" },
];
function ListVoucher() {
  const [vouchers, setVouchers] = useState<PhieuGiamGiaEntities>([]);
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search);
  const [query, setQuery] = useState({
    _page: 1,
    _limit: 25,
    _sort: "createdAt",
    _order: "asc",
    search: "",
    _status: "",
  });

  // nếu muốn cho filter delay 500ms dùng useDebounce rồi bỏ nó vào dependence của useEffect
  // const debouncedValue = useDebounce<object>(query, 500);
  const headings = [
    "STT",
    "Mã Phiếu",
    "Tên Phiếu",
    "Loại",
    "Số Lượng",
    "Điều Kiện",
    "Ngày Bắt Đầu",
    "Ngày Kết Thúc",
    "Trạng thái",
    "Hành Động",
  ];

  const handleSearch = (e: any) => {
    setQuery({ ...query, search: e });
    if (e !== "") {
      urlParams.set("name", e);
      navigate(`?${urlParams}`);
    } else {
      urlParams.delete("name");
      navigate(`?${urlParams}`);
    }
  };

  const handleStatusChange = (selectedOpiton: any) => {
    setQuery({ ...query, _status: selectedOpiton.value });
    if (selectedOpiton.value != "") {
      urlParams.set("status", selectedOpiton.value);
      navigate(`?${urlParams}`);
    } else {
      urlParams.delete("status");
      navigate(`?${urlParams}`);
    }
  };

  return (
    <Layout>
      <Heading>Danh sách phiếu giảm giá</Heading>
      <div className="rounder-xl bg-white">
        <FilterVoucher
          handleSearch={handleSearch}
          handleStatusChange={handleStatusChange}
        ></FilterVoucher>
        <div className="bg-white">
            <Table headings={headings}>

            </Table>
        </div>
      </div>

    </Layout>
  );
}

export default ListVoucher;
