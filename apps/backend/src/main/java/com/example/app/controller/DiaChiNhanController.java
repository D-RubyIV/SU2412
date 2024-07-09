//package com.example.app.controller;
//
//import com.example.app.entity.DiaChiNhan;
//import com.example.app.service.DiaChiNhanService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//@CrossOrigin(origins = "http://localhost:5173/manage")
//@RestController
//@RequestMapping("/api/diachinhan")
//public class DiaChiNhanController {
//    @Autowired
//    private DiaChiNhanService diaChiNhanService;
//
//    @PostMapping
//    public ResponseEntity<DiaChiNhan> createDiaChiNhan(@RequestBody DiaChiNhan diaChiNhan) {
//        DiaChiNhan createdDiaChiNhan = diaChiNhanService.saveDiaChiNhan(diaChiNhan);
//        return ResponseEntity.ok(createdDiaChiNhan);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<DiaChiNhan> getDiaChiNhanById(@PathVariable Integer id) {
//        DiaChiNhan diaChiNhan = diaChiNhanService.getDiaChiNhanById(id).orElseThrow(() -> new RuntimeException("DiaChiNhan not found"));
//        return ResponseEntity.ok(diaChiNhan);
//    }
//
//    @GetMapping
//    public ResponseEntity<List<DiaChiNhan>> getAllDiaChiNhan() {
//        List<DiaChiNhan> diaChiNhanList = diaChiNhanService.getAllDiaChiNhan();
//        return ResponseEntity.ok(diaChiNhanList);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<DiaChiNhan> updateDiaChiNhan(@PathVariable Integer id, @RequestBody DiaChiNhan diaChiNhan) {
//        DiaChiNhan updatedDiaChiNhan = diaChiNhanService.updateDiaChiNhan(id, diaChiNhan);
//        return ResponseEntity.ok(updatedDiaChiNhan);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteDiaChiNhan(@PathVariable Integer id) {
//        diaChiNhanService.deleteDiaChiNhan(id);
//        return ResponseEntity.noContent().build();
//    }
//}
