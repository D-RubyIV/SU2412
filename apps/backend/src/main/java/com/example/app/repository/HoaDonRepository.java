package com.example.app.repository;

import com.example.app.entity.HoaDon;
import com.example.app.enums.ELoaiHoaDon;
import com.example.app.enums.ETrangThaiHoaDon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface HoaDonRepository extends JpaRepository<HoaDon, Integer> {
    @Query("SELECT h FROM HoaDon h WHERE h.trangThai IN :statuses " +
            "AND h.loaiHoaDon IN :s2 " +
            "AND h.createAt BETWEEN :startDate AND :endDate " +
            "AND h.tongTien between :sMoney and :eMoney " +
            "AND CONCAT(h.ma, ' ', h.loaiHoaDon, ' ', h.khachHang.ma, ' ', h.khachHang.hoTen, ' ', h.nhanVien.ma) LIKE %:key% " +
            "ORDER BY h.createAt DESC")
    Page<HoaDon> findAllByCustomQuery(@Param("statuses") List<ETrangThaiHoaDon> statuses,
                                      @Param("s2") List<ELoaiHoaDon> s2,
                                      @Param("startDate") LocalDateTime startDate,
                                      @Param("endDate") LocalDateTime endDate,
                                      @Param("key") String key,
                                      @Param("sMoney") Double sMoney,
                                      @Param("eMoney") Double eMoney,
                                      Pageable pageable);


}
