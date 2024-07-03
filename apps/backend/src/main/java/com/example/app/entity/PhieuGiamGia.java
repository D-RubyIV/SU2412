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
@Table(name = "phieu_giam_gia")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PhieuGiamGia extends BaseEntity{
    private String ma;
    private String ten;
    private Date thoiGianBatDau;
    private Date thoiGianKetThuc;
    private String trangThai;
    private Long soLuong;
    private Integer phanTramToiDa;
    private Double tongTienToiThieu;
    private String loaiPhieu;
    private Boolean deleted = false;
}
