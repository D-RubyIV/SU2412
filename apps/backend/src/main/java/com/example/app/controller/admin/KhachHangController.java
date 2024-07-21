//package com.example.app.controller.admin;
//
//import com.example.app.entity.DiaChiNhan;
//import com.example.app.entity.KhachHang;
//import com.example.app.service.KhachHangService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/khachhang")
//public class KhachHangController {
//
//    @Autowired
//    private KhachHangService khachHangService;
//
//    @PostMapping(consumes = "application/json", produces = "application/json")
//    public ResponseEntity<KhachHang> createKhachHang(@RequestBody KhachHang khachHang) {
//        KhachHang createdKhachHang = khachHangService.saveKhachHang(khachHang);
//        return ResponseEntity.ok(createdKhachHang);
//    }
//
////    @GetMapping("/{hoTen}/{soDienThoai}")
////    public ResponseEntity<List<KhachHang>> getAllKhachHangHoTenAndSoDienThoai(@PathVariable String hoTen, @PathVariable String soDienThoai) {
////        List<KhachHang> khachHangs = khachHangService.findByHoTenAndSoDienThoai(hoTen, soDienThoai);
////        return ResponseEntity.ok(khachHangs);
////    }
//
//
//    @GetMapping("/search")
//    public ResponseEntity<List<KhachHang>> searchKhachHangs(
//            @RequestParam(required = false) String keyword) {
//
//        List<KhachHang> khachHangs = khachHangService.findByHoTenOrSoDienThoai(keyword);
//        return ResponseEntity.ok(khachHangs);
//    }
//
//
//    @GetMapping("/{id}")
//    public ResponseEntity<KhachHang> getKhachHangById(@PathVariable Integer id) {
//        KhachHang khachHang = khachHangService.getKhachHangById(id).orElseThrow(() -> new RuntimeException("KhachHang not found"));
//        return ResponseEntity.ok(khachHang);
//    }
//
//    @GetMapping
//    public ResponseEntity<List<KhachHang>> getAllKhachHangWithDiaChiNhans() {
//        List<KhachHang> khachHangList = khachHangService.getAllKhachHang();
//        return ResponseEntity.ok(khachHangList);
//    }
//
//
//    @PutMapping("/{id}")
//    public ResponseEntity<KhachHang> updateKhachHang(@PathVariable Integer id, @RequestBody KhachHang khachHang) {
//        KhachHang updatedKhachHang = khachHangService.updateKhachHang(id, khachHang);
//        return ResponseEntity.ok(updatedKhachHang);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteKhachHang(@PathVariable Integer id) {
//        khachHangService.deleteKhachHangById(id);
//        return ResponseEntity.noContent().build();
//    }
//}