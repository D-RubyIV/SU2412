package com.example.app.repository;

import com.example.app.entity.HoaDon;
import com.example.app.entity.LichSuDatHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LichSuDatHangRepository extends JpaRepository<LichSuDatHang, Integer> {
    List<LichSuDatHang> findAllByHoaDon(HoaDon hoaDon);

}
