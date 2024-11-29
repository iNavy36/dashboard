package com.example.dashboard.query_interfaces;

import java.util.List;

public interface ListShortened {
    Long getListId();

    String getName();

    List<Long> getCardsId();

    Long getBoardId();

    Long getAdminId();
}
