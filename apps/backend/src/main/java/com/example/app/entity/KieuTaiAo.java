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
@Table(name = "kieu_tai_ao")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class KieuTaiAo extends BaseEntity{
    private String ma;
    private String ten;
    private Boolean deleted = false;
}
