package com.example.app.service;

import com.example.app.entity.HoaDon;
import com.example.app.enums.ELoaiHoaDon;
import com.example.app.enums.ETrangThaiHoaDon;
import com.example.app.repository.HoaDonRepository;
import org.apache.coyote.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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
            LocalDateTime endDate,
            Double sMoney,
            Double eMoney,
            String key
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


        System.out.println("key: " + key);
        return hoaDonRepository.findAllByCustomQuery(trangThaiHoaDons, eLoaiHoaDons, startDate, endDate, key, sMoney, eMoney, pageable);
    }

    public HoaDon updateTranThaiHoaDon(int id, ETrangThaiHoaDon eTrangThaiHoaDon, String note) throws BadRequestException {
        System.out.println("NOte" + note);

        HoaDon hoaDon = hoaDonRepository.findById(id).orElseThrow(() -> new BadRequestException("Không tìm được hóa đơn"));
        hoaDon.setTrangThai(eTrangThaiHoaDon);
        hoaDonRepository.save(hoaDon);

        lichSuDatHangService.create(eTrangThaiHoaDon, hoaDon, note);
        return hoaDon;
    }
}
