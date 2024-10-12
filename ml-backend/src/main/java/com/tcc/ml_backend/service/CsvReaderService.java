package com.tcc.ml_backend.service;

import com.tcc.ml_backend.model.CyberAttack;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStreamReader;
import java.io.Reader;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CsvReaderService {

    public List<CyberAttack> readCsvFile(String fileName) {
        List<CyberAttack> attacks = new ArrayList<>();
        try {
            // Acessar o arquivo dentro da pasta resources
            ClassPathResource resource = new ClassPathResource(fileName);
            Reader reader = new InputStreamReader(resource.getInputStream());

            CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withHeader());
            for (CSVRecord csvRecord : csvParser) {
                CyberAttack attack = new CyberAttack(
                        csvRecord.get("id"),
                        csvRecord.get("attackType"),
                        csvRecord.get("sourceIp"),
                        csvRecord.get("destinationIp"),
                        LocalDateTime.parse(csvRecord.get("timestamp"))
                );
                attacks.add(attack);
            }
        } catch (Exception e) {
            e.printStackTrace();
            // Tratamento de exceção
        }
        return attacks;
    }
}
