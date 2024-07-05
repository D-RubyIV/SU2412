package com.example.app.service;

import com.example.app.entity.PhieuGiamGia;
import com.example.app.model.request.PhieuGiamGiaRequest;
import com.example.app.model.response.PhieuGiamGiaResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

public interface PhieuGiamGiaService {

    List<PhieuGiamGiaResponse> getAll();

//    Page<PhieuGiamGiaResponse> getPagePhieuGiamGia(Pageable pageable);
//
//    PhieuGiamGiaResponse findPhieuGiamGiaById(Long id);
//
//    PhieuGiamGia addPhieuGiamGia(PhieuGiamGiaRequest request);
//
//    PhieuGiamGia updatePhieuGiamGia(Long id,PhieuGiamGiaRequest request);

}
