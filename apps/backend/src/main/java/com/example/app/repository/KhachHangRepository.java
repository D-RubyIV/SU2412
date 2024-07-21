package com.example.app.repository;

import com.example.app.entity.DiaChiNhan;
import com.example.app.entity.KhachHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import java.util.List;

@Repository
public interface KhachHangRepository extends JpaRepository<KhachHang, Integer> {
   Optional<KhachHang> findFirstByHoTen(String tenKhachHang);


    @Query("SELECT DISTINCT kh FROM KhachHang kh LEFT JOIN FETCH kh.diaChiNhan")
    List<KhachHang> findAllWithDiaChiNhans();

    @Query("SELECT kh FROM KhachHang kh WHERE kh.hoTen LIKE %?1% OR kh.soDienThoai LIKE %?1%")
    List<KhachHang> findByHoTenOrSoDienThoai(String keyword);

    @Query("SELECT kh FROM KhachHang kh WHERE (kh.hoTen LIKE %?1% OR kh.soDienThoai LIKE %?1%) AND kh.trangThai = ?2")
    List<KhachHang> findByHoTenOrSoDienThoaiAndTrangThai(String keyword, String trangThai);

    @Query("SELECT kh FROM KhachHang kh WHERE kh.trangThai = ?1")
    List<KhachHang> findByTrangThai(String trangThai);


   @Query("SELECT DISTINCT kh FROM KhachHang kh LEFT JOIN FETCH kh.diaChiNhan")
   List<KhachHang> findAllWithDiaChiNhans();

   @Query("SELECT kh FROM KhachHang kh WHERE kh.hoTen LIKE %?1% OR kh.soDienThoai LIKE %?1%")
   List<KhachHang> findByHoTenOrSoDienThoai(String keyword);
}
