package com.example.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "nhan_vien")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class NhanVien extends BaseEntity{
    private String ma;
    private String email;
    private String password;
    private boolean gioiTinh;
    private String soDienThoai;
    private String CCCD;
    private Date ngaySinh;
    private String trangThai;
    private String ghiChu;
    private Boolean deleted = false;

    @OneToOne
    private ChucVu chucVu;

}
