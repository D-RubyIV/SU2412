package com.example.app.controller;

import com.example.app.entity.HoaDon;
import com.example.app.entity.HoaDonChiTiet;
import com.example.app.repository.HoaDonChiTietRepository;
import com.example.app.repository.HoaDonRepository;
import org.apache.coyote.BadRequestException;
import org.hibernate.jdbc.BatchedTooManyRowsAffectedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bill-details")
@CrossOrigin("*")
public class HoaDonChiTietController {
    @Autowired
    private HoaDonChiTietRepository hoaDonChiTietRepository;
    @Autowired
    private HoaDonRepository hoaDonRepository;

    @GetMapping("/{id}")
    public ResponseEntity<HoaDonChiTiet> detail(@PathVariable int id) throws BadRequestException {
        return ResponseEntity.ok(hoaDonChiTietRepository.findById(id).orElseThrow(() -> new BadRequestException("Hóa đơn chi tiết không được tìm thấy")));
    }

    @GetMapping("/in-bill/{id}")
    public ResponseEntity<List<HoaDonChiTiet>> inBill(@PathVariable int id) throws BadRequestException {
        HoaDon hoaDon = hoaDonRepository.findById(id).orElseThrow(() -> new BadRequestException("Hóa đơn không tìm thấy"));
        return ResponseEntity.ok(hoaDonChiTietRepository.findAllByHoaDon(hoaDon));
    }

}
