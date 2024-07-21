package com.example.app.service;

import com.example.app.entity.NhanVien;
import com.example.app.repository.NhanVien.NhanVienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NhanVienService {

    private final NhanVienRepository nhanVienRepository;

    @Autowired
    public NhanVienService(NhanVienRepository nhanVienRepository) {
        this.nhanVienRepository = nhanVienRepository;
    }

    public Page<NhanVien> searchNhanVien(String keyword, String hoTen, String sdt, String ma, String email, String trangThai, String cccd, int limit, int offset) {
        Pageable pageable = PageRequest.of(offset / limit, limit); // offset / limit = số trang hiện tại
        return nhanVienRepository.searchNhanVien(keyword, hoTen, sdt, ma, email, trangThai, cccd, pageable);
    }

    public Page<NhanVien> getAllStaffs(int limit, int offset) {
        return nhanVienRepository.findAll(PageRequest.of(offset, limit));
    }



    public Optional<NhanVien> getStaffById(Integer id) {
        return nhanVienRepository.findById(id);
    }
    public NhanVien createNhanVien(NhanVien nhanVien) {
        nhanVien.setCreatedAt(LocalDateTime.now());
        return nhanVienRepository.save(nhanVien);
    }

//    public NhanVien createStaff(NhanVien nhanVien) {
//        return nhanVienRepository.save(nhanVien);
//    }

    public NhanVien updateStaff(Integer id, NhanVien nhanVien) {
        nhanVien.setId(id);
        return nhanVienRepository.save(nhanVien);
    }

    public void deleteStaff(Integer id) {
        // Tìm nhân viên theo ID
        Optional<NhanVien> optionalNhanVien = nhanVienRepository.findById(id);

        if (optionalNhanVien.isPresent()) {
            NhanVien nhanVien = optionalNhanVien.get();
            // Thay đổi trạng thái của nhân viên từ "active" sang "inactive"
            nhanVien.setTrangThai("inactive");
            nhanVienRepository.save(nhanVien);
        } else {
            throw new RuntimeException("Nhân viên không tồn tại với ID: " + id);
        }
    }


//    public void deleteStaff(Integer id) {
//        nhanVienRepository.deleteById(id);
//    }
}
