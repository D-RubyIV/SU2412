package com.example.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "dia_chi_nhan")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class DiaChiNhan extends BaseEntity{
    private String diaChi;
    private String soDienThoaiNhan;
    private Boolean deleted = false;

    @ManyToOne
    @JoinColumn
    private KhachHang khachHang;

}
