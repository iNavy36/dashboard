package com.example.dashboard.query_interfaces;

import java.util.List;

public interface BoardShortened {
    Long getId();

    String getName();

    List<Long> getListsId();

    Long getAdminId();
}
