package com.example.app.entity;

import com.example.app.enums.ELoaiHoaDon;
import com.example.app.enums.ETrangThaiHoaDon;
import com.example.app.enums.ETrangThaiVanChuyen;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "hoa_don")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class HoaDon extends BaseEntity{
    @Column(unique = true)
    private String ma;

    private Double tongTien;
    private Double tongTienSauGiam;

    private String soDienThoaiNguoiShip;
    private String tenNguoiShip;
    private String diaChiNhan;
    private String soDienThoaiNhan;

    private LocalDateTime ngayDatHang;
    private LocalDateTime ngayGiaoHang;
    private LocalDateTime ngayNhanHangDuKien;
    private LocalDateTime ngayNhanHang;

    @Enumerated(EnumType.STRING)
    private ETrangThaiHoaDon trangThai;

    @Enumerated(EnumType.STRING)
    private ETrangThaiVanChuyen trangThaiVanChuyen;

    @Enumerated(EnumType.STRING)
    private ELoaiHoaDon loaiHoaDon;

    private Double phiVanChuyen;

    @ManyToOne
    @JoinColumn
    private PhieuGiamGia phieuGiamGia;

    @ManyToOne
    @JoinColumn
    private NhanVien nhanVien;

    @ManyToOne
    @JoinColumn
    private HinhThucThanhToan hinhThucThanhToan;

    private boolean giaoHang = false;
    private Boolean deleted = false;
}
