package com.example.app.repository;

import com.example.app.entity.KhachHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KhachHangRepository extends JpaRepository<KhachHang, Integer> {
   Optional<KhachHang> findFirstByHoTen(String tenKhachHang);
}
