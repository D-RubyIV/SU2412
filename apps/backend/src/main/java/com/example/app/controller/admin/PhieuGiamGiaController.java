package com.example.app.controller.admin;

import com.example.app.entity.PhieuGiamGia;
import com.example.app.model.response.PhieuGiamGiaResponse;
import com.example.app.service.PhieuGiamGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/phieu-giam-gia")
public class PhieuGiamGiaController {
    @Autowired
    PhieuGiamGiaService phieuGiamGiaService;

    @GetMapping("/get-all")
    public ResponseEntity<List<PhieuGiamGiaResponse>> getAll() {
        List<PhieuGiamGiaResponse> fetchPhieuGiamGia = this.phieuGiamGiaService.getAll();
        // Trả về response với STATUS CODE = 200 (OK)
        // Body sẽ chứa thông tin về đối tượng fetchPhiouGiamGia vừa được tạo.
        return ResponseEntity.ok().body(fetchPhieuGiamGia);
    }
}
