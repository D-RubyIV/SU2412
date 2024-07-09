//package com.example.app.service.impl;
//
//import com.example.app.entity.DiaChiNhan;
//import com.example.app.repository.DiaChiNhanRepository;
//import com.example.app.service.DiaChiNhanService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class DiaChiNhanServiceImpl implements DiaChiNhanService {
//
//    @Autowired
//    private DiaChiNhanRepository diaChiNhanRepository;
//
//    @Override
//    public DiaChiNhan saveDiaChiNhan(DiaChiNhan diaChiNhan) {
//        return diaChiNhanRepository.save(diaChiNhan);
//    }
//
//    @Override
//    public Optional<DiaChiNhan> getDiaChiNhanById(Integer id) {
//        return diaChiNhanRepository.findById(id);
//    }
//
//    @Override
//    public List<DiaChiNhan> getAllDiaChiNhan() {
//        return diaChiNhanRepository.findAll();
//    }
//
//    @Override
//    public DiaChiNhan updateDiaChiNhan(Integer id, DiaChiNhan diaChiNhan) {
//        DiaChiNhan existingDiaChiNhan = diaChiNhanRepository.findById(id).orElseThrow(() -> new RuntimeException("DiaChiNhan not found"));
//        existingDiaChiNhan.setDiaChi(diaChiNhan.getDiaChi());
//        existingDiaChiNhan.setSoDienThoaiNhan(diaChiNhan.getSoDienThoaiNhan());
//        existingDiaChiNhan.setDeleted(diaChiNhan.getDeleted());
//        existingDiaChiNhan.setCreateBy(diaChiNhan.getCreateBy());
//        existingDiaChiNhan.setUpdateBy(diaChiNhan.getUpdateBy());
//        existingDiaChiNhan.setCreateAt(diaChiNhan.getCreateAt());
//        existingDiaChiNhan.setUpdateAt(diaChiNhan.getUpdateAt());
//        return diaChiNhanRepository.save(existingDiaChiNhan);
//    }
//
//    @Override
//    public void deleteDiaChiNhan(Integer id) {
//        diaChiNhanRepository.deleteById(id);
//    }
//}
