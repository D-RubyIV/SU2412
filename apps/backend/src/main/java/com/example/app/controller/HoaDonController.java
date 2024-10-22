package com.example.app.controller;

import com.example.app.entity.HoaDon;
import com.example.app.entity.LichSuHoaDon;
import com.example.app.enums.ELoaiHoaDon;
import com.example.app.enums.ETrangThaiHoaDon;
import com.example.app.repository.HoaDonRepository;
import com.example.app.service.HoaDonService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RequestMapping("/api/bills")
@RestController
public class HoaDonController {

    @Autowired
    private HoaDonService hoaDonService;

    @Autowired
    private HoaDonRepository hoaDonRepository;

    @GetMapping("/filter")
    public ResponseEntity<Page<HoaDon>> findAllByPage(
            @RequestParam(name = "limit", defaultValue = "5") int limit,
            @RequestParam(name = "offset", defaultValue = "0") int offset,
            @RequestParam(value = "status", defaultValue = "") List<ETrangThaiHoaDon> trangThaiHoaDons,
            @RequestParam(name = "type", defaultValue = "") List<ELoaiHoaDon> loaiHoaDon,
            @RequestParam(name = "startDate", defaultValue = "") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(name = "endDate", defaultValue = "") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @RequestParam(name = "sMoney", defaultValue = "0") Double sMoney,
            @RequestParam(name = "eMoney", defaultValue = "10000000000") Double eMoney,
            @RequestParam(name = "key", defaultValue = "") String key
    ) {
        Pageable pageable = PageRequest.of(offset, limit);
        Page<HoaDon> result = hoaDonService.findAllWithProps(pageable, loaiHoaDon, trangThaiHoaDons, startDate, endDate, sMoney, eMoney, key);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HoaDon> detail(@PathVariable("id") int id) throws BadRequestException {
        return ResponseEntity.ok(hoaDonRepository.findById(id).orElseThrow(() -> new BadRequestException("Không tìm thấy hóa đơn")));
    }

    @PostMapping("/update-status/{id}")
    public ResponseEntity<HoaDon> updateStatus(
            @PathVariable("id") int id,
            @RequestParam(value = "status", defaultValue = "") ETrangThaiHoaDon trangThaiHoaDons,
            @RequestParam(value = "note", defaultValue = "") String note
    ) throws BadRequestException {
        return ResponseEntity.ok(hoaDonService.updateTranThaiHoaDon(id, trangThaiHoaDons, note));
    }

    @PostMapping("/update-address/{id}")
    public ResponseEntity<HoaDon> updateAddress(
            @PathVariable("id") int id,
            @RequestParam(value = "tenNguoiNhan", defaultValue = "") String tenNguoiNhan,
            @RequestParam(value = "diaChiNhan", defaultValue = "") String diaChiNhan,
            @RequestParam(value = "soDienThoaiNhan", defaultValue = "") String soDienThoaiNhan
    ) throws BadRequestException {
        return ResponseEntity.ok(hoaDonService.updateDiachiHoaDon(id, tenNguoiNhan, diaChiNhan, soDienThoaiNhan));
    }
}
