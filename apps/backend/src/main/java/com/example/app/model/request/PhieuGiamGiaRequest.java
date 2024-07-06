package com.example.app.model.request;

import com.example.app.entity.KhachHang;
import com.example.app.enums.TypePhieuGiamGia;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PhieuGiamGiaRequest {

    @NotNull(message = "Không được để trống mã!")
    private String ma;

    @NotNull(message = "Không được để trống tên phiếu giảm giá!")
    //    @Pattern(regexp = "#(^\\d{4}/(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])$)", message = "Không đúng dịnh dạng!")
    private String ten;

    @NotNull(message = "Không được để trống ngày bắt đầu!")
    private LocalDateTime thoiGianBatDau;

    @NotNull(message = "Không được để trống ngày kết thúc!")
    private LocalDateTime thoiGianKetThuc;

    @NotNull(message = "Không được để trống trạng thái")
    private String trangThai;

    @NotNull(message = "Không được để trống số lượng!")
    private Long soLuong;

    @NotNull(message = "Không được để trống phần trăm tối đa ")
    private Integer phanTramToiDa;

    @NotNull(message = "Không được để trống tổng tien tối thiểu!")
    private Double tongTienToiThieu;

    @NotNull(message = "Vui Lòng chọn loại phiếu")
    private TypePhieuGiamGia loaiPhieu;

    private Boolean deleted = false;

    @NotNull(message = "Vui lòng chọn ít nhất một khách hàng")
    private List<String> khachHangs;
}
