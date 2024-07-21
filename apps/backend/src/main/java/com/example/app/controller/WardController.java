package com.example.app.controller;

import com.example.app.entity.KhachHang;
import com.example.app.entity.Ward;
import com.example.app.service.WardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/ward")
public class WardController {

    @Autowired
    private WardService wardService;

    @GetMapping("/{districtId}")
    public List<Ward> getWardsByDistrict(@PathVariable Integer districtId) {
        return wardService.getWardsByDistrict(districtId);
    }

    @GetMapping
    public ResponseEntity<List<Ward>> getAll() {
        List<Ward> wardList = wardService.getAllWard();
        return ResponseEntity.ok(wardList);
    }
}
