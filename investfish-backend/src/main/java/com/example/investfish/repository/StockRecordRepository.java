package com.example.investfish.repository;

import com.example.investfish.model.StockRecord;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRecordRepository extends MongoRepository<StockRecord, String> {
}
