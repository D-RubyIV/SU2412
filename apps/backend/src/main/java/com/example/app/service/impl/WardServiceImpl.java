package com.example.app.service.impl;

import com.example.app.entity.Ward;
import com.example.app.repository.WardRepository;
import com.example.app.service.WardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WardServiceImpl implements WardService {

    @Autowired
    private WardRepository wardRepository;

    public List<Ward> getWardsByDistrict(Integer districtId) {
        return wardRepository.findByDistrictId(districtId);
    }

    @Override
    public List<Ward> getAllWard() {
        return wardRepository.findAll();
    }
}
