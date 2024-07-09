package com.example.app.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "khach_hang")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder

public class KhachHang extends BaseEntity {
    @Column(unique = true, nullable = false)
    private String ma;

    @Column(unique = true, nullable = false)
    @NotNull
    @Email
    private String email;

    @Column(nullable = false)
    private String password;

    private boolean gioiTinh;

    @Column(nullable = false)
    @NotNull
    private String soDienThoai;

    @Column(nullable = false)
    @NotNull
    private String hoTen;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime ngaySinh;

    private String trangThai;

    private Boolean deleted = false;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn
    private DiaChiNhan diaChiNhan;


}
