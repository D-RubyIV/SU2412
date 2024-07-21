package com.example.app.service.impl;

import com.example.app.entity.Province;
import com.example.app.repository.ProvinceRepository;
import com.example.app.service.ProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProvinceServiceImpl implements ProvinceService {

    @Autowired
    private ProvinceRepository provinceRepository;


    @Override
    public Optional<Province> getProvinceById(Integer id) {
        return provinceRepository.findById(id);
    }

    @Override
    public List<Province> getAllProvince() {
        return provinceRepository.findAll();
    }
}
