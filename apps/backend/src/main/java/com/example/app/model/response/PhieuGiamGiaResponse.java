package com.example.app.model.response;
import com.example.app.entity.KhachHang;
import com.example.app.entity.PhieuGiamGia;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDateTime;
//
//Các biểu thức SpEL phổ biến:
//
//        #{target.xxx}: Trả về giá trị của thuộc tính xxx trong entity.
//        #{target.xxx.yyy}: Truy xuất thuộc tính yyy của thuộc tính xxx trong entity.
//#{target.xxx + target.yyy}: Kết hợp giá trị của hai thuộc tính xxx và yyy.
//#{target.xxx > 0 ? 'Yes' : 'No'}: Điều kiện và trả về kết quả tương ứng.
//        Với SpEL, bạn có thể sử dụng các biểu thức phức tạp hơn để thực hiện các phép tính, xử lý logic, hoặc trích xuất dữ liệu từ nhiều thuộc tính khác nhau trong entity. Điều này giúp tăng tính linh hoạt và khả năng tái sử dụng của projection trong ứng dụng Spring Boot của bạn.

@Projection(types = {KhachHang.class, PhieuGiamGia.class})
public interface PhieuGiamGiaResponse {
    @Value("#{target.Id}")
    Integer getId();

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

    @Value("#{target.hoTen}")
    String getHoTen();

    @Value("#{target.email}")
    String getEmail();

    @Value("#{target.soDienThoai}")
    String getSoDienThoai();

}
