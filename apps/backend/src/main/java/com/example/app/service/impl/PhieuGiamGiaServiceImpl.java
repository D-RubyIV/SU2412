package com.example.app.service.impl;

import com.example.app.entity.KhachHang;
import com.example.app.entity.PhieuGiamGia;
import com.example.app.enums.TypePhieuGiamGia;
import com.example.app.exception.ApiException;
import com.example.app.exception.ErrorDetail;
import com.example.app.infrastructure.common.AutoGenCode;
import com.example.app.infrastructure.constant.PaginationConstant;
import com.example.app.infrastructure.converted.PhieuGiamGiaConvert;
import com.example.app.model.request.PhieuGiamGiaRequest;
import com.example.app.model.response.PageResponse;
import com.example.app.model.response.PhieuGiamGiaResponse;
import com.example.app.repository.KhachHangRepository;
import com.example.app.repository.PhieuGiamGiaRepository;
import com.example.app.service.PhieuGiamGiaService;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.servlet.View;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
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
    @Autowired
    private View error;

    @Override
    public List<PhieuGiamGiaResponse> getAll() {
        return phieuGiamGiaRepository.getAll();
    }

//    @Override
//    public PageResponse<PhieuGiamGiaResponse> getPagePhieuGiamGia(int page, int limit) {
//        Pageable pageable = PageRequest.of(page - 1, limit);
//        Page<PhieuGiamGiaResponse> phieuGiamGiaPage = phieuGiamGiaRepository.getPagePhieuGiamGia(pageable);
//
//        List<PhieuGiamGiaResponse> content = phieuGiamGiaPage.getContent();
//
//        return new PageResponse<>(
//                content,
//                phieuGiamGiaPage.getNumber() + 1,
//                phieuGiamGiaPage.getSize(),
//                phieuGiamGiaPage.getTotalElements(),
//                phieuGiamGiaPage.getTotalPages()
//        );
//    }
@Override
public PageResponse<PhieuGiamGiaResponse> getPagePhieuGiamGia(int page, int limit) {


    // Sử dụng Pageable với offset
    Pageable pageable = PageRequest.of(page - 1, limit);

    // Gọi repository với offset
    Page<PhieuGiamGiaResponse> phieuGiamGiaPage = phieuGiamGiaRepository.getPagePhieuGiamGia(pageable);

    List<PhieuGiamGiaResponse> content = phieuGiamGiaPage.getContent();

    return new PageResponse<>(
            content,
            phieuGiamGiaPage.getNumber() + 1,  // Số trang hiện tại
            phieuGiamGiaPage.getSize(),        // Kích thước trang
            phieuGiamGiaPage.getTotalElements(),  // Tổng số phần tử
            phieuGiamGiaPage.getTotalPages()     // Tổng số trang
    );
}

    @Override
    public PhieuGiamGiaResponse findPhieuGiamGiaById(Integer id) {
        Optional<PhieuGiamGiaResponse> phieuGiamGiaOptional = phieuGiamGiaRepository.findPhieuGiamGiaById(id);
        return phieuGiamGiaOptional.orElse(null);
    }


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
    @Override
    public PhieuGiamGia addPhieuGiamGia(PhieuGiamGiaRequest request) {

        if (request.getMa() == null || request.getMa().isEmpty()) {
            request.setMa(autoGenCode.generateUniqueCode());
        }

        PhieuGiamGia phieuGiamGia = phieuGiamGiaConvert.convertRequestToEntity(request);

        PhieuGiamGia phieuGiamGiaSave = phieuGiamGiaRepository.save(phieuGiamGia);

        updateTrangThai(phieuGiamGiaSave);

        if (phieuGiamGiaSave.getLoaiPhieu() == TypePhieuGiamGia.KhachHang) {
            if (request.getKhachHangs() != null && !request.getKhachHangs().isEmpty()) {
                List<String> tenKhachHangs = request.getKhachHangs();
                List<KhachHang> khachHangs = tenKhachHangs.stream()
                        .map(tenKhachHang -> {
                            Optional<KhachHang> khachHangOptional = khachHangRepository.findFirstByHoTen(tenKhachHang);
                            return khachHangOptional.orElseThrow(() ->
                                    new RuntimeException("KhachHang không tồn tại với tên: " + tenKhachHang));
                        })
                        .collect(Collectors.toList());

                phieuGiamGiaSave.setKhachHangs(new HashSet<>(khachHangs));
                // Save the updated PhieuGiamGia entity with KhachHangs
                phieuGiamGiaSave = phieuGiamGiaRepository.save(phieuGiamGiaSave);
            }
        }

        return phieuGiamGiaSave;
    }

    @Override
    public PhieuGiamGia updatePhieuGiamGia(Integer id, PhieuGiamGiaRequest request) {
        // viet lai api update
        List<ErrorDetail> errorDetails = new ArrayList<>();

        // Validation checks
        if (request.getTen().length() > 50) {
            errorDetails.add(new ErrorDetail("ten", "Tên Phiếu Giảm giá không được vượt quá 50 kí tự!"));
        }

        Optional<PhieuGiamGia> phieuGiamGiaOptional = phieuGiamGiaRepository.findById(id);
        if (phieuGiamGiaOptional.isEmpty()) {
            throw new RuntimeException("Không tìm thấy PhieuGiamGia với ID: " + id);
        }

        PhieuGiamGia phieuGiamGiaToUpdate = phieuGiamGiaOptional.get();

        if (!errorDetails.isEmpty()) {
            throw new ApiException("Validation failed", HttpStatus.BAD_REQUEST, errorDetails);
        }

        PhieuGiamGia phieuGiamGiaSave = phieuGiamGiaRepository.save(phieuGiamGiaConvert.convertRequestToEntity(id,request));
        if (phieuGiamGiaSave != null) {
            updateTrangThai(phieuGiamGiaToUpdate);
        }

        if (phieuGiamGiaSave.getLoaiPhieu() == TypePhieuGiamGia.KhachHang) {
            if (request.getKhachHangs() != null && !request.getKhachHangs().isEmpty()) {
                List<String> tenKhachHangs = request.getKhachHangs();
                List<KhachHang> khachHangs = tenKhachHangs.stream()
                        .map(tenKhachHang -> {
                            Optional<KhachHang> khachHangOptional = khachHangRepository.findFirstByHoTen(tenKhachHang);
                            return khachHangOptional.orElseThrow(() ->
                                    new RuntimeException("KhachHang không tồn tại với tên: " + tenKhachHang));
                        })
                        .collect(Collectors.toList());

                phieuGiamGiaSave.setKhachHangs(new HashSet<>(khachHangs));
                // Save the updated PhieuGiamGia entity with KhachHangs
                phieuGiamGiaSave = phieuGiamGiaRepository.save(phieuGiamGiaSave);
            }
        } else {
            // If the voucher is not for specific customers, clear any existing customers
            phieuGiamGiaSave.setKhachHangs(Collections.emptySet());
            phieuGiamGiaRepository.save(phieuGiamGiaSave);
        }

        return phieuGiamGiaSave;
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

    @Override
    public void deletePhieuGiamGia(Integer id) {
        Optional<PhieuGiamGia> phieuGiamGiaOptional = phieuGiamGiaRepository.findById(id);
        if (phieuGiamGiaOptional.isEmpty()) {
            throw new RuntimeException("Không tìm thấy PhieuGiamGia với ID: " + id);
        }

        PhieuGiamGia phieuGiamGiaToUpdate = phieuGiamGiaOptional.get();

        phieuGiamGiaToUpdate.setDeleted(true);

        phieuGiamGiaRepository.save(phieuGiamGiaToUpdate);
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
