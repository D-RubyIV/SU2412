package com.example.app.service;

import com.example.app.entity.KhachHang;
import com.example.app.entity.Province;

import java.util.List;
import java.util.Optional;

public interface ProvinceService {

    Province saveProvince(Province province);

    Optional<Province> getProvinceById(Integer id);

    List<Province> getAllProvince();
}
