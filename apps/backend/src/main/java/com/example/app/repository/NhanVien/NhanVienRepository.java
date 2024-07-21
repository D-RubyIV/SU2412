package com.example.app.repository.NhanVien;

import com.example.app.entity.NhanVien;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NhanVienRepository extends JpaRepository<NhanVien, Integer> {
    Optional<NhanVien> findById(Integer id);
    @Query("SELECT nv FROM NhanVien nv WHERE " +
            "(:keyword IS NULL OR " +
            "nv.hoTen LIKE %:keyword% OR " +
            "nv.soDienThoai LIKE %:keyword% OR " +
            "nv.ma LIKE %:keyword% OR " +
            "nv.email LIKE %:keyword% OR " +
            "nv.trangThai LIKE %:keyword% OR " +
            "nv.cccd LIKE %:keyword%) AND " +
            "(:hoTen IS NULL OR nv.hoTen LIKE %:hoTen%) AND " +
            "(:sdt IS NULL OR nv.soDienThoai LIKE %:sdt%) AND " +
            "(:ma IS NULL OR nv.ma LIKE %:ma%) AND " +
            "(:email IS NULL OR nv.email LIKE %:email%) AND " +
            "(:trangThai IS NULL OR nv.trangThai = :trangThai) AND " +
            "(:cccd IS NULL OR nv.cccd LIKE %:cccd%) " +
            "ORDER BY nv.createdAt DESC")  // Sắp xếp theo ngày tạo mới nhất lên đầu
    Page<NhanVien> searchNhanVien(@Param("keyword") String keyword,
                                  @Param("hoTen") String hoTen,
                                  @Param("sdt") String sdt,
                                  @Param("ma") String ma,
                                  @Param("email") String email,
                                  @Param("trangThai") String trangThai,
                                  @Param("cccd") String cccd,
                                  Pageable pageable);



}
