package com.example.app.controller;

import com.example.app.entity.HoaDon;
import com.example.app.entity.HoaDonChiTiet;
import com.example.app.entity.SanPhamChiTiet;
import com.example.app.repository.HoaDonChiTietRepository;
import com.example.app.repository.HoaDonRepository;
import com.example.app.repository.SanPhamChiTietRepository;
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
    private SanPhamChiTietRepository sanPhamChiTietRepository;
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

    @GetMapping("/increase/{id}")
    public ResponseEntity<HoaDonChiTiet> increase(@PathVariable int id) throws BadRequestException {
        HoaDonChiTiet hoaDonChiTiet = hoaDonChiTietRepository.findById(id).orElseThrow(() -> new BadRequestException("Hóa đơn chi tiết không được tìm thấy"));
        SanPhamChiTiet sanPhamChiTiet = sanPhamChiTietRepository.findById(hoaDonChiTiet.getSanPhamChiTiet().getId()).orElseThrow(() -> new BadRequestException("SPCT không được tìm thấy"));
        if (sanPhamChiTiet.getSoLuong() > hoaDonChiTiet.getSoLuong() + 1) {
            hoaDonChiTiet.setSoLuong(hoaDonChiTiet.getSoLuong() + 1);
            hoaDonChiTietRepository.save(hoaDonChiTiet);
        }
        return ResponseEntity.ok(hoaDonChiTiet);
    }

    @GetMapping("/decrease/{id}")
    public ResponseEntity<HoaDonChiTiet> decrease(@PathVariable int id) throws BadRequestException {
        HoaDonChiTiet hoaDonChiTiet = hoaDonChiTietRepository.findById(id).orElseThrow(() -> new BadRequestException("Hóa đơn chi tiết không được tìm thấy"));
        if (hoaDonChiTiet.getSoLuong() - 1 > 0) {
            hoaDonChiTiet.setSoLuong(hoaDonChiTiet.getSoLuong() - 1);
            hoaDonChiTietRepository.save(hoaDonChiTiet);
        } else {
            hoaDonChiTietRepository.delete(hoaDonChiTiet);
        }
        return ResponseEntity.ok(hoaDonChiTiet);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HoaDonChiTiet> delete(@PathVariable int id) throws BadRequestException {
        HoaDonChiTiet hoaDonChiTiet = hoaDonChiTietRepository.findById(id).orElseThrow(() -> new BadRequestException("Hóa đơn chi tiết không được tìm thấy"));
        hoaDonChiTietRepository.delete(hoaDonChiTiet);
        return ResponseEntity.ok(hoaDonChiTiet);
    }

    @PostMapping("add")
    public ResponseEntity<HoaDonChiTiet> addHDCT(
            @RequestParam(name = "idHoaDon", defaultValue = "") int idHoaDon,
            @RequestParam(name = "idSPCT", defaultValue = "") int idSPCT,
            @RequestParam(name = "soLuong", defaultValue = "") int soLuong

    ) throws BadRequestException {

        HoaDon hoaDon = hoaDonRepository.findById(idHoaDon).orElseThrow(() -> new BadRequestException("Hóa đơn không được tìm thấy"));
        SanPhamChiTiet sanPhamChiTiet = sanPhamChiTietRepository.findById(idSPCT).orElseThrow(() -> new BadRequestException("SPCT không được tìm thấy"));

        HoaDonChiTiet hoaDonChiTiet = new HoaDonChiTiet();
        hoaDonChiTiet.setSoLuong(soLuong);
        hoaDonChiTiet.setSanPhamChiTiet(sanPhamChiTiet);
        hoaDonChiTiet.setHoaDon(hoaDon);
        hoaDonChiTietRepository.save(hoaDonChiTiet);

        return ResponseEntity.ok(hoaDonChiTiet);
    }


}
