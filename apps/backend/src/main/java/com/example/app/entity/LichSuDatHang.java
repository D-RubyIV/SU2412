package com.example.app.entity;

import com.example.app.enums.ETrangThaiHoaDon;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "lich_su_dat_hang")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class LichSuDatHang extends BaseEntity{
    @ManyToOne
    @JoinColumn
    private HoaDon hoaDon;
    private ETrangThaiHoaDon trangThaiDonHang;
    private Boolean deleted = false;
}
