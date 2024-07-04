package com.example.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Entity
@Table(name = "kha_nang_co_dan")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class KhaNangCoDan extends BaseEntity {
    @Column(unique = true)
    private String ma;
    private String ten;
    private Boolean deleted = false;

}
