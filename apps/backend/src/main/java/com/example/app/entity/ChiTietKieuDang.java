package com.example.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "chi_tiet_kieu_dang")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ChiTietKieuDang extends BaseEntity{
    private String ma;
    private String ten;
    private Boolean deleted = false;

    @ManyToOne
    @JoinColumn
    private KieuCoAo kieuCoAo;

    @ManyToOne
    @JoinColumn
    private KieuTaiAo kieuTaiAo;

    @ManyToOne
    @JoinColumn
    private KieuDangAo kieuDangAo;

}
