package com.example.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "gio_hang")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class GioHang extends BaseEntity{
    private String trangThai;
    private Boolean deleted = false;

    @ManyToOne
    @JoinColumn
    private KhachHang khachHang;
}
