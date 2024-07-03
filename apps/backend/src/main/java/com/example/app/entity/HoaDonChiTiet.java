package com.example.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "hoa_don_chi_tiet")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class HoaDonChiTiet extends BaseEntity{
    private String ma;
    private Double gia;
    private Integer soLuong;

    @ManyToOne
    @JoinColumn
    private SanPhamChiTiet sanPhamChiTiet;

    @ManyToOne
    @JoinColumn
    private HoaDon hoaDon;



    private Boolean deleted = false;

}
