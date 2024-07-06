package com.example.app.repository;

import com.example.app.entity.PhieuGiamGia;
import com.example.app.model.response.PhieuGiamGiaResponse;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PhieuGiamGiaRepository extends JpaRepository<PhieuGiamGia,Integer> {

    @Query(value = """
                SELECT 
                    pgg.id as 'id',
                    pgg.ma as 'ma',
                    pgg.ten as 'ten',
                    pgg.loaiPhieu as 'loaiPhieu' , 
                    pgg.soLuong as 'soLuong' , 
                      pgg.trangThai ,
                    pgg.thoiGianBatDau ,pgg.thoiGianKetThuc ,pgg.tongTienToiThieu,
                    pgg.phanTramToiDa  ,
                     kh.hoTen as 'hoTen',kh.email as 'email' , kh.soDienThoai as 'soDienThoai' 
                FROM
                    phieu_giam_gia AS pgg
                LEFT JOIN
                    phieu_giam_gia_khach_hang AS pgh ON pgg.id = pgh.phieu_giam_gia_id
                LEFT JOIN
                    khach_hang AS kh ON pgh.khach_hang_id = kh.id;
            """,nativeQuery = true)
    List<PhieuGiamGiaResponse> getAll();

//    @Query(value = """
//    SELECT
//        pgg.id as id,
//        pgg.ma as ma,
//        pgg.ten as ten,
//        pgg.loaiPhieu as loaiPhieu,
//        pgg.soLuong as soLuong,
//        pgg.trangThai,
//        pgg.thoiGianBatDau,
//        pgg.thoiGianKetThuc,
//        pgg.tongTienToiThieu,
//        pgg.phanTramToiDa,
//        kh.hoTen as hoTen,
//        kh.email as email,
//        kh.soDienThoai as soDienThoai
//    FROM
//        phieu_giam_gia AS pgg
//    LEFT JOIN
//        phieu_giam_gia_khach_hang AS pgh ON pgg.id = pgh.phieu_giam_gia_id
//    LEFT JOIN
//        khach_hang AS kh ON pgh.khach_hang_id = kh.id
//    WHERE
//        pgg.id = :id
//    """, nativeQuery = true)
//    Optional<PhieuGiamGiaResponse> findPhieuGiamGiaById(@Param("id") Integer id);

        Optional<PhieuGiamGia> findPhieuGiamGiaById(Integer id);


    @Query(value = "DELETE FROM phieu_giam_gia WHERE id = :id", nativeQuery = true)
    @Modifying
    @Transactional
    void deletePhieuGiamGiaByIdNativeQuery(Integer id);

}
