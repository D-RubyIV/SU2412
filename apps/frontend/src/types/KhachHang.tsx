type KhachHangEntity = {
  id: number;
  ma: string;
  hoTen: string;
  email: string;
  gioiTinh: boolean;
  soDienThoai: string;
  ngaySinh: Date;
  trangThai: string;
  diaChiNhan?: {
    diaChi: string;
    soDienThoaiNhan: string;
  };
};
export default KhachHangEntity;
