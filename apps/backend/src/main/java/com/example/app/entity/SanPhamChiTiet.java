package com.example.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "san_pham_chi_tiet")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SanPhamChiTiet extends BaseEntity{

    @Column(unique = true)
    private String ma;

    private Long soLuong;

    private Double gia;

    private String moTaNgan;

    private String moTaChiTiet;

    @ManyToOne
    @JoinColumn
    private SanPham sanPham;

    @ManyToOne
    @JoinColumn
    private MauSac mauSac;

    @ManyToOne
    @JoinColumn
    private KichThuoc kichThuoc;

    @ManyToOne
    @JoinColumn
    private LoaiHoaTIet loaiHoaTIet;

    @ManyToOne
    @JoinColumn
    private MoTaHoaTiet moTaHoaTiet;

    @ManyToOne
    @JoinColumn
    private NuocSanXuat nuocSanXuat;

    @ManyToOne
    @JoinColumn
    private ThuongHieu thuongHieu;

    @ManyToOne
    @JoinColumn
    private KieuCoAo kieuCoAo;

    @ManyToOne
    @JoinColumn
    private KieuTaiAo kieuTaiAo;

    @ManyToOne
    @JoinColumn
    private KieuDangAo kieuDangAo;

    @ManyToOne
    @JoinColumn
    private ChatLieu chatLieu;

    @ManyToOne
    @JoinColumn
    private DoDayCuaVai doDayCuaVai;

    @ManyToOne
    @JoinColumn
    private KhaNangCoDan khaNangCoDan;

    @ManyToOne
    @JoinColumn
    private HinhAnh hinhAnh;

    private Boolean deleted = false;
}

