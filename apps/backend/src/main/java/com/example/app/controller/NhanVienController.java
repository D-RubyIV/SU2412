package com.example.app.controller;
import com.example.app.entity.NhanVien;
import com.example.app.service.NhanVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RequestMapping("/api/staffs")
@RestController
public class NhanVienController {
    private final NhanVienService nhanVienService;

    @Autowired
    public NhanVienController(NhanVienService nhanVienService) {
        this.nhanVienService = nhanVienService;
    }

    @GetMapping
    public ResponseEntity<Page<NhanVien>> getAllNhanVien(
            @RequestParam(name = "limit", defaultValue = "5") int limit,
            @RequestParam(name = "offset", defaultValue = "0") int offset) {
        Page<NhanVien> result = nhanVienService.getAllStaffs(limit, offset);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/search")
    public Page<NhanVien> searchNhanVien(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String hoTen,
            @RequestParam(required = false) String sdt,
            @RequestParam(required = false) String ma,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String trangThai,
            @RequestParam(required = false) String cccd,
            @RequestParam(defaultValue = "5") int limit,
            @RequestParam(defaultValue = "0") int offset) {
        return nhanVienService.searchNhanVien(keyword, hoTen, sdt, ma, email, trangThai, cccd, limit, offset);
    }


    @GetMapping("/{id}")
    public ResponseEntity<NhanVien> getNhanVienById(@PathVariable Integer id) {
        Optional<NhanVien> nhanVien = nhanVienService.getStaffById(id);
        return nhanVien.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<NhanVien> createNhanVien(@RequestBody NhanVien request) {
        NhanVien response = nhanVienService.createNhanVien(request);
        return ResponseEntity.status(201).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NhanVien> updateNhanVien(@PathVariable Integer id, @RequestBody NhanVien request) {
        NhanVien response = nhanVienService.updateStaff(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNhanVien(@PathVariable Integer id) {
        nhanVienService.deleteStaff(id);
        return ResponseEntity.noContent().build();
    }

}
