package com.example.investfish.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow requests from Next.js frontend during dev
public class StockAnalysisController {

    @PostMapping("/analyze")
    public ResponseEntity<Map<String, Object>> analyzeStocks(@RequestBody Map<String, Object> request) {
        String profileName = (String) request.getOrDefault("profileName", "General Market");
        
        // In a real scenario, this is where we would dispatch our TinyFish Agent or 
        // call an LLM to read historical financial data, SEC filings, and news from the live web.
        
        // Simulating the 3-second autonomous extraction and analysis latency
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        List<Map<String, Object>> recommendations = new ArrayList<>();

        if (profileName.contains("Tech")) {
            recommendations.add(createStockRecord("NVDA", "NVIDIA Corp", "Buy", "Strong AI infrastructure demand; consistent beat on earnings over the last 4 quarters.", "$850.20"));
            recommendations.add(createStockRecord("MSFT", "Microsoft", "Buy", "Cloud revenue growth remains robust; successful AI integration across product suite.", "$410.50"));
            recommendations.add(createStockRecord("INTC", "Intel", "Hold", "Turnaround strategy ongoing; historical performance shows significant volatility.", "$42.10"));
        } else if (profileName.contains("Healthcare")) {
            recommendations.add(createStockRecord("LLY", "Eli Lilly", "Buy", "GLP-1 market dominance providing record-breaking historical revenue jumps.", "$750.80"));
            recommendations.add(createStockRecord("JNJ", "Johnson & Johnson", "Hold", "Stable dividend history but facing slower growth in pharmaceutical pipeline.", "$155.30"));
        } else {
            recommendations.add(createStockRecord("AAPL", "Apple Inc.", "Hold", "Historical hardware cycles showing fatigue; waiting for next supercycle.", "$170.15"));
            recommendations.add(createStockRecord("BRK.B", "Berkshire Hathaway", "Buy", "Ultimate defensive stock with virtually unmatched historical cash accumulation.", "$405.00"));
            recommendations.add(createStockRecord("TSLA", "Tesla Inc.", "Hold", "Historical pricing power waning amid EV pricing wars and margin compression.", "$175.40"));
        }

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "InvestFish Agent successfully audited historical data for " + profileName);
        response.put("data", recommendations);

        return ResponseEntity.ok(response);
    }

    private Map<String, Object> createStockRecord(String ticker, String name, String recommendation, String rationale, String currentPrice) {
        Map<String, Object> record = new HashMap<>();
        record.put("id", UUID.randomUUID().toString());
        record.put("ticker", ticker);
        record.put("name", name);
        record.put("recommendation", recommendation);
        record.put("rationale", rationale);
        record.put("currentPrice", currentPrice);
        
        // Create a fake historical confidence score based on the recommendation
        int score = recommendation.equals("Buy") ? 85 + new Random().nextInt(15) : 50 + new Random().nextInt(20);
        record.put("confidenceScore", score + "%");
        
        return record;
    }
}
