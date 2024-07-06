package com.example.app.model.response;

import com.example.app.entity.KhachHang;
import com.example.app.entity.PhieuGiamGia;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDateTime;
import java.util.List;

@Projection(types = {KhachHang.class, PhieuGiamGia.class})
public interface TestResponse {
    @Value("#{target.Id}")
    Integer getId();

    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.ten}")
    String getTen();

    @Value("#{target.thoiGianBatDau}")
    LocalDateTime getThoiGianBatDau();

    @Value("#{target.thoiGianKetThuc}")
    LocalDateTime getThoiGianKetThuc();

    @Value("#{target.trangThai}")
    String getTrangThai();

    @Value("#{target.soLuong}")
    Long getSoLuong();

    @Value("#{target.phanTramToiDa}")
    Integer getPhanTramToiDa();

    @Value("#{target.tongTienToiThieu}")
    Double getTongTienToiThieu();

    @Value("#{target.LoaiPhieu}")
    String getLoaiPhieu();

    @Value("#{target.idKhachHang}")
    List<KhachHang> getIdKhachHang();
}
