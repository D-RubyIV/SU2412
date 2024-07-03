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
@Table(name = "khach_hang")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class KhachHang extends BaseEntity{
    private String ma;
    private String email;
    private String password;
    private boolean gioiTinh;
    private String soDienThoai;
    private String hoTen;
    private Date ngaySinh;
    private String trangThai;
    private Boolean deleted = false;

}
