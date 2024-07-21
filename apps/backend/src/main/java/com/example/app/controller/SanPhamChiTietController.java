package com.example.app.controller;


import com.example.app.repository.SanPhamChiTietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RequestMapping("/api/spct")
@RestController
public class SanPhamChiTietController {
    @Autowired
    private SanPhamChiTietRepository sanPhamChiTietRepository;

    @GetMapping("")
    public ResponseEntity<?> findAll(){
        return ResponseEntity.ok(sanPhamChiTietRepository.findAll());
    }
}
