//package com.example.app.controller;
//
//import com.example.app.entity.PhieuGiamGia;
//import com.example.app.service.PhieuGiamGiaService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/phieugiamgia")
//public class PhieuGiamGiaController {
//    @Autowired
//    private PhieuGiamGiaService phieuGiamGiaService;
//
//    @PostMapping
//    public ResponseEntity<PhieuGiamGia> createPhieuGiamGia(@RequestBody PhieuGiamGia phieuGiamGia) {
//        PhieuGiamGia createdPhieuGiamGia = phieuGiamGiaService.savePhieuGiamGia(phieuGiamGia);
//        return ResponseEntity.ok(createdPhieuGiamGia);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<PhieuGiamGia> getPhieuGiamGiaById(@PathVariable Integer id) {
//        PhieuGiamGia phieuGiamGia = phieuGiamGiaService.getPhieuGiamGiaById(id).orElseThrow(() -> new RuntimeException("PhieuGiamGia not found"));
//        return ResponseEntity.ok(phieuGiamGia);
//    }
//
//    @GetMapping
//    public ResponseEntity<List<PhieuGiamGia>> getAllPhieuGiamGia() {
//        List<PhieuGiamGia> phieuGiamGiaList = phieuGiamGiaService.getAllPhieuGiamGia();
//        return ResponseEntity.ok(phieuGiamGiaList);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<PhieuGiamGia> updatePhieuGiamGia(@PathVariable Integer id, @RequestBody PhieuGiamGia phieuGiamGia) {
//        PhieuGiamGia updatedPhieuGiamGia = phieuGiamGiaService.updatePhieuGiamGia(id, phieuGiamGia);
//        return ResponseEntity.ok(updatedPhieuGiamGia);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deletePhieuGiamGia(@PathVariable Integer id) {
//        phieuGiamGiaService.deletePhieuGiamGia(id);
//        return ResponseEntity.noContent().build();
//    }
//}
