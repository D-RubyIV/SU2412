package com.example.app.controller;

import com.example.app.entity.HoaDon;
import com.example.app.repository.HoaDonRepository;
import com.example.app.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RequestMapping("/api/bills")
@RestController
public class HoaDonController {

    @Autowired
    private HoaDonService hoaDonService;

    @Autowired
    private HoaDonRepository hoaDonRepository;

    @GetMapping
    public ResponseEntity<Page<HoaDon>> findAllByPage(
            @RequestParam(name = "limit", defaultValue = "5") int limit,
            @RequestParam(name = "offset", defaultValue = "5") int offset
    ){
        Pageable pageable = PageRequest.of(offset, limit);
        return ResponseEntity.ok(hoaDonRepository.findAll(pageable));
    }
}
