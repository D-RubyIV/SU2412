package com.example.app.entity;

import com.example.app.enums.TypePhieuGiamGia;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "phieu_giam_khach_hang")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PhieuGiamKhachHang extends BaseEntity{
    private String ma;
    private String ten;
    private LocalDateTime startAt;
    private LocalDateTime endAt;
    private Integer quantity;
    private TypePhieuGiamGia type;
    private double minCheckout;
    private double maxPercent;
    private Boolean deleted = false;
}
