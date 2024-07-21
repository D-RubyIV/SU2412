import { useEffect, useState } from "react";
import { PhieuGiamGias } from "../../types/PhieuGiamGiaEntity";
import { Layout } from "../../components/layout";
import Heading from "../../components/common/Heading";
import FilterVoucher from "./components/FilterVoucher";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Table } from "../../components/table";
import { getAllVoucher } from "../../services/voucher.service";
import { TramSharp } from "@mui/icons-material";

const optionsPagination = [
  { value: 25, label: "25 bản ghi" },
  { value: 50, label: "50 bản ghi" },
  { value: 100, label: "100 bản ghi" },
];

function ListVoucher() {
  const [vouchers, setVouchers] = useState<PhieuGiamGias>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocs, setTotalDocs] = useState(1);
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

  const handleGetVouchers = async () => {
    try {
      setLoading(true);
      const data = await getAllVoucher(query);
      setLoading(false);
      setTotalPages(data.totalPages || 1);
      setTotalDocs(data.totalDocs || 1);
      setVouchers(data.docs || data); // Adjusted to handle both cases
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Danh sách sản phẩm";
    urlParams.set("page", query._page as any);
    urlParams.set("limit", query._limit as any);
    navigate(`?${urlParams}`);
    handleGetVouchers();
  }, [query]);

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

  const gotoDetail = (item: any) => {
    navigate(`/product/view/${item.id}`); // Ensure you're using `id`
  };

  const renderStatus = (status: any) => {
    if (status === "work") {
      return <span style={{ color: "#48A800" }}>sắp diễn ra</span>;
    }
    if (status === "hidden") {
      return <span style={{ color: "#FD4858" }}>đang diễn ra</span>;
    }
    if (status === "empty") {
      return <span style={{ color: "#FD4858" }}>đã kết thúc</span>;
    }
    return <span>{status}</span>; // Default case to handle unexpected statuses
  };

  return (
    <div>
      <Heading>Danh sách phiếu giảm giá</Heading>
      <div className="rounded-xl bg-white">
        <FilterVoucher
          handleSearch={handleSearch}
          handleStatusChange={handleStatusChange}
        />
        <div className="bg-white">
          <Table headings={headings} loading={loading} length={vouchers.length}>
            {vouchers.map((item, index) => (
              <tr
                className="text-xs"
                style={{ cursor: "pointer" }}
                key={item.id}
              >
                <td onClick={() => gotoDetail(item)}>{index + 1}</td>
                <td onClick={() => gotoDetail(item)}>{item.ma}</td>
                <td onClick={() => gotoDetail(item)}>
                  <p>{item.ten}</p>
                </td>
                <td onClick={() => gotoDetail(item)}>{item.loaiPhieu}</td>
                <td onClick={() => gotoDetail(item)}>{item.soLuong}</td>
                <td onClick={() => gotoDetail(item)}>
                  {item.tongTienToiThieu}
                </td>
                <td onClick={() => gotoDetail(item)}>
                  {moment(item.thoiGianBatDau).format("DD/MM/YYYY")}
                </td>
                <td onClick={() => gotoDetail(item)}>
                  {moment(item.thoiGianKetThuc).format("DD/MM/YYYY")}
                </td>
                <td onClick={() => gotoDetail(item)}>
                  {renderStatus(item.trangThai)}
                </td>
                <td>
                  <div className="table-action">
                    <div
                      className="button-nutri"
                      onClick={() => navigate(`/product/update/${item.id}`)}
                    >
                      xía
                    </div>
                    {/* <button
                      className="button-nutri text-[#585858]"
                      onClick={() => handleShowModel(item)}
                    >
                      <IconTrash />
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
}

export default ListVoucher;
