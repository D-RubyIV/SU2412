import { Link } from "react-router-dom";
import { IconPlus, IconSearch } from "../../../components/icons";
import { optionStatus } from "../../../constants/options";
import Select from "react-select";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
type TFilterCustomer = {
  handleSearch: (e: any) => void;
  handleStatusChange: (status: any) => void;
};

const FilterVoucher = ({
  handleSearch,
  handleStatusChange,
}: TFilterCustomer) => {
  const auth: any = useSelector((state: RootState) => state.auth.auth?.user);
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSearch(e.target.value);
    }
  };
  return (
    <div className="flex flex-wrap items-center justify-between p-5 bg-white rounded-tl-lg rounded-tr-lg">
      <div className="flex items-center gap-2 filter-wrapper">
        <div className="filter-search flex items-center bg-transparent border border-gray-200 px-2 py-1 gap-2 rounded-lg h-[40px] min-w-[350px]">
          <IconSearch></IconSearch>
          <input
            type="text"
            className="w-full bg-transparent border-none outline-none"
            placeholder="Tên sản phẩm"
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="filter-room"></div>
        <div className="filter-doctor">
          <Select
            className="react-select"
            classNamePrefix="react-select"
            placeholder="-Trạng thái-"
            options={optionStatus}
            onChange={handleStatusChange}
          ></Select>
        </div>
      </div>
      {auth?.role?.roleNumber == 2 ? null : (
        <div className="flex items-end gap-2">
          <Link
            to={"/product/add"}
            className="flex gap-2 px-3 py-2 rounded-lg bg-primary"
          >
            <div className="flex items-center p-1 bg-white rounded-lg text-primary">
              <IconPlus></IconPlus>
            </div>
            <span className="flex items-center text-sm text-white">Thêm</span>
          </Link>
        </div>
      )}
    </div>
  );
};
export default FilterVoucher;
