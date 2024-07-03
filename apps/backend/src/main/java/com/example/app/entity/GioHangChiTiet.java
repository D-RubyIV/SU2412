package com.example.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "gio_hang_chi_tiet")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class GioHangChiTiet extends BaseEntity{
    private Integer soLuong;
    private Boolean deleted = false;

    @ManyToOne
    @JoinColumn
    private SanPhamChiTiet sanPhamChiTiet;

    @ManyToOne
    @JoinColumn
    private GioHang gioHang;

}
