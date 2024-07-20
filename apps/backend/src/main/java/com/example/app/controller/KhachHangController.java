package com.example.app.controller;

import com.example.app.entity.DiaChiNhan;
import com.example.app.entity.KhachHang;
import com.example.app.repository.KhachHangRepository;
import com.example.app.service.KhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/khachhang")
public class KhachHangController {

    @Autowired
    private KhachHangService khachHangService;

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<KhachHang> createKhachHang(@RequestBody KhachHang khachHang) {
        KhachHang createdKhachHang = khachHangService.saveKhachHang(khachHang);
        return ResponseEntity.ok(createdKhachHang);
    }

    @GetMapping("/search")
    public ResponseEntity<List<KhachHang>> searchKhachHang(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String trangThai) {

        List<KhachHang> result;
        if (keyword != null && !keyword.isEmpty() && trangThai != null && !trangThai.equals("all")) {
            result = khachHangService.findByHoTenOrSoDienThoaiAndTrangThai(keyword, trangThai);
        } else if (keyword != null && !keyword.isEmpty()) {
            result = khachHangService.findByHoTenOrSoDienThoai(keyword);
        } else if (trangThai != null && !trangThai.equals("all")) {
            result = khachHangService.findByTrangThai(trangThai);
        } else {
            result = khachHangService.getAllKhachHang();
        }
        return ResponseEntity.ok(result);
    }


    @GetMapping("/{id}")
    public ResponseEntity<KhachHang> getKhachHangById(@PathVariable Integer id) {
        KhachHang khachHang = khachHangService.getKhachHangById(id).orElseThrow(() -> new RuntimeException("KhachHang not found"));
        return ResponseEntity.ok(khachHang);
    }

    @GetMapping
    public ResponseEntity<List<KhachHang>> getAllKhachHangWithDiaChiNhans() {
        List<KhachHang> khachHangList = khachHangService.getAllKhachHang();
        return ResponseEntity.ok(khachHangList);
    }


    @PutMapping("/{id}")
    public ResponseEntity<KhachHang> updateKhachHang(@PathVariable Integer id, @RequestBody KhachHang khachHang) {
        KhachHang updatedKhachHang = khachHangService.updateKhachHang(id, khachHang);
        return ResponseEntity.ok(updatedKhachHang);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteKhachHang(@PathVariable Integer id) {
        khachHangService.deleteKhachHangById(id);
        return ResponseEntity.noContent().build();
    }
}
