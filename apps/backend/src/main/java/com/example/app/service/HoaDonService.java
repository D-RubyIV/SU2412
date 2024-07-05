package com.example.app.service;

import com.example.app.entity.HoaDon;
import com.example.app.enums.ELoaiHoaDon;
import com.example.app.enums.ETrangThaiHoaDon;
import com.example.app.enums.ETrangThaiVanChuyen;
import com.example.app.repository.HoaDonRepository;
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

//        if (startDate != null && eLoaiHoaDon != null && eTrangThaiHoaDon != null){
//            if (endDate == null){
//                endDate = LocalDateTime.now();
//            }
//            Page<HoaDon> page = hoaDonRepository.findAllByTrangThaiLikeAndLoaiHoaDonLikeAndCreateAtBetween(eTrangThaiHoaDon, eLoaiHoaDon, startDate, endDate, pageable);
//            return page;
//        }
//        if (startDate != null ){
//            if (endDate == null){
//                endDate = LocalDateTime.now();
//            }
//            Page<HoaDon> page = hoaDonRepository.findAllByCreateAtBetween( startDate, endDate, pageable);
//            return page;
//        }
//
//        if (eLoaiHoaDon != null && eTrangThaiHoaDon != null){
//            Page<HoaDon> page = hoaDonRepository.findAllByTrangThaiLikeAndLoaiHoaDonLike(eTrangThaiHoaDon, eLoaiHoaDon, pageable);
//            return page;
//        }
//        if (eLoaiHoaDon != null){
//            Page<HoaDon> page = hoaDonRepository.findAllByLoaiHoaDonLike(eLoaiHoaDon, pageable);
//            return page;
//        }
//        else if (eTrangThaiHoaDon != null){
//            log.info("FIND BY TRANG THAI HOA DON");
//            Page<HoaDon> page = hoaDonRepository.findAllByTrangThaiEquals(eTrangThaiHoaDon, pageable);
//            return page;
//        }
//        else{
//            Page<HoaDon> page = hoaDonRepository.findAll(pageable);
//            return page;
//        }
//          return hoaDonRepository.findAllByTrangThaiEqualsAndLoaiHoaDonEqualsAndCreateAtBetween(eTrangThaiHoaDon, eLoaiHoaDon, startDate, endDate, pageable);

        if (trangThaiHoaDons.isEmpty()) {
            trangThaiHoaDons = Arrays.asList(ETrangThaiHoaDon.values());
        }
        if (eLoaiHoaDons.isEmpty()) {
            eLoaiHoaDons = Arrays.asList(ELoaiHoaDon.values());
        }
        return hoaDonRepository.findAllByTrangThaiInAndLoaiHoaDonInAndCreateAtBetween(trangThaiHoaDons, eLoaiHoaDons, startDate, endDate, pageable);
    }
}
