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
    private Loai loai;

    @ManyToOne
    @JoinColumn
    private ChiTietHoaTiet chiTietHoaTiet;

    @ManyToOne
    @JoinColumn
    private ChiTietXuatXu chiTietXuatXu;

    @ManyToOne
    @JoinColumn
    private ChiTietChatLieu chiTietChatLieu;

    @ManyToOne
    @JoinColumn
    private ChiTietKieuDang chiTietKieuDang;

    @ManyToOne
    @JoinColumn
    private HinhAnh hinhAnh;

    private Boolean deleted = false;
}

