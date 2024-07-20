package com.example.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "District")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class District {

    @Id
    private int Id;

    @Column(name = "Code")
    private String code;

    @Column(name = "Name")
    private String name;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "province_Id")
    private Province province;
}
