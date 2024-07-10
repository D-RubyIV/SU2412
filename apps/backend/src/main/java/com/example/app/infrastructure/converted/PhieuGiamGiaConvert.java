package com.example.app.infrastructure.converted;

import com.example.app.entity.PhieuGiamGia;
import com.example.app.model.request.PhieuGiamGiaRequest;
import com.example.app.repository.PhieuGiamGiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class PhieuGiamGiaConvert {

    @Autowired
    private PhieuGiamGiaRepository phieuGiamGiaRepository;

    public PhieuGiamGia convertRequestToEntity(PhieuGiamGiaRequest request) {
        return PhieuGiamGia.builder()
                .ten(request.getTen())
                .ma(request.getMa())
                .soLuong(request.getSoLuong())
                .trangThai(request.getTrangThai())
                .phanTramToiDa(request.getPhanTramToiDa())
                .tongTienToiThieu(request.getTongTienToiThieu())
                .thoiGianKetThuc(request.getThoiGianKetThuc())
                .thoiGianBatDau(request.getThoiGianBatDau())
                .loaiPhieu(request.getLoaiPhieu())
                .build();
    }


    public PhieuGiamGia convertRequestToEntity(Integer id,PhieuGiamGiaRequest request) {
        Optional<PhieuGiamGia> optionalPhieuGiamGia = phieuGiamGiaRepository.findById(id);

        if (optionalPhieuGiamGia.isEmpty()) {
            throw new RuntimeException("Không tìm thấy PhieuGiamGia với ID: " + id);
        }

        PhieuGiamGia phieuGiamGia = optionalPhieuGiamGia.get();

        phieuGiamGia.setTen(request.getTen());
        phieuGiamGia.setMa(request.getMa());
        phieuGiamGia.setSoLuong(request.getSoLuong());
        phieuGiamGia.setTrangThai(request.getTrangThai());
        phieuGiamGia.setPhanTramToiDa(request.getPhanTramToiDa());
        phieuGiamGia.setThoiGianKetThuc(request.getThoiGianKetThuc());
        phieuGiamGia.setThoiGianBatDau(request.getThoiGianBatDau());
        phieuGiamGia.setLoaiPhieu(request.getLoaiPhieu());

        return phieuGiamGia;

    }

}
