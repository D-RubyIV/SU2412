package com.example.app.service;

import com.example.app.entity.District;
import com.example.app.entity.Ward;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

public interface WardService {

    List<Ward> getAllWard();

    List<Ward> getWardsByDistrict(@PathVariable Integer districtId);

}

