package com.example.app.controller;

import com.example.app.entity.District;
import com.example.app.service.DistrictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/district")
public class DistrictController {

    @Autowired
    private DistrictService districtService;

    @GetMapping("/{provinceId}")
    public ResponseEntity<List<District>>getDistrictsByProvince(@PathVariable Integer provinceId) {
        return ResponseEntity.ok(districtService.getDistrictsByProvince(provinceId));
    }

    @GetMapping
    public ResponseEntity<List<District>> getAll() {
        List<District> districtList = districtService.getAllDistrict();
        return ResponseEntity.ok(districtList);
    }
}
