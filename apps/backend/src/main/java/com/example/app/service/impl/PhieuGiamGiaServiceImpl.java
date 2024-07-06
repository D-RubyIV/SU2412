package com.example.app.service.impl;

import com.example.app.entity.KhachHang;
import com.example.app.entity.PhieuGiamGia;
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
    @Override
    public PhieuGiamGia findPhieuGiamGiaById(Integer id) {
        Optional<PhieuGiamGia> phieuGiamGiaOptional = phieuGiamGiaRepository.findPhieuGiamGiaById(id);
        return phieuGiamGiaOptional.orElse(null);
    }

//    @Override
//    public PhieuGiamGia addPhieuGiamGia(PhieuGiamGiaRequest request) {
//
//
////        Optional<KhachHang> khachHangOptional = khachHangRepository.findFirstByHoTen(request.getKhachHang());
////        if (khachHangOptional.isEmpty()) {
////            throw new RuntimeException("KhachHang không tồn tại với tên: " + request.getKhachHang());
////        }
////        KhachHang khachHang = khachHangOptional.get();
//        // Tạo danh sách khách hàng từ tên được cung cấp
//        List<String> tenKhachHangs = request.getKhachHangs();
//        List<KhachHang> khachHangs = tenKhachHangs.stream()
//                .map(tenKhachHang -> {
//                    Optional<KhachHang> khachHangOptional = khachHangRepository.findFirstByHoTen(tenKhachHang);
//                    return khachHangOptional.orElseThrow(() ->
//                            new RuntimeException("KhachHang không tồn tại với tên: " + tenKhachHang));
//                })
//                .collect(Collectors.toList());
//
////        // Khởi tạo HashSet rỗng
////        Set<KhachHang> khachHangSet = new HashSet<>();
////
////        // Thêm khachHang vào HashSet
////        khachHangSet.add(khachHang);
//
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
////                .khachHangs(new HashSet<>(Set.of(khachHangs)))
//                .build();
//        phieuGiamGiaRepository.save(phieuGiamGia);
//        return null;
//    }



    @Override
    public PhieuGiamGia addPhieuGiamGia(PhieuGiamGiaRequest request) {
        List<String> tenKhachHangs = request.getKhachHangs();
        List<KhachHang> khachHangs = tenKhachHangs.stream()
                .map(tenKhachHang -> {
                    Optional<KhachHang> khachHangOptional = khachHangRepository.findFirstByHoTen(tenKhachHang);
                    return khachHangOptional.orElseThrow(() ->
                            new RuntimeException("KhachHang không tồn tại với tên: " + tenKhachHang));
                })
                .collect(Collectors.toList());

        PhieuGiamGia phieuGiamGia = PhieuGiamGia.builder()
                .ten(request.getTen())
                .ma(request.getMa())
                .soLuong(request.getSoLuong())
                .trangThai(request.getTrangThai())
                .phanTramToiDa(request.getPhanTramToiDa())
                .thoiGianKetThuc(request.getThoiGianKetThuc())
                .thoiGianBatDau(request.getThoiGianBatDau())
                .loaiPhieu(request.getLoaiPhieu())
                .khachHangs(new HashSet<>(khachHangs))
                .build();

        phieuGiamGiaRepository.save(phieuGiamGia);
        return phieuGiamGia; // Return the saved entity if needed
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




}
