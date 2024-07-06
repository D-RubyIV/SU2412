package com.example.app.service;

import com.example.app.entity.HoaDon;
import com.example.app.enums.ELoaiHoaDon;
import com.example.app.enums.ETrangThaiHoaDon;
import com.example.app.enums.ETrangThaiVanChuyen;
import com.example.app.repository.HoaDonRepository;
import com.example.app.repository.LichSuDatHangRepository;
import org.apache.coyote.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Service
public class HoaDonService {
    private static final Logger log = LoggerFactory.getLogger(HoaDonService.class);
    @Autowired
    private HoaDonRepository hoaDonRepository;

    @Autowired
    LichSuDatHangService lichSuDatHangService;

    public Page<HoaDon> findAllWithProps(
            Pageable pageable,
            List<ELoaiHoaDon> eLoaiHoaDons,
            List<ETrangThaiHoaDon> trangThaiHoaDons,
            LocalDateTime startDate,
            LocalDateTime endDate
    ) {
        if (startDate == null) {
            startDate = LocalDateTime.now().minusYears(100);
        }
        if (endDate == null) {
            endDate = LocalDateTime.now();
        }
        if (trangThaiHoaDons.isEmpty()) {
            trangThaiHoaDons = Arrays.asList(ETrangThaiHoaDon.values());
        }
        if (eLoaiHoaDons.isEmpty()) {
            eLoaiHoaDons = Arrays.asList(ELoaiHoaDon.values());
        }
        return hoaDonRepository.findAllByTrangThaiInAndLoaiHoaDonInAndCreateAtBetweenOrderByCreateAtDesc(trangThaiHoaDons, eLoaiHoaDons, startDate, endDate, pageable);
    }


    public HoaDon updateTranThaiHoaDon(int id, ETrangThaiHoaDon eTrangThaiHoaDon) throws BadRequestException {
        HoaDon hoaDon = hoaDonRepository.findById(id).orElseThrow(() -> new BadRequestException("Không tìm được hóa đơn"));
        hoaDon.setTrangThai(eTrangThaiHoaDon);
        hoaDonRepository.save(hoaDon);

        lichSuDatHangService.create(eTrangThaiHoaDon, hoaDon);
        return hoaDon;
    }
}
