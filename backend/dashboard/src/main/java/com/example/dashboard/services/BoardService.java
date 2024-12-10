package com.example.dashboard.services;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.dashboard.model.Board;
import com.example.dashboard.model.ListEntity;
import com.example.dashboard.query_interfaces.BoardShortened;

@Service
public class BoardService {

    public static List<BoardShortened> getAllBoards(List<Object[]> results) {
        return results.stream()
                .collect(Collectors.groupingBy(row -> new BoardKey((Long) row[0], (String) row[1], (Long) row[2])))
                .entrySet().stream()
                .map(entry -> {
                    BoardKey key = entry.getKey();
                    List<Long> listsId = entry.getValue().stream()
                            .map(row -> (Long) row[3])
                            .collect(Collectors.toList());
                    return new BoardShortenedImpl(key.boardId, key.adminId, listsId, key.name);
                })
                .collect(Collectors.toList());
    }

    public static Optional<BoardShortened> getSingleBoard(List<Object[]> result) {
        if (result.isEmpty()) {
            return Optional.empty();
        }
        BoardKey key = new BoardKey((Long) result.get(0)[0], (String) result.get(0)[1], (Long) result.get(0)[2]);
        List<Long> listsId = result.stream()
                .map(row -> (Long) row[3])
                .collect(Collectors.toList());
        BoardShortened boardShortened = new BoardShortenedImpl(key.boardId, key.adminId, listsId, key.name);
        return Optional.of(boardShortened);
    }

    public static BoardShortened convertToBoardShortened(Board board) {
        Long id = board.getId();
        String name = board.getName();
        List<Long> listsId = board.getLists() != null
                ? board.getLists().stream().map(ListEntity::getId).collect(Collectors.toList())
                : Collections.emptyList();
        Long adminId = board.getAdmin().getId();
        return new BoardShortenedImpl(id, adminId, listsId, name);
    }

    static class BoardShortenedImpl implements BoardShortened {
        private Long boardId;
        private Long adminId;
        private List<Long> listsId;
        private String name;

        public BoardShortenedImpl(Long boardId, Long adminId, List<Long> listsId, String name) {
            this.boardId = boardId;
            this.adminId = adminId;
            this.listsId = listsId;
            this.name = name;
        }

        @Override
        public Long getId() {
            return boardId;
        }

        @Override
        public Long getAdminId() {
            return adminId;
        }

        @Override
        public List<Long> getListsId() {
            return listsId;
        }

        @Override
        public String getName() {
            return name;
        }
    }

    static class BoardKey {
        Long boardId;
        String name;
        Long adminId;

        public BoardKey(Long boardId, String name, Long adminId) {
            this.boardId = boardId;
            this.name = name;
            this.adminId = adminId;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o)
                return true;
            if (o == null || getClass() != o.getClass())
                return false;
            BoardKey boardKey = (BoardKey) o;
            return Objects.equals(boardId, boardKey.boardId) &&
                    Objects.equals(name, boardKey.name) &&
                    Objects.equals(adminId, boardKey.adminId);
        }

        @Override
        public int hashCode() {
            return Objects.hash(boardId, name, adminId);
        }
    }
}
