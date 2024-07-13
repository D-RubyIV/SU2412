package com.example.app.entity;

import com.example.app.enums.ELoaiHoaDon;
import com.example.app.enums.ETrangThaiHoaDon;
import com.example.app.enums.ETrangThaiVanChuyen;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Formula;

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
    private KhachHang khachHang;

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
    @Formula("concat_ws(' ', id, loaiHoaDon)") // Adjust according to your significant fields
    private String stringRepresentation;

}
