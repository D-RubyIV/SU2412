package com.example.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "nhan_vien")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class NhanVien extends BaseEntity{
    @Column(unique = true)
    private String ma;

    private String email;
    private String password;
    private String hoTen;
    private String diaChi;
    private boolean gioiTinh;
    private String soDienThoai;
    private String cccd;
    private String diaChi;
    private String hoTen;
    private Date ngaySinh;
    private String trangThai;
    private String ghiChu;
    private String tinh;
    private String quan;
    private String phuong;
    private Boolean deleted = false;
    private LocalDateTime createdAt;
    @OneToOne
    private ChucVu chucVu;

}
