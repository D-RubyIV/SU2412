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
@Table(name = "lich_su_dat_hang")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class LichSuDatHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    private String trangThaiDonHang;

    private String createdBy;
    private String updatedBy;
    private Date createdAt;
    private Date updatedAt;
    private Boolean deleted = false;
}
