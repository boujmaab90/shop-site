package com.alten.shop.utils;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.TimeZone;

import com.alten.shop.entity.Product;

public class FonctionUtil {

	public final static String INSTOCK = "INSTOCK";
	public final static String LOWSTOCK = "LOWSTOCK";
	public final static String OUTOFSTOCK = "OUTOFSTOCK";
	
	public boolean isCorrectInventoryStatus(Product product) {
		
		return (product.equals(INSTOCK) || product.equals(LOWSTOCK) || product.equals(OUTOFSTOCK));
	}
	public LocalDateTime timestampToLocalDate(Long timestamp) {
		
		return LocalDateTime.ofInstant(Instant.ofEpochMilli(timestamp), 
                TimeZone.getDefault().toZoneId());
	}
}
