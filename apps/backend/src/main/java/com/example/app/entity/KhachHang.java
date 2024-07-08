package com.example.app.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "khach_hang")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class KhachHang extends BaseEntity{
    @Column(unique = true)
    private String ma;
    @Column(unique = true)
    private String email;
    private String password;
    private boolean gioiTinh;
    private String soDienThoai;
    private String hoTen;
    private LocalDateTime ngaySinh;
    private String trangThai;
    private Boolean deleted = false;

    @JsonBackReference
    @ManyToMany(mappedBy = "khachHangs")
    private Set<PhieuGiamGia> phieuGiamGias;

    @ManyToOne
    @JoinColumn
    private DiaChiNhan diaChiNhan;
}
