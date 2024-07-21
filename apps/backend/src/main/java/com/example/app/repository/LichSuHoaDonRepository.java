package com.example.app.repository;

import com.example.app.entity.HoaDon;
import com.example.app.entity.LichSuHoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LichSuHoaDonRepository extends JpaRepository<LichSuHoaDon, Integer> {
    List<LichSuHoaDon> findAllByHoaDon(HoaDon hoaDon);

}
