package com.example.app.service;

import com.example.app.entity.DiaChiNhan;
import com.example.app.entity.KhachHang;

import java.util.List;
import java.util.Optional;

public interface KhachHangService {

    KhachHang saveKhachHang(KhachHang khachHang);

    Optional<KhachHang> getKhachHangById(Integer id);

    List<KhachHang> getAllKhachHang();

    KhachHang updateKhachHang(Integer id, KhachHang khachHang);

    void deleteKhachHangById(Integer id);

    List<KhachHang>findAllWithDiaChiNhans();

    List<KhachHang> findByHoTenOrSoDienThoai(String keyword);

//    List<KhachHang> findByHoTenAndSoDienThoai(String hoTen, String soDienThoai);
}