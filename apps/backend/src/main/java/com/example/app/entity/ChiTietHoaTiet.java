package com.example.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "chi_tiet_hoa_tiet")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ChiTietHoaTiet extends BaseEntity{

    @Column(unique = true)
    private String ma;

    private String ten;

    @ManyToOne
    @JoinColumn
    private LoaiHoaTIet loaiHoaTIet;

    @ManyToOne
    @JoinColumn
    private MoTaHoaTiet moTaHoaTiet;

    private Boolean deleted = false;
}
