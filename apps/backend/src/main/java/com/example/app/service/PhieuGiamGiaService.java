package com.example.app.service;

import com.example.app.entity.PhieuGiamGia;
import com.example.app.model.request.PhieuGiamGiaRequest;
import com.example.app.model.response.PageResponse;
import com.example.app.model.response.PhieuGiamGiaResponse;


import java.util.List;

public interface PhieuGiamGiaService {

    List<PhieuGiamGiaResponse> getAll();

//    Page<PhieuGiamGiaResponse> getPagePhieuGiamGia(int page, int limit);

    PageResponse<PhieuGiamGiaResponse> getPagePhieuGiamGia(int page, int limit);
    PhieuGiamGiaResponse findPhieuGiamGiaById(Integer id);

    PhieuGiamGia addPhieuGiamGia(PhieuGiamGiaRequest request);

    PhieuGiamGia updatePhieuGiamGia(Integer id,PhieuGiamGiaRequest request);

    List<PhieuGiamGia> getAllVer2();

    void updateTrangThaiPhieuGiamGia();

    void deletePhieuGiamGia(Integer id);
}
