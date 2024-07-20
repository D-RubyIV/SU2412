package com.example.app.controller;

import com.example.app.entity.KhachHang;
import com.example.app.entity.Province;
import com.example.app.entity.Ward;
import com.example.app.service.ProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/province")
public class ProvinceController {

    @Autowired
    private ProvinceService provinceService;

    @GetMapping
    public ResponseEntity<List<Province>> getAll() {
        List<Province> provinceList = provinceService.getAllProvince();
        return ResponseEntity.ok(provinceList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Province> getWardById(@PathVariable Integer id) {
        Province province = provinceService.getProvinceById(id).orElseThrow(() -> new RuntimeException("Province not found"));
        return ResponseEntity.ok(province);
    }
}
