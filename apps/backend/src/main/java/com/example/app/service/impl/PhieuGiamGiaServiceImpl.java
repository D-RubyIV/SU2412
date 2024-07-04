package com.example.app.service.impl;

import com.example.app.entity.KhachHang;
import com.example.app.entity.PhieuGiamGia;
import com.example.app.model.request.PhieuGiamGiaRequest;
import com.example.app.model.response.PhieuGiamGiaResponse;
import com.example.app.repository.KhachHangRepository;
import com.example.app.repository.PhieuGiamGiaRepository;
import com.example.app.service.PhieuGiamGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhieuGiamGiaServiceImpl implements PhieuGiamGiaService {

    @Autowired
    private PhieuGiamGiaRepository phieuGiamGiaRepository;

    @Autowired
    private KhachHangRepository khachHangRepository;

    @Override
    public List<PhieuGiamGiaResponse> getAll() {
        return phieuGiamGiaRepository.getAll();
    }
//
//    @Override
//    public Page<PhieuGiamGiaResponse> getPagePhieuGiamGia(Pageable pageable) {
//        return null;
//    }
//
//    @Override
//    public PhieuGiamGiaResponse findPhieuGiamGiaById(Long id) {
//        return null;
//    }
//
//    @Override
//    public PhieuGiamGia addPhieuGiamGia(PhieuGiamGiaRequest request) {
//        return null;
//    }
//
//    @Override
//    public PhieuGiamGia updatePhieuGiamGia(Long id, PhieuGiamGiaRequest request) {
//        return null;
//    }
}
