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
@Table(name = "kieu_dang_ao")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class KieuDangAo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    private String ma;
    private String ten;

    private String createdBy;
    private String updatedBy;
    private Date createdAt;
    private Date updatedAt;
    private Boolean deleted = false;
}
