package com.example.app.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
    private Boolean deleted = false;
}
