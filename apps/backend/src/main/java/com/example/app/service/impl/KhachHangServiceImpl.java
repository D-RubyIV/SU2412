package com.example.app.service.impl;

import com.example.app.entity.DiaChiNhan;
import com.example.app.entity.KhachHang;
import com.example.app.repository.KhachHangRepository;
import com.example.app.service.KhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KhachHangServiceImpl implements KhachHangService {

    @Autowired
    private KhachHangRepository khachHangRepository;

    @Override
    public KhachHang saveKhachHang(KhachHang khachHang) {
        return khachHangRepository.save(khachHang);
    }

    @Override
    public Optional<KhachHang> getKhachHangById(Integer id) {
        return khachHangRepository.findById(id);
    }

    @Override
    public List<KhachHang> getAllKhachHang() {
        return khachHangRepository.findAll();
    }

    @Override
    public KhachHang updateKhachHang(Integer id, KhachHang khachHang) {
        KhachHang existKhachHang = khachHangRepository.findById(id).orElseThrow(() -> new RuntimeException("KhachHang not found"));
        existKhachHang.setMa(khachHang.getMa());
        existKhachHang.setEmail(khachHang.getEmail());
        existKhachHang.setPassword(khachHang.getPassword());
        existKhachHang.setGioiTinh(khachHang.isGioiTinh());
        existKhachHang.setSoDienThoai(khachHang.getSoDienThoai());
        existKhachHang.setHoTen(khachHang.getHoTen());
        existKhachHang.setNgaySinh(khachHang.getNgaySinh());
        existKhachHang.setTrangThai(khachHang.getTrangThai());
        existKhachHang.setDeleted(khachHang.getDeleted());
        existKhachHang.setCreateBy(khachHang.getCreateBy());
        existKhachHang.setUpdateBy(khachHang.getUpdateBy());
        existKhachHang.setCreateAt(khachHang.getCreateAt());
        existKhachHang.setUpdateAt(khachHang.getUpdateAt());
        existKhachHang.setDiaChiNhan(khachHang.getDiaChiNhan());
        return khachHangRepository.saveAndFlush(existKhachHang);
    }

    @Override
    public void deleteKhachHangById(Integer id) {
        khachHangRepository.deleteById(id);
    }

    @Override
    public List<KhachHang> findAllWithDiaChiNhans() {
        return khachHangRepository.findAllWithDiaChiNhans();
    }

    @Override
    public List<KhachHang> findByHoTenOrSoDienThoai(String keyword) {
        return khachHangRepository.findByHoTenOrSoDienThoai(keyword);
    }

    @Override
    public List<KhachHang> findByHoTenOrSoDienThoaiAndTrangThai(String keyword, String trangThai) {
        return List.of();
    }

    @Override
    public List<KhachHang> findByTrangThai(String trangThai) {
        return List.of();
    }

//    @Override
//    public List<KhachHang> findByHoTenAndSoDienThoai(String hoTen, String soDienThoai) {
//        return khachHangRepository.findByHoTenAndSoDienThoai(hoTen, soDienThoai);
//    }

}