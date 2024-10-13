package com.tcc.ml_backend.service;

import com.tcc.ml_backend.model.CyberAttack;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CsvReaderService {

    public List<CyberAttack> readCsvFile(String fileName) {
        List<CyberAttack> attacks = new ArrayList<>();
        try {
            Reader reader = Files.newBufferedReader(Path.of(fileName));
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
        } catch (IOException e) {
            e.printStackTrace();
            // Tratamento de exceção apropriado
        }
        return attacks;
    }
}
