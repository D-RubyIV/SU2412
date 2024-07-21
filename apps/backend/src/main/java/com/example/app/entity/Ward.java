package com.example.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Ward")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Ward {
    @Id

    private int id;

    @Column(name = "Code")
    private String code;

    @Column(name = "Name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "DistrictId")
    private District district;
}
