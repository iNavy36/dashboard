package com.example.dashboard.database;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.dashboard.model.Card;
import com.example.dashboard.model.ListEntity;
import com.example.dashboard.query_interfaces.ListShortened;

@Service
public class ListService {
    public static Optional<ListShortened> getSingleList(List<Object[]> result) {
        if (result.isEmpty()) {
            return Optional.empty();
        }
        ListKey key = new ListKey((Long) result.get(0)[0], (String) result.get(0)[1], (Long) result.get(0)[2]);
        List<Long> cardsId = result.stream()
                .map(row -> (Long) row[3])
                .collect(Collectors.toList());
        ListShortened listShortened = new ListShortenedImpl(key.listId, key.boardId, cardsId, key.name);
        return Optional.of(listShortened);
    }

    public static ListShortened convertToListShortened(ListEntity list) {
        Long id = list.getId();
        String name = list.getName();
        List<Long> cardsId = list.getCards() != null
                ? list.getCards().stream().map(Card::getId).collect(Collectors.toList())
                : Collections.emptyList();
        Long boardId = list.getBoardEntity().getId();
        return new ListShortenedImpl(id, boardId, cardsId, name);
    }

    static class ListShortenedImpl implements ListShortened {
        private Long listId;
        private Long boardId;
        private List<Long> cardsId;
        private String name;

        public ListShortenedImpl(Long listId, Long boardId, List<Long> cardsId, String name) {
            this.listId = listId;
            this.boardId = boardId;
            this.cardsId = cardsId;
            this.name = name;
        }

        @Override
        public Long getId() {
            return listId;
        }

        @Override
        public Long getBoardId() {
            return boardId;
        }

        @Override
        public List<Long> getCardsId() {
            return cardsId;
        }

        @Override
        public String getName() {
            return name;
        }
    }

    static class ListKey {
        Long listId;
        String name;
        Long boardId;

        public ListKey(Long listId, String name, Long boardId) {
            this.listId = listId;
            this.name = name;
            this.boardId = boardId;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o)
                return true;
            if (o == null || getClass() != o.getClass())
                return false;
            ListKey listKey = (ListKey) o;
            return Objects.equals(listId, listKey.listId) &&
                    Objects.equals(name, listKey.name) &&
                    Objects.equals(boardId, listKey.boardId);
        }

        @Override
        public int hashCode() {
            return Objects.hash(listId, name, boardId);
        }
    }
}
