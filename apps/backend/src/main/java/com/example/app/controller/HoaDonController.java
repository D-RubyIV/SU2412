package com.example.app.controller;

import com.example.app.entity.HoaDon;
import com.example.app.enums.ELoaiHoaDon;
import com.example.app.enums.ETrangThaiHoaDon;
import com.example.app.repository.HoaDonRepository;
import com.example.app.service.HoaDonService;
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

@CrossOrigin("*")
@RequestMapping("/api/bills/")
@RestController
public class HoaDonController {

    @Autowired
    private HoaDonService hoaDonService;

    @Autowired
    private HoaDonRepository hoaDonRepository;

    @GetMapping("filter")
    public ResponseEntity<Page<HoaDon>> findAllByPage(
            @RequestParam(name = "limit", defaultValue = "5") int limit,
            @RequestParam(name = "offset", defaultValue = "0") int offset,
            @RequestParam(value = "status", defaultValue = "") List<ETrangThaiHoaDon> trangThaiHoaDons,
            @RequestParam(name = "type", defaultValue = "") List<ELoaiHoaDon> loaiHoaDon,
            @RequestParam(name = "startDate", defaultValue = "") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(name = "endDate", defaultValue = "") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate
    ) {
        System.out.println(trangThaiHoaDons);
        Pageable pageable = PageRequest.of(offset, limit);
        Page<HoaDon> result = hoaDonService.findAllWithProps(pageable, loaiHoaDon, trangThaiHoaDons, startDate, endDate);
        return ResponseEntity.ok(result);
    }
}
