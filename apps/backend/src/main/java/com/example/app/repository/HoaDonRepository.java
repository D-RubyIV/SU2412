package com.example.app.repository;

import com.example.app.entity.HoaDon;
import com.example.app.enums.ELoaiHoaDon;
import com.example.app.enums.ETrangThaiHoaDon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface HoaDonRepository extends JpaRepository<HoaDon, Integer> {
    Page<HoaDon> findAllByTrangThaiInAndLoaiHoaDonInAndGiaoHangInAndCreateAtBetweenOrderByCreateAtDesc(List<ETrangThaiHoaDon> statuses, List<ELoaiHoaDon> s2, List<Boolean> s3, LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
}
