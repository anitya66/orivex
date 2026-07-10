package com.orivex.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MonthlyChartData {

    private String month;

    private Long value;

}