package com.example.app.service;

import com.example.app.entity.HoaDon;
import com.example.app.entity.LichSuDatHang;
import com.example.app.enums.ETrangThaiHoaDon;
import com.example.app.repository.LichSuDatHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LichSuDatHangService {
    @Autowired
    private LichSuDatHangRepository lichSuDatHangRepository;

    public LichSuDatHang create(ETrangThaiHoaDon eTrangThaiHoaDon, HoaDon hoaDon) {
        LichSuDatHang lichSuDatHang = LichSuDatHang.builder()
                .hoaDon(hoaDon)
                .trangThaiDonHang(eTrangThaiHoaDon)
                .build();
        lichSuDatHangRepository.save(lichSuDatHang);
        return lichSuDatHang;
    }
}
