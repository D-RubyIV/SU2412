package com.example.app.controller;

import com.example.app.entity.HoaDon;
import com.example.app.entity.LichSuDatHang;
import com.example.app.repository.HoaDonRepository;
import com.example.app.repository.LichSuDatHangRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RequestMapping("/api/history-bills")
@RestController
public class LichSuDatHangController {
    @Autowired
    private HoaDonRepository hoaDonRepository;

    @Autowired
    private LichSuDatHangRepository lichSuDatHangRepository;

    @GetMapping("/inBill/{id}")
    public ResponseEntity<List<LichSuDatHang>> detailBill(@PathVariable int id) throws BadRequestException {
        HoaDon hoaDon = hoaDonRepository.findById(id).orElseThrow(() -> new BadRequestException("Không tìm thấy hóa đơm"));
        return ResponseEntity.ok(lichSuDatHangRepository.findAllByHoaDon(hoaDon));
    }
}
