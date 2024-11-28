package com.example.dashboard.database;

import org.springframework.stereotype.Service;

import com.example.dashboard.query_interfaces.UserShortened;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    public static List<UserShortened> getAllUserShortened(List<Object[]> results) {
        return results.stream()
                .map(UserService::mapToUserShortened)
                .collect(Collectors.toList());
    }

    private static UserShortened mapToUserShortened(Object[] result) {
        Long userId = (Long) result[0];
        String name = (String) result[1];
        Boolean isAdmin = result[2] != null;
        return new UserShortenedImpl(userId, name, isAdmin);
    }

    public static class UserShortenedImpl implements UserShortened {
        private Long id;
        private String name;
        private Boolean isAdmin;

        public UserShortenedImpl(Long id, String name, Boolean isAdmin) {
            this.id = id;
            this.name = name;
            this.isAdmin = isAdmin;
        }

        @Override
        public Long getId() {
            return id;
        }

        @Override
        public String getName() {
            return name;
        }

        @Override
        public Boolean getIsAdmin() {
            return isAdmin;
        }
    }
}
