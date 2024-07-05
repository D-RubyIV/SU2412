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
    Page<HoaDon> findAllByTrangThaiInAndLoaiHoaDonInAndCreateAtBetween(List<ETrangThaiHoaDon> statuses, List<ELoaiHoaDon> s2, LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
    Page<HoaDon> findAllByTrangThaiLike(ETrangThaiHoaDon status, Pageable pageable);
    Page<HoaDon> findAllByLoaiHoaDonLike(ELoaiHoaDon loaiHoaDon, Pageable pageable);
    Page<HoaDon> findAllByTrangThaiLikeAndLoaiHoaDonLike(ETrangThaiHoaDon trangThaiHoaDon, ELoaiHoaDon loaiHoaDon, Pageable pageable);
    Page<HoaDon> findAllByTrangThaiLikeAndLoaiHoaDonLikeAndCreateAtBetween(ETrangThaiHoaDon trangThaiHoaDon, ELoaiHoaDon loaiHoaDon, LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
    Page<HoaDon> findAllByCreateAtBetween(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
    Page<HoaDon> findAllByTrangThaiEqualsAndLoaiHoaDonEqualsAndCreateAtBetween(ETrangThaiHoaDon s1, ELoaiHoaDon s2, LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
}
