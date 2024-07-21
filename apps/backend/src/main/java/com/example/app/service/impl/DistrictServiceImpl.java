package com.example.app.service.impl;

import com.example.app.entity.District;
import com.example.app.repository.DistrictRepository;
import com.example.app.service.DistrictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DistrictServiceImpl implements DistrictService {

    @Autowired
    private DistrictRepository districtRepository;


    @Override
    public List<District> getDistrictsByProvince(Integer provinceId) {
        return districtRepository.findByProvinceId(provinceId);
    }

    @Override
    public List<District> getAllDistrict() {
        return districtRepository.findAll();
    }
}
