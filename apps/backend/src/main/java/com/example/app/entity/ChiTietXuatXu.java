package com.example.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "chi_tiet_xuat_xu")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ChiTietXuatXu extends BaseEntity{

    @Column(unique = true)
    private String ma;

    private String ten;

    @ManyToOne
    @JoinColumn
    private NuocSanXuat nuocSanXuat;

    @ManyToOne
    @JoinColumn
    private ThuongHieu thuongHieu;

    private Boolean deleted = false;
}
