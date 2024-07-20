package com.example.app.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "dia_chi_nhan")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class DiaChiNhan extends BaseEntity {
    @Column(nullable = false)
    @NotNull
    private String diaChi;


    private String tenNguoiNhan;

    private String soDienThoaiNhan;

    private Boolean deleted = false;

    @JsonCreator
    public DiaChiNhan(@JsonProperty("diaChi") String diaChi) {
        this.diaChi = diaChi;
    }

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ward_id")
    private Ward ward;
}
