package com.example.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @Column(unique = true)
    private String ma;
    private Double gia;
    private Integer soLuong;

    @ManyToOne
    @JoinColumn
    @JsonIgnore
    private HoaDon hoaDon;

    @ManyToOne
    @JoinColumn
    private SanPhamChiTiet sanPhamChiTiet;

    private Boolean deleted = false;

}
