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

@Entity
@Table(name = "hinh_anh")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class HinhAnh {
// xem con thieu thuoc tinh gi khong toi (khong thi thoi =)))
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    private String ten;

    private String createdBy;
    private String updatedBy;
}
