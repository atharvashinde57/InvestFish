package com.example.investfish.controller;

import com.example.investfish.model.StockRecord;
import com.example.investfish.repository.StockRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.text.DecimalFormat;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow requests from Next.js frontend
public class StockAnalysisController {

    private final StockRecordRepository repository;
    private static final DecimalFormat df = new DecimalFormat("0.00");

    @Autowired
    public StockAnalysisController(StockRecordRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/analyze")
    public ResponseEntity<Map<String, Object>> analyzeStocks(@RequestBody Map<String, Object> request) {
        String profileName = (String) request.getOrDefault("profileName", "General Market");
        
        // Simulating the 3-second autonomous extraction and analysis latency
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        List<StockRecord> recommendations = new ArrayList<>();
        
        // Define base tickers per sector to generate realistic looking data
        String[] techTickers = {"AAPL", "MSFT", "GOOGL", "AMZN", "META", "NVDA", "TSLA", "TSM", "AVGO", "ORCL", "CSCO", "CRM", "AMD", "INTC", "QCOM", "TXN", "ADBE", "IBM", "NOW", "AMAT", "UBER", "INTU", "MU", "SNPS", "PANW"};
        String[] healthTickers = {"LLY", "UNH", "JNJ", "MRK", "ABBV", "TMO", "DHR", "ISRG", "SYK", "VRTX", "REGN", "ZTS", "BSX", "MDT", "CI", "ELV", "CVS", "BDX", "MCK", "HUM", "IQV", "COR", "EW", "DXCM", "A"}, 
        financeTickers = {"JPM", "V", "MA", "BAC", "WFC", "SPGI", "AXP", "MS", "GS", "BLK", "C", "CME", "SCHW", "MMC", "CB", "PGR", "FI", "PYPL", "ICE", "USB", "PNC", "TFC", "COF", "AON", "MCO"};
        String[] energyTickers = {"XOM", "CVX", "COP", "SLB", "EOG", "OXY", "MPC", "PSX", "VLO", "WMB", "KMI", "HAL", "BKR", "HES", "DVN", "CTRA", "TRGP", "FANG", "MRO", "EQT", "OKE", "CNQ", "SU", "ENB", "TRP"};

        String[] selectedTickers;
        if (profileName.contains("Tech")) {
            selectedTickers = techTickers;
        } else if (profileName.contains("Healthcare")) {
            selectedTickers = healthTickers;
        } else if (profileName.contains("Finance")) {
            selectedTickers = financeTickers;
        } else if (profileName.contains("Energy")) {
            selectedTickers = energyTickers;
        } else {
            selectedTickers = new String[]{"AAPL", "JPM", "XOM", "LLY", "V", "MSFT", "JNJ", "CVX", "WMT", "PG", "MA", "HD", "COST", "MRK", "ABBV", "KO", "PEP", "BAC", "TMO", "MCD", "CSCO", "ACN", "LIN", "NFLX", "DIS"};
        }

        Random random = new Random();

        for (String ticker : selectedTickers) {
            double basePrice = 50 + (400 * random.nextDouble());
            String rec = random.nextDouble() > 0.5 ? "Buy" : (random.nextDouble() > 0.5 ? "Hold" : "Sell");
            
            String rationale = "";
            if (rec.equals("Buy")) rationale = "Historical EPS beats and strong forward guidance. Cash flow positive over 6 quarters.";
            else if (rec.equals("Hold")) rationale = "Stable historical performance but facing uncertain macroeconomic headwinds in Q3.";
            else rationale = "Declining margins against historical averages. Revenue miss anticipated.";

            StockRecord record = createStockRecord(ticker, ticker + " Corp", rec, rationale, basePrice, random);
            recommendations.add(record);
        }

        // Sort roughly by recommendation and confidence
        recommendations.sort((a, b) -> {
            String rA = a.getRecommendation();
            String rB = b.getRecommendation();
            if (rA.equals(rB)) {
                return b.getConfidenceScore().compareTo(a.getConfidenceScore());
            }
            if (rA.equals("Buy")) return -1;
            if (rB.equals("Buy")) return 1;
            if (rA.equals("Hold")) return -1;
            return 1;
        });

        // Delete previous records and Save entirely new recommendations to MongoDB Cluster
        repository.deleteAll();
        repository.saveAll(recommendations);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "InvestFish Agent completed processing and saved " + recommendations.size() + " targets to MongoDB Cluster.");
        response.put("data", recommendations);

        return ResponseEntity.ok(response);
    }

    private StockRecord createStockRecord(String ticker, String name, String recommendation, String rationale, double currentPrice, Random random) {
        StockRecord record = new StockRecord();
        record.setId(UUID.randomUUID().toString());
        record.setTicker(ticker);
        record.setName(name);
        record.setRecommendation(recommendation);
        record.setRationale(rationale);
        record.setCurrentPrice("$" + df.format(currentPrice));
        
        int score = recommendation.equals("Buy") ? 80 + random.nextInt(20) : (recommendation.equals("Hold") ? 50 + random.nextInt(30) : 20 + random.nextInt(30));
        record.setConfidenceScore(score + "%");
        
        List<Map<String, Object>> history = new ArrayList<>();
        double runningPrice = currentPrice * (0.8 + random.nextDouble()*0.4); 
        
        String[] months = {"Oct", "Nov", "Dec", "Jan", "Feb", "Mar"};
        for (int i = 0; i < months.length; i++) {
            Map<String, Object> point = new HashMap<>();
            point.put("month", months[i]);
            point.put("price", Double.parseDouble(df.format(runningPrice)));
            history.add(point);
            
            if (i == months.length - 2) {
                runningPrice = currentPrice; 
            } else {
                double volatility = (recommendation.equals("Buy")) ? 1.05 : 0.98;
                runningPrice = runningPrice * (volatility + (random.nextDouble() - 0.5) * 0.1); 
            }
        }
        record.setHistory(history);
        
        return record;
    }
}
