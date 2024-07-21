package com.example.app.entity;

import com.example.app.enums.TypePhieuGiamGia;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;


@Entity
@Table(name = "phieu_giam_gia")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PhieuGiamGia extends BaseEntity implements Serializable {
    @Column(unique = true)
    private String ma;
    private String ten;
    private LocalDateTime thoiGianBatDau;
    private LocalDateTime thoiGianKetThuc;
    private String trangThai;
    private Long soLuong;
    private Integer phanTramToiDa;
    private Double tongTienToiThieu;

    @Enumerated(EnumType.STRING)
    private TypePhieuGiamGia loaiPhieu;

    private Boolean deleted = false;

    @JsonManagedReference
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "phieu_giam_gia_khach_hang",
            joinColumns = @JoinColumn(name = "phieu_giam_gia_id"),
            inverseJoinColumns = @JoinColumn(name = "khach_hang_id")
    )
    private Set<KhachHang> khachHangs;



}
