package com.example.app.infrastructure.common;

import org.springframework.stereotype.Component;
import java.util.UUID;

@Component
public class AutoGenCode {

    public String generateUniqueCode() {

        String uuidPart = UUID.randomUUID().toString().split("-")[0]; // Sử dụng phần đầu tiên của UUID
        return "VOUCHER-" + uuidPart;
    }

}
