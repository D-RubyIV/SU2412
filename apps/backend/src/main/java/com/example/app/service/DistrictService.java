package com.example.app.service;

import com.example.app.entity.District;
import com.example.app.entity.Province;

import java.util.List;
import java.util.Optional;

public interface DistrictService {

    District saveDistrict(District district);

    Optional<District> getDistrictById(Integer id);

    List<District> getAllDistrict();

    List<District> getDistrictsByProvince(Integer provinceId);
}
