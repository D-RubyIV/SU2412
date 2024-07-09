//package com.example.app.service.impl;
//
//import com.example.app.entity.KhachHang;
//import com.example.app.entity.PhieuGiamGia;
//import com.example.app.model.request.PhieuGiamGiaRequest;
//import com.example.app.model.response.PhieuGiamGiaResponse;
//import com.example.app.repository.KhachHangRepository;
//import com.example.app.repository.PhieuGiamGiaRepository;
//import com.example.app.service.PhieuGiamGiaService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class PhieuGiamGiaServiceImpl implements PhieuGiamGiaService {
//
//    @Autowired
//    private PhieuGiamGiaRepository phieuGiamGiaRepository;
//
//    @Override
//    public PhieuGiamGia savePhieuGiamGia(PhieuGiamGia phieuGiamGia) {
//        return phieuGiamGiaRepository.save(phieuGiamGia);
//    }
//
//    @Override
//    public Optional<PhieuGiamGia> getPhieuGiamGiaById(Integer id) {
//        return phieuGiamGiaRepository.findById(id);
//    }
//
//    @Override
//    public List<PhieuGiamGia> getAllPhieuGiamGia() {
//        return phieuGiamGiaRepository.findAll();
//    }
//
//    @Override
//    public PhieuGiamGia updatePhieuGiamGia(Integer id, PhieuGiamGia phieuGiamGia) {
//        PhieuGiamGia existingPhieuGiamGia = phieuGiamGiaRepository.findById(id).orElseThrow(() -> new RuntimeException("PhieuGiamGia not found"));
//        existingPhieuGiamGia.setMa(phieuGiamGia.getMa());
//        existingPhieuGiamGia.setTen(phieuGiamGia.getTen());
//        existingPhieuGiamGia.setThoiGianBatDau(phieuGiamGia.getThoiGianBatDau());
//        existingPhieuGiamGia.setThoiGianKetThuc(phieuGiamGia.getThoiGianKetThuc());
//        existingPhieuGiamGia.setTrangThai(phieuGiamGia.getTrangThai());
//        existingPhieuGiamGia.setSoLuong(phieuGiamGia.getSoLuong());
//        existingPhieuGiamGia.setPhanTramToiDa(phieuGiamGia.getPhanTramToiDa());
//        existingPhieuGiamGia.setTongTienToiThieu(phieuGiamGia.getTongTienToiThieu());
//        existingPhieuGiamGia.setLoaiPhieu(phieuGiamGia.getLoaiPhieu());
//        existingPhieuGiamGia.setDeleted(phieuGiamGia.getDeleted());
//        existingPhieuGiamGia.setCreateBy(phieuGiamGia.getCreateBy());
//        existingPhieuGiamGia.setUpdateBy(phieuGiamGia.getUpdateBy());
//        existingPhieuGiamGia.setCreateAt(phieuGiamGia.getCreateAt());
//        existingPhieuGiamGia.setUpdateAt(phieuGiamGia.getUpdateAt());
//        return phieuGiamGiaRepository.save(existingPhieuGiamGia);
//    }
//
//
//    @Override
//    public void deletePhieuGiamGia(Integer id) {
//        phieuGiamGiaRepository.deleteById(id);
//    }
//}
