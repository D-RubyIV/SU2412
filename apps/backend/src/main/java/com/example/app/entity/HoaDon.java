package com.example.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "hoa_don")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class HoaDon extends BaseEntity{
    private String diaChiNhan;
    private String soDienThoaiNhan;
    private String ma;
    private String trangThai;
    private Double tongTien;
    private Double tongTienSauGiam;
    private String soDienThoaiNguoiShip;
    private String tenNguoiShip;
    private Date ngayDatHang;
    private Date ngayGiaoHang;
    private Date ngayNhanHangDuKien;
    private Date ngayNhanHang;
    private String trangThaiVanChuyen;
    private Double phiVanChuyen;


    @ManyToOne
    @JoinColumn
    private LichSuDatHang lichSuDatHang;

    @ManyToOne
    @JoinColumn
    private PhieuGiamGia phieuGiamGia;

    @ManyToOne
    @JoinColumn
    private NhanVien nhanVien;

    @ManyToOne
    @JoinColumn
    private HinhThucThanhToan hinhThucThanhToan;


    private Boolean deleted = false;
}
