package com.example.app.service.cronjob;

import com.example.app.service.PhieuGiamGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@EnableScheduling
public class Cronjob {
    @Autowired
    private PhieuGiamGiaService phieuGiamGiaService;

    @Scheduled(cron = "*/2 * * * * ?") // 2s  chayj laij 1 lan
    public void autoUpdateTrangThaiPhieuGiamGia() {
        try {
            phieuGiamGiaService.updateTrangThaiPhieuGiamGia();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
