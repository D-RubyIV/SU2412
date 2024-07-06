package com.example.app.controller.admin;

import com.example.app.entity.PhieuGiamGia;
import com.example.app.model.request.PhieuGiamGiaRequest;
import com.example.app.model.response.PhieuGiamGiaResponse;
import com.example.app.repository.PhieuGiamGiaRepository;
import com.example.app.service.PhieuGiamGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/phieu-giam-gia")
public class PhieuGiamGiaController {
    @Autowired
    PhieuGiamGiaService phieuGiamGiaService;

    @Autowired
    private PhieuGiamGiaRepository phieuGiamGiaRepository;

    @GetMapping("")
    public ResponseEntity<?> getAsll() {
        List<PhieuGiamGia> fetchPhieuGiamGia = this.phieuGiamGiaRepository.findAll();
        // Trả về response với STATUS CODE = 200 (OK)
        // Body sẽ chứa thông tin về đối tượng fetchPhiouGiamGia vừa được tạo.
        return ResponseEntity.ok().body(fetchPhieuGiamGia);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<PhieuGiamGiaResponse>> getAll() {
        List<PhieuGiamGiaResponse> fetchPhieuGiamGia = this.phieuGiamGiaService.getAll();
        // Trả về response với STATUS CODE = 200 (OK)
        // Body sẽ chứa thông tin về đối tượng fetchPhiouGiamGia vừa được tạo.
        return ResponseEntity.ok().body(fetchPhieuGiamGia);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhieuGiamGia> getPhieuGiamGiaById(@PathVariable Integer id) {
        PhieuGiamGia phieuGiamGia =  phieuGiamGiaService.findPhieuGiamGiaById(id);
        if (phieuGiamGia != null) {
            return ResponseEntity.ok(phieuGiamGia);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addPhieuGiamGia(@RequestBody PhieuGiamGiaRequest request) {
        phieuGiamGiaService.addPhieuGiamGia(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("success");
    }

    @PutMapping("/{id}")
    public ResponseEntity<PhieuGiamGia> updatePhieuGiamGia(
            @PathVariable Integer id,
            @RequestBody PhieuGiamGiaRequest request) {
        PhieuGiamGia updatedPhieuGiamGia = phieuGiamGiaService.updatePhieuGiamGia(id, request);
        if (updatedPhieuGiamGia == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedPhieuGiamGia);
    }


}
