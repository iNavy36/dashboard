package com.example.dashboard.database;

import org.springframework.stereotype.Service;

import com.example.dashboard.model.Card;
import com.example.dashboard.query_interfaces.CardShortened;

@Service
public class CardService {
    public static CardShortened convertToCardShortened(Card card) {
        Long id = card.getId();
        String content = card.getContent();
        Long listId = card.getListEntity().getId();
        Long userId = card.getUserEntity().getId();
        return new CardShortenedImpl(id, listId, userId, content);
    }

    static class CardShortenedImpl implements CardShortened {
        private Long cardId;
        private Long listId;
        private Long userId;
        private String content;

        public CardShortenedImpl(Long cardId, Long listId, Long userId, String content) {
            this.cardId = cardId;
            this.listId = listId;
            this.userId = userId;
            this.content = content;
        }

        @Override
        public Long getCardId() {
            return cardId;
        }

        @Override
        public Long getListId() {
            return listId;
        }

        @Override
        public Long getUserId() {
            return userId;
        }

        @Override
        public String getContent() {
            return content;
        }
    }
}
