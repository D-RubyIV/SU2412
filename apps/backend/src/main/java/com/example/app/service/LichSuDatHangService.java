package com.example.app.service;

import com.example.app.entity.HoaDon;
import com.example.app.entity.LichSuHoaDon;
import com.example.app.enums.ETrangThaiHoaDon;
import com.example.app.repository.LichSuHoaDonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LichSuDatHangService {
    @Autowired
    private LichSuHoaDonRepository lichSuHoaDonRepository;

    public LichSuHoaDon create(ETrangThaiHoaDon eTrangThaiHoaDon, HoaDon hoaDon, String note) {
        LichSuHoaDon lichSuHoaDon = LichSuHoaDon.builder()
                .hoaDon(hoaDon)
                .trangThaiDonHang(eTrangThaiHoaDon)
                .note(note)
                .build();
        lichSuHoaDonRepository.save(lichSuHoaDon);
        return lichSuHoaDon;
    }
}
