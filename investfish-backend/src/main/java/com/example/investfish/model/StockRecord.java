package com.example.investfish.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.Map;

@Document(collection = "stock_recommendations")
public class StockRecord {

    @Id
    private String id;
    
    private String ticker;
    private String name;
    private String recommendation;
    private String rationale;
    private String currentPrice;
    private String confidenceScore;
    
    private List<Map<String, Object>> history;

    // Getters and Setters

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTicker() { return ticker; }
    public void setTicker(String ticker) { this.ticker = ticker; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRecommendation() { return recommendation; }
    public void setRecommendation(String recommendation) { this.recommendation = recommendation; }

    public String getRationale() { return rationale; }
    public void setRationale(String rationale) { this.rationale = rationale; }

    public String getCurrentPrice() { return currentPrice; }
    public void setCurrentPrice(String currentPrice) { this.currentPrice = currentPrice; }

    public String getConfidenceScore() { return confidenceScore; }
    public void setConfidenceScore(String confidenceScore) { this.confidenceScore = confidenceScore; }

    public List<Map<String, Object>> getHistory() { return history; }
    public void setHistory(List<Map<String, Object>> history) { this.history = history; }
}
