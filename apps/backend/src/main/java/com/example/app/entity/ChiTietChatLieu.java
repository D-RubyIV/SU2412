package com.example.app.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "chi_tiet_chat_lieu")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ChiTietChatLieu  extends BaseEntity {
    @Column(unique = true)
    private String ma;
    private String ten;
    private Boolean deleted = false;

    @ManyToOne
    @JoinColumn()
    private ChatLieu chatLieu;

    @ManyToOne
    @JoinColumn()
    private DoDayCuaVai doDayCuaVai;

    @ManyToOne
    @JoinColumn()
    private KhaNangCoDan khaNangCoDan;
}
