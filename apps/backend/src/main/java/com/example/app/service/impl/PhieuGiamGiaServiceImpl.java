package com.example.app.service.impl;

import com.example.app.entity.KhachHang;
import com.example.app.entity.PhieuGiamGia;
import com.example.app.enums.TypePhieuGiamGia;
import com.example.app.infrastructure.common.AutoGenCode;
import com.example.app.infrastructure.converted.PhieuGiamGiaConvert;
import com.example.app.model.request.PhieuGiamGiaRequest;
import com.example.app.model.response.PhieuGiamGiaResponse;
import com.example.app.repository.KhachHangRepository;
import com.example.app.repository.PhieuGiamGiaRepository;
import com.example.app.service.PhieuGiamGiaService;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class PhieuGiamGiaServiceImpl implements PhieuGiamGiaService {

    @Autowired
    private PhieuGiamGiaRepository phieuGiamGiaRepository;

    @Autowired
    private KhachHangRepository khachHangRepository;

    @Autowired
    private PhieuGiamGiaConvert phieuGiamGiaConvert;

    @Autowired
    private AutoGenCode autoGenCode;

    @Override
    public List<PhieuGiamGiaResponse> getAll() {
        return phieuGiamGiaRepository.getAll();
    }

    @Override
    public PhieuGiamGia findPhieuGiamGiaById(Integer id) {
        Optional<PhieuGiamGia> phieuGiamGiaOptional = phieuGiamGiaRepository.findPhieuGiamGiaById(id);
        return phieuGiamGiaOptional.orElse(null);
    }


    @Override
    public PhieuGiamGia addPhieuGiamGia(PhieuGiamGiaRequest request) {
//        List<String> tenKhachHangs = request.getKhachHangs();
//        List<KhachHang> khachHangs = tenKhachHangs.stream()
//                .map(tenKhachHang -> {
//                    Optional<KhachHang> khachHangOptional = khachHangRepository.findFirstByHoTen(tenKhachHang);
//                    return khachHangOptional.orElseThrow(() ->
//                            new RuntimeException("KhachHang không tồn tại với tên: " + tenKhachHang));
//                })
//                .collect(Collectors.toList());
//
//        PhieuGiamGia phieuGiamGia = PhieuGiamGia.builder()
//                .ten(request.getTen())
//                .ma(request.getMa())
//                .soLuong(request.getSoLuong())
//                .trangThai(request.getTrangThai())
//                .phanTramToiDa(request.getPhanTramToiDa())
//                .thoiGianKetThuc(request.getThoiGianKetThuc())
//                .thoiGianBatDau(request.getThoiGianBatDau())
//                .loaiPhieu(request.getLoaiPhieu())
//                .khachHangs(new HashSet<>(khachHangs))
//                .build();
//
//        phieuGiamGiaRepository.save(phieuGiamGia);
//        return phieuGiamGia; // Return the saved entity if needed
        request.setMa(autoGenCode.generateUniqueCode());
        PhieuGiamGia phieuGiamGia = phieuGiamGiaConvert.convertRequestToEntity(request);
        PhieuGiamGia phieuGiamGiaSave = phieuGiamGiaRepository.save(phieuGiamGia);
        updateTrangThai(phieuGiamGiaSave);
        if (phieuGiamGiaSave.getLoaiPhieu() == TypePhieuGiamGia.KhachHang) {
            if (!request.getKhachHangs().isEmpty()) {
                List<String> tenKhachHangs = request.getKhachHangs();
                List<KhachHang> khachHangs = tenKhachHangs.stream()
                        .map(tenKhachHang -> {
                            Optional<KhachHang> khachHangOptional = khachHangRepository.findFirstByHoTen(tenKhachHang);
                            return khachHangOptional.orElseThrow(() ->
                                    new RuntimeException("KhachHang không tồn tại với tên: " + tenKhachHang));
                        })
                        .collect(Collectors.toList());

                phieuGiamGiaSave.setKhachHangs(new HashSet<>(khachHangs));
            }
        }
        return phieuGiamGia;
    }

    @Override
    public PhieuGiamGia updatePhieuGiamGia(Integer id, PhieuGiamGiaRequest request) {
        Optional<PhieuGiamGia> phieuGiamGiaOptional = phieuGiamGiaRepository.findPhieuGiamGiaById(id);
        if (phieuGiamGiaOptional.isEmpty()) {
            throw new RuntimeException("Không tìm thấy PhieuGiamGia với ID: " + id);
        }

        PhieuGiamGia phieuGiamGia = phieuGiamGiaOptional.get();

        phieuGiamGia.setTen(request.getTen());
        phieuGiamGia.setMa(request.getMa());
        phieuGiamGia.setSoLuong(request.getSoLuong());
        phieuGiamGia.setTrangThai(request.getTrangThai());
        phieuGiamGia.setPhanTramToiDa(request.getPhanTramToiDa());
        phieuGiamGia.setThoiGianKetThuc(request.getThoiGianKetThuc());
        phieuGiamGia.setThoiGianBatDau(request.getThoiGianBatDau());
        phieuGiamGia.setLoaiPhieu(request.getLoaiPhieu());

        phieuGiamGiaRepository.save(phieuGiamGia);

        return phieuGiamGia;
    }

    @Override
    public List<PhieuGiamGia> getAllVer2() {
        return phieuGiamGiaRepository.findAll();
    }

    @Override
    public void updateTrangThaiPhieuGiamGia() {
        LocalDateTime currentDate = LocalDateTime.now();
        List<PhieuGiamGia> phieuGiamGias = phieuGiamGiaRepository.findAll();
        for (PhieuGiamGia phieuGiamGia : phieuGiamGias) {
            LocalDateTime startDate = phieuGiamGia.getThoiGianBatDau();
            LocalDateTime endDate = phieuGiamGia.getThoiGianKetThuc();

            if (phieuGiamGia.getSoLuong() == 0) {
                phieuGiamGia.setTrangThai("Đã kết thúc");
            } else {
                if (phieuGiamGia.getSoLuong() > 0) {
                    phieuGiamGia.setTrangThai("Đang diễn ra");
                }
                if (currentDate.isBefore(startDate)) {
                    phieuGiamGia.setTrangThai("Chưa bắt đầu");
                } else if (currentDate.isAfter(startDate) && currentDate.isBefore(endDate)) {
                    phieuGiamGia.setTrangThai("Đang diễn ra");
                } else {
                    phieuGiamGia.setTrangThai("Đã kết thúc");
                }

                if (endDate.isEqual(startDate)) {
                    phieuGiamGia.setTrangThai("Đã kết thúc");
                }
            }
            phieuGiamGiaRepository.save(phieuGiamGia);
        }
    }

    public void updateTrangThai(PhieuGiamGia phieuGiamGia) {
        LocalDateTime currentDate = LocalDateTime.now();
        LocalDateTime startDate = phieuGiamGia.getThoiGianBatDau();
        LocalDateTime endDate = phieuGiamGia.getThoiGianKetThuc();

        if (currentDate.isBefore(startDate)) {
            phieuGiamGia.setTrangThai("Chưa bắt đầu");
        } else if (currentDate.isAfter(startDate) && currentDate.isBefore(endDate)) {
            phieuGiamGia.setTrangThai("Đang diễn ra");
        } else {
            phieuGiamGia.setTrangThai("Đã kết thúc");
        }
        phieuGiamGiaRepository.save(phieuGiamGia);
    }


}
