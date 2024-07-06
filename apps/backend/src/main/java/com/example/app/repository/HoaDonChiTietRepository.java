package com.example.app.repository;

import com.example.app.entity.HoaDon;
import com.example.app.entity.HoaDonChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HoaDonChiTietRepository extends JpaRepository<HoaDonChiTiet, Integer> {
    List<HoaDonChiTiet> findAllByHoaDon(HoaDon hoaDon);
}
