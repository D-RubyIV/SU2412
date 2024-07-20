package com.example.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Province")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Province {

    @Id
    private int Id;

    @Column(name = "Code")
    private String code;

    @Column(name = "Name")
    private String name;


}
